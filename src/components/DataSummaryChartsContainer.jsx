import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faPieChart } from "@fortawesome/free-solid-svg-icons";

import TargetVariableCorrelationBarChart from "./Charts/BarCharts/TargetVariableCorrelation";
import TargetVariableDistributionBarChart from "./Charts/BarCharts/TargetVariableDistribution";
import CreditApprovalStatusPieChart from "./Charts/PieCharts/CreditApprovalStatus";

class DataSummaryChartsSection extends Component {
  state = {
    barChart: false,
  };

  onChartChanged = () => {
    const { barChart } = this.state;

    let newBarValue = barChart ? false : true;

    this.setState({ barChart: newBarValue });
  };
  render() {
    const { barChart } = this.state;
    return (
      <div className="flex mb-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2">
                Correlation of the target variable with other variables
              </span>
            </div>
            <TargetVariableCorrelationBarChart data={this.props.data} />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2">
                Correlation of the target variable with other variables
              </span>
              <span className="border-none float-right mr-4" hidden={!barChart}>
                <FontAwesomeIcon
                  className="text-eggyellow hover:text-lightblue hover:cursor-pointer text-xl pt-1"
                  icon={faChartColumn}
                  onClick={this.onChartChanged}
                />
              </span>
              <span className="border-none float-right mr-4" hidden={barChart}>
                <FontAwesomeIcon
                  className="text-eggyellow hover:text-lightblue hover:cursor-pointer text-xl pt-1"
                  icon={faPieChart}
                  onClick={this.onChartChanged}
                />
              </span>
            </div>
            <TargetVariableDistributionBarChart
              data={this.props.data}
              hidden={barChart}
            />
            <CreditApprovalStatusPieChart
              data={this.props.data}
              hidden={!barChart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataSummaryChartsSection;
