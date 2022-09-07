import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faCancel } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

import * as XLSX from "xlsx";
class PredictedFileUpload extends Component {
  state = {
    show: true,
    selectedFile: "",
    uploadData: [],
    disableUploadButton: true,
    disableCancelButton: true,
  };

  onChange = (event) => {
    console.log("e: ", event.target.value);
    this.setState({ selectedFile: event.target.value });
    const sFile = event.target.files[0];
    const fileType = this.getFileType(sFile.name)[0];
    console.log("fileType: ", fileType);
    if (fileType === "xlsx" || fileType === "csv") {
      if (event.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          //console.log(json);
          this.setState({
            uploadData: json,
            disableCancelButton: false,
          });
          this.props.onFileReadyForUpload(false);

          /* this.props.onUpload({
            upload_data: json,
          }); */
        };
        reader.readAsArrayBuffer(event.target.files[0]);
      }
    } else {
      toast.error("File does not meet requirements");
    }
  };

  onCancel = () => {
    this.setState({ selectedFile: "" });
  };

  getFileType = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  uploadFileData = (e) => {
    e.preventDefault();
    const { uploadData } = this.state;
    console.log("uploadData: ", uploadData);
    this.props.onUpload({
      newdata: uploadData,
    });
  };

  render() {
    const { loading, disableUploadButton } = this.props;
    const { disableCancelButton, selectedFile } = this.state;
    console.log("loading: ", loading);
    return (
      <div className={this.state.show ? "flex mb-4" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">Upload files</span>
          </div>
        </div>
        <div className="w-6/12" style={{ paddingBottom: ".5rem" }}>
          <input
            className="form-control block w-full h-full text-sm text-eggyellow bg-darkblue border border-white cursor-pointer focus:outline-none file:bg-eggyellow file:border-0 file:h-full"
            aria-describedby="user_avatar_help"
            value={selectedFile}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={this.onChange}
            placeholder="Allowed file formats are Csv and xlsx"
          ></input>
        </div>
        <div className="w-2/12" style={{ paddingBottom: ".5rem" }}>
          <div className="flex h-full justify-end">
            <button
              disabled={disableUploadButton}
              onClick={this.uploadFileData}
              className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full disabled:bg-gray-disabled p-2"
            >
              <div className={loading ? "" : "hidden"}>
                <Spinner size="sm" light={true} />
              </div>
              <div className={!loading ? "" : "hidden"}>
                <FontAwesomeIcon
                  className="text-xs font-bold"
                  icon={faFileUpload}
                />
                <span className="ml-2 font-bold text-sm">Upload</span>
              </div>
            </button>
          </div>
        </div>
        <div className="w-2/12" style={{ paddingBottom: ".5rem" }}>
          <div className="flex h-full justify-end">
            <button
              disabled={disableCancelButton}
              onClick={this.onCancel}
              className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full disabled:bg-gray-disabled"
            >
              <FontAwesomeIcon className="text-xs font-bold" icon={faCancel} />
              <span className="ml-2 font-bold text-sm">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PredictedFileUpload;
