import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import UserTable from "../../components/Admin/Tables/UserTable";

class Organisations extends Component {
  state = {
    rows: [
      {
        companyName: "AICE",
        companyID: "1",
        location: "Nairobi",
        customerCount: "10",
        dateOfCreation: "2020-01-01",
        employeeCount: "10",
        official: "collinsnyamao",
      },
      {
        companyName: "Ada labs",
        companyID: "2",
        location: "Nairobi",
        customerCount: "100",
        dateOfCreation: "2020-01-01",
        employeeCount: "100",
        official: "loisemwarangu",
      },
      {
        companyName: "GO digital",
        companyID: "3",
        location: "Kampala",
        customerCount: "50",
        dateOfCreation: "2020-01-01",
        employeeCount: "15",
        official: "joelosebe",
      },
      {
        companyName: "Safaricom",
        companyID: "4",
        location: "Nairobi",
        customerCount: "1000",
        dateOfCreation: "2020-01-01",
        employeeCount: "500",
        official: "fancy",
      },
    ],
    columns: [
      {
        field: "companyName",
        sortable: true,
        filter: true,
      },
      {
        pinned: "left",
        field: "companyID",
        sortable: true,
        filter: true,
      },
      { field: "location", sortable: true, filter: true },
      { field: "customerCount", sortable: true, filter: true },
      { field: "employeeCount", sortable: true, filter: true },
      { field: "official", sortable: true, filter: true },
      { field: "dateOfCreation", sortable: true, filter: true },
    ],
  };
  render() {
    const { columns, rows } = this.state;
    return (
      <div className=" rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
        <UserTable rows={rows} title="Organisations" columns={columns} />
      </div>
    );
  }
}

export default Organisations;
