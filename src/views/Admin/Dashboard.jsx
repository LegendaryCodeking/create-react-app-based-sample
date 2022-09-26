import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import UserTable from "../../components/Admin/Tables/UserTable";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div
        className="bg-mediumblue rounded-lg p-4 w-full"
        style={{ height: "90vh" }}
      >
        <StatsCards />
        <UserTable />
      </div>
    );
  }
}

export default Dashboard;
