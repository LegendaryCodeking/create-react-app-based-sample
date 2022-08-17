import React, { Component } from "react";

import FileUploadInput from "./FormComponents/FileUpload";
import TargetVariableInput from "./FormComponents/targetVariableInput";
import BinaryApprovedInput from "./FormComponents/binaryApprovedInput";
import BinaryRejectedInput from "./FormComponents/binaryRejectedInput";

import config from "../../config.json";
import http from "../../services/httpService";

class TVSUploadForm extends Component {
  state = {
    fileUploadStatus: "not-set",
    fileUploadProgress: "",
    formReadyForSecondaryInput: true,
    selectedFile: null,
    nextButtonDisabled: true,
  };

  onUpload = async (fileData) => {
    console.log("fileData: ", fileData);
    const { data } = await http
      .post(config.apiEndoint + "/upload", fileData)
      .catch((error) => {
        console.log("error: ", error);
      });

    this.setState({ nextButtonDisabled: false });
    if (data.status) {
      this.setState({ formReadyForSecondaryInput: true });
    }
  };
  render() {
    const { formReadyForSecondaryInput, nextButtonDisabled } = this.state;
    return (
      <form className="text-eggyellow shadow-md px-4 pt-4 pb-4 mb-2">
        <div className="mb-4">
          <FileUploadInput onUpload={this.onUpload} />
        </div>
        <div className="mb-4">
          <TargetVariableInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
          />
        </div>
        <div className="mb-4">
          <BinaryApprovedInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
          />
        </div>
        <div className="mb-4">
          <BinaryRejectedInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
          />
        </div>
        <div
          className={
            formReadyForSecondaryInput
              ? "flex items-center justify-between"
              : "hidden"
          }
        >
          <div className="w-full">
            <button
              className="bg-white disabled:bg-gray-disabled hover:bg-eggyellow2 text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline float-right"
              type="button"
              disabled={nextButtonDisabled}
            >
              <span className=" font-bold text-sm">Next</span>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default TVSUploadForm;
