import React, { Component } from "react";

import FileUploadInput from "./FormComponents/FileUpload";
import TargetVariableInput from "./FormComponents/targetVariableInput";
import BinaryApprovedInput from "./FormComponents/binaryApprovedInput";
import BinaryRejectedInput from "./FormComponents/binaryRejectedInput";

import config from "../../config.json";
import http from "../../services/httpService";
import dataHelpers from "../../functions/dataFunctions";
import { toast } from "react-toastify";
import api from "../../services/api";
import LoadingButton from "../Buttons/LoadingButton";

class TVSUploadForm extends Component {
  state = {
    fileUploadStatus: "not-set",
    loadingFileUpload: false,
    fileUploadProgress: "",
    formReadyForSecondaryInput: false,
    selectedFile: null,
    nextButtonDisabled: true,
    dataHeaders: [],
    rejected: true,
    approved: false,
    selectedVariable: "",
    disableUploadButton: true,
    nextLoading: false,
  };

  onUpload = async (fileData) => {
    console.log("fileData: ", fileData);
    this.setState({ loadingFileUpload: true, disableUploadButton: true });
    const { data } = await http
      .post(config.apiEndoint + "/upload", fileData)
      .catch((error) => {
        console.log("error: ", error);
      });
    this.setState({ loadingFileUpload: false });

    if (data.status) {
      this.setState({ formReadyForSecondaryInput: true });
      let dataHeaders = dataHelpers.getDataHeaders(fileData.upload_data);
      this.setState({ dataHeaders });
      this.setState({ nextButtonDisabled: false });
    }
  };

  onFileReadyForUpload = (value) => {
    this.setState({ disableUploadButton: value });
  };

  onBinaryChange = (value, field) => {
    //console.log("value: ", value, field);

    if (field === "rejected") {
      this.setState({ rejected: value, approved: !value });
    } else {
      this.setState({ approved: value, rejected: !value });
    }
  };
  onVariableChanged = (selectedVariable) => {
    console.log("variable: ", selectedVariable);
    this.setState({ selectedVariable });
  };

  submitDescription = async () => {
    const { rejected, approved, selectedVariable } = this.state;
    console.log("approved: ", approved);
    console.log("rejected: ", rejected);
    if (selectedVariable === "") {
      toast.error("Please select a variable and try again");
      return;
    }

    console.log("variable ok");

    this.setState({ nextLoading: true, nextButtonDisabled: true });

    const response = await api.postDescription({
      target_variable: selectedVariable,
      approved_binary: approved,
      rejected_binary: rejected,
    });
    console.log("response: ", response);
    this.setState({ nextLoading: false });
    this.props.history.push("/cst/data-description");
  };

  render() {
    const {
      formReadyForSecondaryInput,
      nextButtonDisabled,
      dataHeaders,
      rejected,
      approved,
      loadingFileUpload,
      disableUploadButton,
      nextLoading,
    } = this.state;
    return (
      <form className="text-eggyellow shadow-md px-4 pt-4 pb-4 mb-2">
        <div className="mb-4">
          <FileUploadInput
            loading={loadingFileUpload}
            onUpload={this.onUpload}
            disableUploadButton={disableUploadButton}
            onFileReadyForUpload={this.onFileReadyForUpload}
          />
        </div>
        <div className="mb-4">
          <TargetVariableInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
            options={dataHeaders}
            onVariableChanged={this.onVariableChanged}
          />
        </div>
        <div className="mb-4">
          <BinaryApprovedInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
            onChange={this.onBinaryChange}
            value={approved}
            name="approved"
          />
        </div>
        <div className="mb-4">
          <BinaryRejectedInput
            formReadyForSecondaryInput={formReadyForSecondaryInput}
            onChange={this.onBinaryChange}
            value={rejected}
            name="rejected"
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
            <LoadingButton
              text="Next 1"
              onButtonClicked={this.submitDescription}
              icon="upload"
              className="py-2 px-4 float-right"
              disabled={nextButtonDisabled}
              loading={nextLoading}
              float="right"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default TVSUploadForm;
