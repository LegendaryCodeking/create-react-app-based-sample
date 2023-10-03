import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import DataDropzone from "../../components/Forms/FormComponents/Dropzone";
import DivLoader from "../../components/Loaders/DivLoader";
import * as XLSX from "xlsx";
import TargetSelectV2 from "../../components/Forms/FormComponents/TargetSelectV2";

class Upload extends Component {
  state = {
    selectedUploadType: "api",
    uploadingFile: false,
    fileColumns: [],
    targetVariable: "",
    fileData: [],
    binaries: [],
  };

  onChange = (e) => {
    const { value } = e.target;
    console.log("value: ", value);
    this.setState({ selectedUploadType: value });
  };

  submitFile = (file) => {
    this.setState({ uploadingFile: true });
    console.log("file uploading: ", file);

    setTimeout(() => {
      this.setState({ uploadingFile: false });
    }, 4000);
  };

  onUploadDocument = async (file) => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    this.setState({ uploadingFile: true });
    reader.onload = async () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      console.log("binaryStr: ", binaryStr);
      this.setState({ fileData: binaryStr });

      const columns = await this.getColumnsFromExcelBinary(binaryStr);
      this.setState({ uploadingFile: false });
      console.log("columns: ", columns);

      this.setState({ fileColumns: columns });
    };
    reader.onerror = (event) => {
      this.setState({ fileColumns: [] });
      console.log("event: ", event);
      this.setState({ uploadingFile: false });
    };
    reader.readAsArrayBuffer(file);
  };

  getColumnsFromExcelBinary = async (binaryData) => {
    return new Promise((resolve, reject) => {
      try {
        // Create a buffer from the binary data
        const buffer = new Uint8Array(binaryData);
        const data = new Blob([buffer]);
        const reader = new FileReader();

        reader.onload = async function (event) {
          try {
            // Parse the Excel file
            const workbook = XLSX.read(event.target.result, { type: "array" });

            // Assuming there is only one sheet in the Excel file
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Extract column names from the first row of the sheet
            const columnNames = [];
            const range = XLSX.utils.decode_range(sheet["!ref"]);
            for (let col = range.s.c; col <= range.e.c; col++) {
              const cellAddress = { r: 0, c: col };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              columnNames.push(sheet[cellRef].v);
            }

            resolve(columnNames);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = function (event) {
          reject(event.target.error);
        };

        reader.readAsArrayBuffer(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  getUniqueValuesInColumn = async (binaryData, columnName) => {
    return new Promise((resolve, reject) => {
      try {
        // Create a buffer from the binary data
        const buffer = new Uint8Array(binaryData);
        const data = new Blob([buffer]);
        const reader = new FileReader();

        reader.onload = async function (event) {
          try {
            // Parse the Excel file
            const workbook = XLSX.read(event.target.result, { type: "array" });

            // Assuming there is only one sheet in the Excel file
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Initialize an array to store unique values in the specified column
            const uniqueValues = new Set();

            // Extract values from the specified column
            const range = XLSX.utils.decode_range(sheet["!ref"]);
            for (let row = range.s.r + 1; row <= range.e.r; row++) {
              const cellAddress = {
                r: row,
                c: XLSX.utils.decode_col(columnName),
              };
              const cellRef = XLSX.utils.encode_cell(cellAddress);
              const cell = sheet[cellRef];

              // Check if the cell is not empty or undefined before adding it to uniqueValues
              if (cell && cell.v !== undefined && cell.v !== "") {
                uniqueValues.add(cell.v);
              }
            }

            resolve(Array.from(uniqueValues));
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = function (event) {
          reject(event.target.error);
        };

        reader.readAsArrayBuffer(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  clearColumns = () => {
    this.setState({ fileColumns: [], target: "" });
  };

  targetChanged = async (targetVariable) => {
    console.log("target variable: ", targetVariable);
    this.setState({ targetVariable });
    this.setPossibleBinaries();
  };

  setPossibleBinaries = async () => {
    const { fileData, targetVariable } = this.state;

    if (fileData && targetVariable) {
      const binaries = await this.getUniqueValuesInColumn(
        fileData,
        targetVariable
      );

      console.log("binaries: ", binaries);

      this.setState({ binaries });
    } else {
      console.log("missing upload parameters");
    }
  };

  render() {
    const { uploadingFile, fileColumns } = this.state;
    return (
      <div className=" rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
        <div className="mt-6 flex space-x-4">
          <div className="mb-4 flex flex-col w-2/3 border border-gray-500 rounded p-4 relative">
            <DivLoader show={uploadingFile} />
            <span className="px-4 font-bold text-white"> Upload </span>
            <div className="mt-4 px-4 mb-4">
              <DataDropzone
                onUploadDocument={this.onUploadDocument}
                onClearColumns={this.clearColumns}
              />
            </div>
            <div
              className={fileColumns.length > 0 ? "mt-4 px-4 mb-4" : "hidden"}
            >
              <TargetSelectV2
                columns={fileColumns}
                onTargetChanged={this.targetChanged}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col w-1/3 border border-gray-500 rounded">
            <div className="w-full border-b border-gray-500 py-2 text-center">
              <span className="mt-2 px-4 text-center text-gray-400 font-bold">
                Upload progress
              </span>
            </div>
            <div className="grid grid-cols-2 text-center py-4 px-4 gap-4 mt-4">
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Status
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Size
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Tries
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Ping
                </span>
                <span className="text-gray-400">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
