import React, { Component } from "react";
import plumber from "../../services/dataHelpers";
import api from "../../services/api";

import DescriptionStatsCards from "../../components/Stats/DescriptionStatsCards";
//import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";
import DataDescriptionSearchInput from "../../components/Forms/FormComponents/DataDescriptionSearchInput";
import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";
import DataSummaryChartsSection from "../../components/DataSummaryChartsContainer";

//import sample_data from "../../assets/json/sample-summary.json";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class DataDescriptionPage extends Component {
  state = {
    summaryData: {},
    loading: false,
    statsData: {},
    currentSearchVariable: "",
    barChartsRowData: [],
    barChartsColumnData: {},
    filteredChartData: [],
    data_overview: {},
  };
  async componentDidMount() {
    const describedData = this.props.TVSResult;

    console.log("TVSResult: ", describedData);
    if (describedData) {
      const data = await api.postDescription(describedData);
      console.log("data: ", data);
      //console.log("formatting");
      const data_overview = data.data_overview;
      const formattedData = plumber.formatDataSummaryData(data.summary_table);
      this.setState({
        summaryData: formattedData,
        data_overview: data_overview,
      });
      console.log("formattedData: ", formattedData);
    }
  }
  onVariableChanged = async (variable) => {
    console.log("variable: ", variable);

    const distroData = await api.postDistributionChanged({
      variable_x: variable,
    });
    console.log("distroData: ", distroData);
    if (distroData) {
      let formattedDistroData = plumber.FormatDistroData(distroData, variable);
      console.log("formattedDistroData: ", formattedDistroData);
      this.setState({
        barChartsRowData: formattedDistroData.rowData,
        barChartsColumnData: formattedDistroData.columnData,
      });
    }

    //this.setState({ currentSearchVariable: variable });
    //this.setChartsData(variable);
  };

  setChartsData = (variable) => {
    console.log("variable: ", variable);
    const { describedChartsData } = this.state;
    console.log("describedChartsData: ", describedChartsData);

    let filteredData = describedChartsData.filter(
      (object) => object.variableName === variable
    );

    console.log("filteredData: ", filteredData);
    this.setState({ filteredData: filteredData });
  };

  render() {
    const {
      summaryData,
      data_overview,
      loading,
      barChartsColumnData,
      barChartsRowData,
    } = this.state;
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100% " }}>
        <div className="mx-auto container pb-4">
          <div
            className="p-4 mb-6 text-sm text-darkblue bg-lightblue"
            role="alert"
          >
            <div className="p-1">
              <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
              <span className="ml-1 font-bold">Info</span>
            </div>
            <ul>
              <li>
                <span className="font-bold">Categorical Variables:</span> The
                number of variables in categorical or textual format ie strings.
              </li>
              <li>
                <span className="font-bold">Numerical Variables:</span>
                The number of variables that are in whole number or decimal
                format ie numbers.
              </li>
              <li>
                <span className="font-bold">Summary Table:</span>
                Representation of information on data variables. ie data summary
                report.
              </li>
              <li>
                <span className="font-bold">
                  Co-relation with the target variable:
                </span>
                How other variables related to the dependent variable.
              </li>
              <li>
                <span className="font-bold">
                  Distribution of the target variable:
                </span>
                The percentage represented by the approved and rejected variable
                in the data.
              </li>
            </ul>
          </div>
          <DescriptionStatsCards data={data_overview} />
          <DescriptionSummaryTable data={summaryData} />
          <DataDescriptionSearchInput
            show
            loading={loading}
            data={summaryData}
            onVariableChanged={this.onVariableChanged}
          />
          <DataSummaryChartsSection
            data={{
              columnData: barChartsColumnData,
              rowData: barChartsRowData,
            }}
          />
        </div>
      </div>
    );
  }
}

export default DataDescriptionPage;
