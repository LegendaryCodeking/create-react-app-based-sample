import React, { Component } from "react";

import TargetVariableCorrelationBarChart from "./Charts/BarCharts/TargetVariableCorrelation";
import TargetVariableDistributionBarChart from "./Charts/BarCharts/TargetVariableDistribution";

class DataSummaryChartsSection extends Component {
  state = {};
  render() {
    return (
      <div className="flex mb-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2">
                Correlation of the target variable with other variables
              </span>
            </div>
            <TargetVariableCorrelationBarChart />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <TargetVariableDistributionBarChart />
          </div>
        </div>
      </div>
    );
  }
}

export default DataSummaryChartsSection;
