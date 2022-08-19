import React, { Component } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class AgGridTable extends Component {
  state = {
    rowData: [],
    columnDefs: [],
  };

  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    const { data, headers } = this.props.data;
    console.log("summaryData: ", this.props.data);

    if (data && headers) {
      let columnsDefArray = [];
      headers.forEach((header) => {
        //console.log("header: ", header);

        let colObject = {
          field: header,
          width: 200,
          minWidth: 50,
          resizable: true,
        };

        if (header === "Columns") {
          colObject.pinned = "left";
        }
        //header === "Column" ? (colObject["pinned"] = "left") : "";

        columnsDefArray.push(colObject);
      });
      this.setState({ rowData: data, columnDefs: columnsDefArray });
    }
  }

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
    const { rowData, columnDefs } = this.state;
    return (
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
        ></AgGridReact>
      </div>
    );
  }
}

export default AgGridTable;
