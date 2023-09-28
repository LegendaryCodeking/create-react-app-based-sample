import React, { Component } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UserTableModal from "../Modals/UserTableModal";

class UserTable extends Component {
  state = {
    rowData: [],
    columnDefs: [],
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
  componentDidMount() {
    const { columns, rows } = this.props;

    this.setState({ rowData: rows, columnDefs: columns });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      const { columns, rows } = this.props;

      this.setState({ rowData: rows, columnDefs: columns });
    }
  }

  rowSelected = (event) => {
    console.log("event: ", event.data);
    //this.setState({ showModal: true, modalData: event.data });
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

  onRowEditingStopped = (row) => {
    console.log("row: ", row);
  };
  render() {
    const { rowData, columnDefs, showModal, modalData } = this.state;
    const { title } = this.props;
    return (
      <React.Fragment>
        <div className="w-full my-4">
          <div className="flex w-full px-4 py-2 border border-gray-300">
            <span className="font-bold text-white">{title}</span>
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
              onRowEditingStopped={this.onRowEditingStopped}
              editType={"fullRow"}
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
