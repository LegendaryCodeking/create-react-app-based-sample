import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class ModelMetricsTable extends Component {
  state = {
    rowData: [
      {
        Class_ID: 0,
        Precision: 0,
        Recall: 0,
        F1_score: 0,
        Support: 10,
      },
      {
        Class_ID: 1,
        Precision: 0.9,
        Recall: 1,
        F1_score: 0.9473684210526316,
        Support: 90,
      },
      {
        Class_ID: "avg / total",
        Precision: 0.81,
        Recall: 0.9,
        F1_score: 0.8526315789473685,
        Support: 100,
      },
    ],
    columnDefs: [
      { field: "Class_ID", pinned: "left" },
      { field: "Precision" },
      { field: "Recall" },
      { field: "F1_score" },
      { field: "Support" },
    ],
  };

  componentDidMount() {
    let { rowData, columnData } = this.props.data;

    this.setState({ rowData: rowData, columnDefs: columnData });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { rowData, columnData } = this.props.data;

      this.setState({ rowData: rowData, columnDefs: columnData });
    }
  }

  gridReady = (params) => {
    let gridApi = params.api;
    this.gridApi = gridApi;
    //let gridColumnApi = params.columnApi;
    setTimeout(() => {
      gridApi.sizeColumnsToFit();
      //gridApi.redrawRows();
    }, 100);
  };
  render() {
    const { rowData, columnDefs } = this.state;
    return (
      <div className="w-full bg-darkblue text-white mb-4">
        <div className=" bg-darkblue border border-b-1 py-2 px-2 w-full flex">
          <div className="w-1/2">
            <span className="font-bold text-white text-xs float-left mt-2 ml-2">
              Model performance metrics
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
        <div className="w-full h-96">
          <div
            className="ag-theme-alpine"
            style={{ height: "15rem", width: "100%" }}
          >
            <AgGridReact
              onGridReady={this.gridReady}
              rowData={rowData}
              pagination={false}
              paginationPageSize={7}
              columnDefs={columnDefs}
            ></AgGridReact>
          </div>
        </div>
      </div>
    );
  }
}

export default ModelMetricsTable;
