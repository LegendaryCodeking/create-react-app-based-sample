import React, { Component } from "react";
import AdminDoughnutChart from "./AdminDoughnutChart";
import AdminBarChart from "./AdminBarChart";
import AdminLineChart from "./AdminLineChart";

class ChartSection extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="flex">
          <div className="w-8/12 p-4">
            <AdminLineChart />
          </div>
          <div className="w-4/12 p-4">
            <AdminDoughnutChart />
          </div>
        </div>
        <div className="flex">
          <div className="w-full p-4">
            <AdminBarChart />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChartSection;
