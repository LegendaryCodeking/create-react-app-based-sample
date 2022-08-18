import React, { Component } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class AgGridTable extends Component {
  state = {
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
    ],
    columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
  };

  gridReady = (params) => {
    let gridApi = params.api;
    //let gridColumnApi = params.columnApi;

    gridApi.sizeColumnsToFit();
  };
  render() {
    const { rowData, columnDefs } = this.state;
    return (
      <div
        className="ag-theme-alpine"
        style={{ height: "24rem", width: "100%" }}
      >
        <AgGridReact
          onGridReady={this.gridReady}
          rowData={rowData}
          pagination={true}
          paginationPageSize={7}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
    );
  }
}

export default AgGridTable;
