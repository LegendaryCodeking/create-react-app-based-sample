import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import UserTable from "../../components/Admin/Tables/UserTable";

class Models extends Component {
  state = {
    rows: [
      {
        modelID: "1",
        modelAccuracy: "80%",
        modelTruePositives: 1434,
        dateOfCreation: "2020-01-01",
        modelFalsePositives: 500,
        modelUser: "fancy",
        modelRows: 2986,
      },
      {
        modelID: "2",
        modelAccuracy: "95%",
        modelTruePositives: 3000,
        dateOfCreation: "2020-01-01",
        modelFalsePositives: 934,
        modelUser: "fancy",
        modelRows: 2986,
      },
      {
        modelID: "3",
        modelAccuracy: "70%",
        modelTruePositives: 1200,
        dateOfCreation: "2020-01-01",
        modelFalsePositives: 900,
        modelUser: "fancy",
        modelRows: 2986,
      },
      {
        modelID: "4",
        modelAccuracy: "90%",
        modelTruePositives: 5000,
        dateOfCreation: "2020-01-01",
        modelFalsePositives: 500,
        modelUser: "fancy",
        modelRows: 12986,
      },
      {
        modelID: "5",
        modelAccuracy: "97%",
        modelTruePositives: 1500,
        dateOfCreation: "2020-01-01",
        modelFalsePositives: 400,
        modelUser: "fancy",
        modelRows: 2986,
      },
    ],
    columns: [
      {
        field: "modelUser",
        sortable: true,
        filter: true,
      },
      {
        pinned: "left",
        field: "modelID",
        sortable: true,
        filter: true,
      },
      { field: "modelRows", sortable: true, filter: true },
      { field: "modelAccuracy", sortable: true, filter: true },
      { field: "modelFalsePositives", sortable: true, filter: true },
      { field: "modelTruePositives", sortable: true, filter: true },
      { field: "dateOfCreation", sortable: true, filter: true },
    ],
  };
  render() {
    const { columns, rows } = this.state;
    return (
      <div className="rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />

        <UserTable rows={rows} title="Models" columns={columns} />
      </div>
    );
  }
}

export default Models;
