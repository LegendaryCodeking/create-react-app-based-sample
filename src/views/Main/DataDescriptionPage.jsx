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
import LoadingOverlay from "react-loading-overlay";

class DataDescriptionPage extends Component {
  state = {
    summaryData: {},
    loading: false,
    statsData: {},
    currentSearchVariable: "",
    chartsData: {},
    filteredChartData: [],
    data_overview: {},
    targetVariable: "",
    independentVariable: "",
    overlayActive: true,
    overlayText: "Loading your data...",
  };
  async componentDidMount() {
    const describedData = this.props.TVSResult;
    console.log("describedData: ", describedData);

    if (describedData) {
      //const response = await api.postDescription(describedData);
      const response = await api.getDescribedData();
      console.log("response: ", response);
      const { data, status } = response;
      //const { data: data2, status: status2 } = response2;
      //console.log("response2: ", response2);
      //console.log('data2: ', data2);
      //
      if (data && status === 200) {
        const data_overview = data.data_overview;
        const formattedData = plumber.formatDataSummaryData(
          data["summary_table"]
        );
        this.setState({
          summaryData: formattedData,
          data_overview: data_overview,
          overlayActive: false,
          targetVariable: data["target_variable"],
        });
        //this.props.setOverviewData(data_overview);
      } else if (status === 500) {
        this.setState({
          overlayText: "Data fetching failed, please check your connection.",
        });
      }
    }
  }
  onVariableChanged = async (variable) => {
    this.setState({ independentVariable: variable });
  };

  setChartsData = (variable) => {
    const { describedChartsData } = this.state;

    let filteredData = describedChartsData.filter(
      (object) => object.variableName === variable
    );

    this.setState({ filteredData: filteredData });
  };

  render() {
    const {
      summaryData,
      data_overview,
      loading,
      targetVariable,
      independentVariable,
      chartsData,
      overlayActive,
      overlayText,
    } = this.state;
    return (
      <LoadingOverlay
        active={overlayActive}
        spinner
        text={
          <span className="font-bold text-sm text-eggyellow">
            {overlayText}
          </span>
        }
        styles={{
          overlay: (base) => ({
            ...base,
            zIndex: "9 !important",
          }),
        }}
      >
        <div className="bg-darkblue pt-4" style={{ height: "100% " }}>
          <div className="mx-auto container pb-4">
            <div
              className="p-4 mb-6 text-sm text-darkblue bg-slabtext"
              role="alert"
            >
              <div className="p-1">
                <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
                <span className="ml-1 font-bold">Info</span>
              </div>
              <ul>
                <li>
                  <span className="font-bold text-right">
                    Categorical Variables :
                  </span>{" "}
                  The number of variables in categorical or textual format ie
                  strings.
                </li>
                <li>
                  <span className="font-bold text-right">
                    Numerical Variables:
                  </span>
                  The number of variables that are in whole number or decimal
                  format ie numbers.
                </li>
                <li>
                  <span className="font-bold">Summary Table:</span>
                  Representation of information on data variables. ie data
                  summary report.
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
                  The percentage represented by the approved and rejected
                  variable in the data.
                </li>
              </ul>
            </div>
            <DescriptionStatsCards data={data_overview} />
            <DescriptionSummaryTable data={summaryData} />
            <DataDescriptionSearchInput
              show
              loading={loading}
              targetVariable={targetVariable}
              data={summaryData}
              onVariableChanged={this.onVariableChanged}
            />
            <DataSummaryChartsSection
              data={chartsData}
              independentVariable={independentVariable}
              targetVariable={targetVariable}
            />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default DataDescriptionPage;
