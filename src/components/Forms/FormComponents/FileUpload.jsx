import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faCancel } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

import * as XLSX from "xlsx";
class FileUploadInput extends Component {
  state = {
    show: true,
    selectedFile: null,
    uploadData: [],
    disableUploadButton: true,
  };

  onChange = (event) => {
    console.log("e: ", event.target.files[0]);
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
          this.setState({ uploadData: json });
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

  getFileType = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  uploadFileData = (e) => {
    e.preventDefault();
    const { uploadData } = this.state;
    console.log("uploadData: ", uploadData);
    this.props.onUpload({
      upload_data: uploadData,
    });
  };

  render() {
    const { loading, disableUploadButton } = this.props;
    console.log("loading: ", loading);
    return (
      <div className={this.state.show ? "flex" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">Upload files</span>
          </div>
        </div>
        <div className="w-6/12" style={{ paddingBottom: ".5rem" }}>
          <input
            className="form-control block w-full h-full text-sm rounded-sm text-eggyellow bg-darkblue border border-white cursor-pointer focus:outline-none file:bg-eggyellow file:border-0 file:h-full"
            aria-describedby="user_avatar_help"
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
              className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full disabled:bg-gray-disabled py-2 rounded-sm"
            >
              <div className={loading ? "" : "hidden"}>
                <Spinner size="sm" light={true} />
              </div>
              <div className={!loading ? "" : "hidden"}>
                <FontAwesomeIcon className="text-sm" icon={faFileUpload} />
                <span className="ml-2 font-bold text-sm">Upload</span>
              </div>
            </button>
          </div>
        </div>
        <div className="w-2/12" style={{ paddingBottom: ".5rem" }}>
          <div className="flex h-full justify-end">
            <button
              disabled={true}
              className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full disabled:bg-gray-disabled py-2 rounded-sm"
            >
              <FontAwesomeIcon className="text-sm" icon={faCancel} />
              <span className="ml-2 font-bold text-sm">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploadInput;
