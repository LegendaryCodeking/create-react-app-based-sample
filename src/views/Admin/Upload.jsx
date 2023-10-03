import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import DataDropzone from "../../components/Forms/FormComponents/Dropzone";
import DivLoader from "../../components/Loaders/DivLoader";
import * as XLSX from "xlsx";

class Upload extends Component {
  state = {
    selectedUploadType: "api",
    uploadingFile: false,
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

      const columns = await this.getColumnsFromExcelBinary(binaryStr);
      this.setState({ uploadingFile: false });
      console.log("columns: ", columns);
    };
    reader.onerror = (event) => {
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

  render() {
    const { uploadingFile } = this.state;
    return (
      <div className=" rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
        <div className="mt-6 flex space-x-4">
          <div className="mb-4 flex flex-col w-2/3 border border-gray-500 rounded p-4 relative">
            <DivLoader show={uploadingFile} />
            <span className="px-4 font-bold text-white"> Upload </span>
            <div className="mt-4 px-4 mb-4">
              <DataDropzone onUploadDocument={this.onUploadDocument} />
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
