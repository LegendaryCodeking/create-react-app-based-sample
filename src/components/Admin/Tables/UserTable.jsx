import React, { Component } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UserTableModal from "../Modals/UserTableModal";

class UserTable extends Component {
  state = {
    rowData: [
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
    columnDefs: [
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
    showModal: false,
    modalData: {
      username: "collinsnyamao",
      company: "AICE",
      active: true,
      firstName: "collins",
      lastName: "nyamao",
      dateOfBirth: "2020-01-01",
      userID: "1234",
      companyEmail: "collins@aice.com",
      email: "nyamaocollins@gmail.com",
    },
  };

  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  onModalClick = () => {};
  onModalClose = () => {
    this.setState({ showModal: false });
  };
  componentDidMount() {}

  rowSelected = (event) => {
    console.log("event: ", event.data);
    this.setState({ showModal: true, modalData: event.data });
  };

  gridReady = (params) => {
    let gridApi = params.api;
    this.gridApi = gridApi;
    //let gridColumnApi = params.columnApi;
    setTimeout(() => {
      //gridApi.sizeColumnsToFit();
      gridApi.redrawRows();
    }, 2000);
  };
  render() {
    const { rowData, columnDefs, showModal, modalData } = this.state;
    return (
      <React.Fragment>
        <div className="w-full">
          <div className="flex w-full px-4 py-2 border border-gray-300">
            <span className="font-bold text-white">Users</span>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: "24rem", width: "100%" }}
          >
            <AgGridReact
              ref={this.gridRef}
              onGridReady={this.gridReady}
              rowData={rowData}
              pagination={true}
              paginationPageSize={7}
              columnDefs={columnDefs}
              onRowClicked={this.rowSelected}
              rowMultiSelectWithClick={true}
            ></AgGridReact>
          </div>
        </div>
        <UserTableModal
          show={showModal}
          data={modalData}
          onModalClose={this.onModalClose}
        />
      </React.Fragment>
    );
  }
}

export default UserTable;
