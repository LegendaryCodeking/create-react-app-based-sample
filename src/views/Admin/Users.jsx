import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import UserTable from "../../components/Admin/Tables/UserTable";

class Users extends Component {
  state = {
    rows: [
      {
        username: "collinsnyamao",
        company: "AICE",
        firstName: "collins",
        lastName: "nyamao",
        dateOfBirth: "2020-01-01",
        userID: "1234",
        companyEmail: "collins@aice.com",
        email: "nyamaocollins@gmail.com",
        active: false,
      },
      {
        username: "loise",
        company: "AICE",
        firstName: "collins",
        lastName: "nyamao",
        dateOfBirth: "2020-01-01",
        userID: "1234",
        companyEmail: "collins@aice.com",
        email: "nyamaocollins@gmail.com",
        active: true,
      },
      {
        username: "joel",
        company: "AICE",
        firstName: "collins",
        lastName: "nyamao",
        dateOfBirth: "2020-01-01",
        userID: "1234",
        companyEmail: "collins@aice.com",
        email: "nyamaocollins@gmail.com",
        active: true,
      },
      {
        username: "fancy",
        company: "AICE",
        firstName: "collins",
        lastName: "nyamao",
        dateOfBirth: "2020-01-01",
        userID: "1234",
        companyEmail: "collins@aice.com",
        email: "nyamaocollins@gmail.com",
        active: true,
      },
    ],
    columns: [
      {
        field: "username",
        sortable: true,
        filter: true,
        pinned: "left",
      },
      {
        field: "userID",
        sortable: true,
        filter: true,
      },
      { field: "firstName", sortable: true, filter: true },
      { field: "lastName", sortable: true, filter: true },
      { field: "company", sortable: true, filter: true },
      { field: "email", sortable: true, filter: true },
      { field: "companyEmail", sortable: true, filter: true },
    ],
  };

  render() {
    const { columns, rows } = this.state;
    return (
      <div className=" rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
        <UserTable rows={rows} title="Users" columns={columns} />
      </div>
    );
  }
}

export default Users;
