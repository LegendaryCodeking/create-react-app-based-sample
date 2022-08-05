import React, { Component } from "react";

import FileUploadInput from "./FormComponents/FileUpload";
import TargetVariableInput from "./FormComponents/targetVariableInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import BinaryApprovedInput from "./FormComponents/binaryApprovedInput";
import BinaryRejectedInput from "./FormComponents/binaryRejectedInput";

class TVSUploadForm extends Component {
  state = {
    fileUploadStatus: "not-set",
    fileUploadProgress: "",
    formReadyForSecondaryInput: false,
  };
  render() {
    const { formReadyForSecondaryInput } = this.state;
    return (
      <div className="bg-darkblue" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <form className="text-eggyellow shadow-md rounded px-4 pt-6 pb-4 mb-2">
            <div className="mb-4">
              <FileUploadInput />
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
              <button
                className="bg-white hover:bg-eggyellow2 text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-full"
                type="button"
              >
                <FontAwesomeIcon className="" icon={faArrowRightToBracket} />
                <span className="ml-1">Log In</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TVSUploadForm;
