import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faCancel } from "@fortawesome/free-solid-svg-icons";
class FileUploadInput extends Component {
  state = {
    show: true,
  };
  render() {
    return (
      <div className={this.state.show ? "flex" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">Upload files</span>
          </div>
        </div>
        <div className="w-6/12">
          <input
            className="form-control block w-full h-full text-sm text-eggyellow bg-darkblue border border-white cursor-pointer focus:outline-none file:bg-eggyellow file:border-0 file:h-full"
            aria-describedby="user_avatar_help"
            type="file"
            placeholder="Allowed file formats are Csv and xlsx"
          ></input>
        </div>
        <div className="w-2/12">
          <div className="flex h-full justify-end">
            <button className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full">
              <FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>
              <span className="ml-2">Upload</span>
            </button>
          </div>
        </div>
        <div className="w-2/12">
          <div className="flex h-full justify-end">
            <button className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full">
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon>
              <span className="ml-2">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploadInput;
