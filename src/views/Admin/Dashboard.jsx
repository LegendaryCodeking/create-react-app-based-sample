import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="rounded-lg p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
      </div>
    );
  }
}

export default Dashboard;
