import React, { useRef, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./gridStyle.css";

const DescriptionSummaryTable = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState();

  const [columnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Example load data from sever
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData);
      });
  }, []);

  setTimeout(() => {
    gridRef.api.sizeColumnsToFit();
  }, 2000);

  const gridReady = (params) => {
    let gridApi = params.api;
    //let gridColumnApi = params.columnApi;

    gridApi.sizeColumnsToFit();
  };

  // Example using Grid's API
  /* const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []); */
  return (
    <div className="w-full text-white flex p-4 mt-4 mb-4">
      <div
        className="ag-theme-alpine w-full bg-darkblue h-full"
        style={{ height: 500 }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          pagination={true}
          paginationPageSize={10}
          onGridReady={gridReady}
          columnDefs={columnDefs}
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};

export default DescriptionSummaryTable;
