import React, { Component } from "react";
import ChartSection from "../../components/Admin/Charts/ChartSection";
import StatsCards from "../../components/Admin/Stats/StatsCards";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="rounded-lg p-4 w-full" style={{ height: "100%" }}>
        <StatsCards />
        <ChartSection />
      </div>
    );
  }
}

export default Dashboard;
