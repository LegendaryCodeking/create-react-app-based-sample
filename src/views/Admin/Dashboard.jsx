import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div
        className="bg-mediumblue rounded-sm p-4 w-full"
        style={{ height: "90vh" }}
      >
        <h2 className="text-white font-bold">Dashboard</h2>
      </div>
    );
  }
}

export default Dashboard;