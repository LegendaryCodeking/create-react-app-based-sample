import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faPieChart } from "@fortawesome/free-solid-svg-icons";
import plumber from "../services/dataHelpers";
import api from "../services/api";

import TargetVariableCorrelationBarChart from "./Charts/BarCharts/TargetVariableCorrelation";
import TargetVariableDistributionBarChart from "./Charts/BarCharts/TargetVariableDistribution";
//import CreditApprovalStatusPieChart from "./Charts/PieCharts/CreditApprovalStatus";

class DataSummaryChartsSection extends Component {
  state = {
    barChart: false,
    chartOneData: [],
    chartTwoData: {},
  };

  componentDidMount() {
    let { independentVariable, targetVariable } = this.props;
    console.log("mount prop independentVariable ", independentVariable);
    console.log("mount prop targetVariable ", targetVariable);
    this.plotCharts(independentVariable, targetVariable);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { independentVariable, targetVariable } = this.props;
      console.log("update prop independentVariable ", independentVariable);
      console.log("update prop targetVariable ", targetVariable);
      this.plotCharts(independentVariable, targetVariable);
    }
  }

  plotCharts = async (independentVariable, targetVariable) => {
    console.log(
      "EXPECTED SUMMARY CHART VARIABLE independentVariable: ",
      independentVariable
    );
    console.log(
      "EXPECTED SUMMARY CHART VARIABLE targetVariable: ",
      targetVariable
    );
    if (
      independentVariable !== "" &&
      independentVariable !== " " &&
      independentVariable !== null &&
      targetVariable !== "" &&
      targetVariable !== " " &&
      targetVariable !== null
    ) {
      console.log("CHARTS SUMMARY NOT EMPTY", independentVariable);
      let data = await this.getChartData(independentVariable);
      console.log("data summary: ", data);
      if (data) {
        const chartOneData = plumber.formatBarChartOne(
          data,
          independentVariable
        );
        const chartTwoData = plumber.formatBarChartOne(data, targetVariable);
        console.log("Chart 1 data: ", chartOneData);
        console.log("Chart 2 data: ", chartTwoData);
        this.setState({ chartOneData, chartTwoData });
      }
    }
  };

  getChartData = async (independentVariable) => {
    let response = await api.postDistributionChanged({
      variable_x: independentVariable,
    });
    console.log("response: ", response);

    if (response.status === 200) {
      let data = response.data;
      console.log("SUMMARY CHARTS  ==> data: ", data);
      return data;
    } else {
      return {};
    }
  };

  onChartChanged = () => {
    const { barChart } = this.state;

    let newBarValue = barChart ? false : true;

    this.setState({ barChart: newBarValue });
  };
  render() {
    const { barChart, chartOneData, chartTwoData } = this.state;
    return (
      <div className="flex mb-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2">
                Correlation of the target variable with other variables
              </span>
            </div>
            <TargetVariableCorrelationBarChart data={chartOneData} />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2">
                Distribution of the target variable agains loan status
              </span>
              <span
                className="border-none float-right mr-4 outline outline-2  outline-offset-2 rounded px-1 outline-lightblue hover:outline-eggyellow"
                hidden={!barChart}
              >
                <FontAwesomeIcon
                  className="text-eggyellow hover:text-lightblue hover:cursor-pointer text-xl pt-1"
                  icon={faChartColumn}
                  onClick={this.onChartChanged}
                />
              </span>
              <span
                className="border-none float-right mr-4 outline outline-2  outline-offset-2 rounded px-1 outline-lightblue hover:outline-eggyellow"
                hidden={barChart}
              >
                <FontAwesomeIcon
                  className="text-eggyellow hover:text-lightblue hover:cursor-pointer text-xl pt-1"
                  icon={faPieChart}
                  onClick={this.onChartChanged}
                />
              </span>
            </div>
            <TargetVariableDistributionBarChart
              data={chartTwoData}
              hidden={barChart}
            />
            {/* <CreditApprovalStatusPieChart
              data={chartTwoData}
              hidden={!barChart}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DataSummaryChartsSection;
