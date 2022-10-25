import React, { Component } from "react";

import FileUploadInput from "./FormComponents/FileUpload";
import TargetVariableInput from "./FormComponents/targetVariableInput";
import BinaryApprovedInput from "./FormComponents/binaryApprovedInput";
import BinaryRejectedInput from "./FormComponents/binaryRejectedInput";

//import config from "../../config.json";
import api from "../../services/api";
import auth from "../../services/authService";
import plumber from "../../services/dataHelpers";
import { toast } from "react-toastify";

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
    const response = await api.postUploadData(fileData);
    console.log("response: ", response);
    this.setState({ loadingFileUpload: false });

    if (response.status === 200 && response.data.status !== "failed") {
      this.setState({ formReadyForSecondaryInput: true });
      let dataHeaders = plumber.getDataHeaders(fileData.upload_data);
      console.log("dataHeaders: ", dataHeaders);
      this.setState({ dataHeaders });
      this.setState({ nextButtonDisabled: false });
    } else if (response.data.status === "failed") {
      toast.error(response.data.message);
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

    /* const { data } = await api.postDescription(); */
    //console.log("response: ", data);

    const initiateModelling = await api.initiateModelling();
    console.log("initiateModelling: ", initiateModelling);

    if (initiateModelling.status === 200) {
      toast.success("Your model was successfully initiated");
      this.props.onNext({
        target_variable: selectedVariable,
        approved_binary: approved,
        rejected_binary: rejected,
      });
      this.setState({ nextLoading: false });
      this.writeHeadersToDb(selectedVariable);
    } else {
      this.setState({ nextLoading: false, nextButtonDisabled: false });
      toast.error("There was a problem initiating your model");
    }
  };

  writeHeadersToDb = async (selectedVariable) => {
    const { dataHeaders } = this.state;
    if (dataHeaders.length > 0) {
      const newHeaders = dataHeaders.filter(
        (header) => header !== selectedVariable
      );
      console.log("newHeaders: ", newHeaders);
      const { username } = auth.getCurrentUser();
      console.log("username: ", username);

      let headerObject = {};
      headerObject.username = username;
      headerObject.headers = newHeaders;

      const saveHeadersResponse = await api.postNewHeaders(headerObject);
      console.log("createHeaderResponse: ", saveHeadersResponse);

      if (
        saveHeadersResponse.status === 200 &&
        saveHeadersResponse.data.status === "successfull"
      ) {
        console.log("headers saved");
        this.props.history.push("/cst/data-description");
      } else {
        console.log("headers not saved");
        toast.error("Upload error");
      }
    }
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
