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
    const { data, headers } = this.props.tableData;
    const current_data = this.props.tableData;
    console.log("summaryData: ", data, headers);
    this.updateTableData(current_data);
  }

  updateTableData(data) {
    let rowData = data.data;
    let columnData = data.headers;
    if (rowData && columnData) {
      let columnsDefArray = [];
      columnData.forEach((header) => {
        //console.log("header: ", header);

        let colObject = {
          field: header,
          filter: true,
          sortable: true,
          unSortIcon: true,
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
      if (this.state.rowData !== rowData) {
        this.setState({
          rowData: rowData,
          columnDefs: columnsDefArray,
          currentData: data,
        });
      }
    }
  }

  componentDidUpdate(previousProps, previousState) {
    console.log("previousState: ", previousState);
    console.log("previousProps: ", previousProps);
    //const { currentData: previousData } = this.state;
    const currData = this.props.tableData;

    if (previousProps.tableData !== this.props.tableData) {
      this.updateTableData(currData);
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
