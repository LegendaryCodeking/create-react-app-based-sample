import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

class PredictionApprovalStatusTable extends Component {
  state = {
    rowData: [],
    columnData: [],
  };

  componentDidMount() {
    let { data } = this.props;
    console.log("table mount data: ", data);
    const { api } = this.gridRef.current;
    if (data && data.columnData && data.rowData) {
      const columnData = this.createColumnIcon(data.columnData);
      this.setState({ columnData: columnData, rowData: data.rowData });
      setTimeout(() => {
        api.sizeColumnsToFit();
      }, 1000);
    }
  }

  createColumnIcon = (columnsData) => {
    console.log("columnsData: ", columnsData);
    columnsData.forEach((column) => {
      if (column.field === "Status") {
        column.cellRenderer = (params) => {
          if (params.value === "Approved") {
            return (
              <span className="text-green-500 ml-4">
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
            );
          } else {
            return (
              <span className="text-red-600 ml-4">
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
            );
          }
        };
      }
    });

    return columnsData;
  };

  passDataToTable = (data) => {
    console.log("pass data to table: ", data);
    const { api } = this.gridRef.current;
    if (data && Object.keys(data).length > 0) {
      console.log("passed data from update");
      let columnData = data.columnData;
      let rowData = data.rowData;
      columnData = this.createColumnIcon(columnData);
      this.setState({ columnData: columnData, rowData: rowData });
      setTimeout(() => {
        api.sizeColumnsToFit();
      }, 1000);
    } else {
      console.log("table data error");
    }
  };

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { data } = this.props;
      console.log("update table data : ", data);

      this.passDataToTable(data);
    }
  }

  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  gridReady = (params) => {
    let gridApi = params.api;
    this.gridApi = gridApi;
    //let gridColumnApi = params.columnApi;
    setTimeout(() => {
      gridApi.sizeColumnsToFit();
      //gridApi.redrawRows();
    }, 2000);
  };
  render() {
    const { rowData, columnData } = this.state;
    return (
      <div className="w-full bg-darkblue text-white mb-2 mt-8">
        <div className=" bg-darkblue border border-b-1 py-2 px-2 w-full flex">
          <div className="w-1/2">
            <span className="font-bold text-white text-xs float-left mt-2 ml-2">
              Approval status
            </span>
          </div>
          <div className="w-1/2">
            <div className="font-bold text-eggyellow float-right mr-2" hidden>
              <div className="flex md:order-2">
                <button
                  type="button"
                  data-collapse-toggle="navbar-search"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                  className="md:hidden text-eggyellow dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
                <div className="hidden relative md:block">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Search icon</span>
                  </div>
                  <input
                    type="text"
                    id="search-navbar"
                    className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                  />
                </div>
                <button
                  data-collapse-toggle="navbar-search"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-search"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open menu</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-70">
          <div
            className="ag-theme-alpine"
            style={{ height: "30rem", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.gridReady}
              ref={this.gridRef}
              rowData={rowData}
              pagination={true}
              paginationPageSize={9}
              columnDefs={columnData}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionApprovalStatusTable;
