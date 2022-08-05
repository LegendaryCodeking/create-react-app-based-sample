import React, { Component } from "react";

import TargetVariableCorrelationBarChart from "./Charts/BarCharts/TargetVariableCorrelation";
import TargetVariableDistributionBarChart from "./Charts/BarCharts/TargetVariableDistribution";

class DataSummaryChartsSection extends Component {
  state = {};
  render() {
    return (
      <div className="flex mb-4 mt-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="">
            <TargetVariableCorrelationBarChart />
          </div>
        </div>
        <div className="w-1/2">
          <div className="">
            <TargetVariableDistributionBarChart />
          </div>
        </div>
      </div>
    );
  }
}

export default DataSummaryChartsSection;
