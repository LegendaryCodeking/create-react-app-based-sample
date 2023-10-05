import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";
import DataDropzone from "../../components/Forms/FormComponents/Dropzone";
import DivLoader from "../../components/Loaders/DivLoader";
import * as XLSX from "xlsx";
import TargetSelectV2 from "../../components/Forms/FormComponents/TargetSelectV2";
import BinaryValueSelect from "../../components/Forms/FormComponents/BinaryValueSelect";

class Upload extends Component {
  state = {
    selectedUploadType: "api",
    uploadingFile: false,
    fileColumns: [],
    targetVariable: "",
    fileData: [],
    binaries: [],
    approved: "",
    rejected: "",
    validity: false,
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
            //console.log("sheet: ", sheet);

            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log("json: ", jsonData);

            let fieldData = [];

            jsonData.forEach((column) => {
              fieldData.push(column[columnName]);
            });

            fieldData = [...new Set(fieldData)];
            console.log("fieldData: ", fieldData);

            //console.log("uniqueValues: ", uniqueValues);
            resolve(fieldData);
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
    this.setState({
      fileColumns: [],
      target: "",
      binaries: [],
      targetVariable: "",
      approved: "",
      rejected: "",
      validity: false,
    });
  };

  targetChanged = async (targetVariable) => {
    const tVariable = await targetVariable;
    //console.log("target variable: ", tVariable);
    this.setState({ targetVariable: tVariable }, () => {
      this.setPossibleBinaries();
    });
  };

  setPossibleBinaries = async () => {
    const { fileData, targetVariable } = this.state;

    console.log("target variable:", targetVariable);
    setTimeout(() => {}, 2000);
    console.log("fileData: ", fileData);

    if (targetVariable) {
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

  approveSelected = (value) => {
    console.log("approved value: ", value);
    this.setState({ approved: value }, () => {
      this.checkValidity();
    });
  };

  rejectSelected = (value) => {
    console.log("rejected value: ", value);
    this.setState({ rejected: value }, () => {
      this.checkValidity();
    });
  };

  componentDidMount() {
    this.pageInitiate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.pageInitiate();
    }
  }

  pageInitiate = () => {
    console.log("upload page init");
  };

  checkValidity = () => {
    const { approved, rejected, fileData, targetVariable } = this.state;
    console.log("approved: ", approved);
    console.log("rejected: ", rejected);
    console.log("fileData: ", fileData);
    console.log("targetVariable: ", targetVariable);

    if (approved && rejected && fileData && targetVariable) {
      console.log("all values set");
      this.setState({ validity: true });
    } else {
      console.log("some values are not set");
      this.setState({ validity: false });
    }
  };

  render() {
    const { uploadingFile, fileColumns, binaries, targetVariable, validity } =
      this.state;
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
            <div className={targetVariable ? "mt-4 px-4 mb-4" : "hidden"}>
              <BinaryValueSelect
                options={binaries}
                onApproveChanged={this.approveSelected}
                onRejectedChanged={this.rejectSelected}
              />
            </div>
            <div className={validity ? "mt-4 px-4 mb-4" : "hidden"}>
              <button
                className={
                  validity
                    ? "bg-eggyellow text-darkblue px-4 py-2 rounded hover:bg-eggyellow2"
                    : "bg-gray-500 text-darkblue px-4 py-2 rounded hover:cursor-not-allowed"
                }
              >
                Submit
              </button>
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
