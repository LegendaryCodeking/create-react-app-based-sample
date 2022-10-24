import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faCancel } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import api from "../../../services/api";
import plumber from "../../../services/dataHelpers";

import * as XLSX from "xlsx";
class PredictedFileUpload extends Component {
  state = {
    show: true,
    selectedFile: "",
    uploadData: [],
    disableUploadButton: true,
    disableCancelButton: true,
    thresholdValid: true,
    threshold: 500,
    loadingUpload: false,
  };

  setThreshold = (e) => {
    console.log("e: ", e);
    let threshold = e.target.value;
    threshold = threshold ? +threshold : threshold;
    console.log("thresholdInput: ", threshold);
    if (threshold >= 300 && threshold <= 800) {
      this.setState({ threshold, thresholdValid: true });
    } else {
      this.setState({ threshold: 500, thresholdValid: false });
    }
  };

  submitObject = async (data) => {
    let reqObject = {};
    const { threshold } = this.state;
    threshold ? (reqObject.threshold = threshold) : (reqObject.threshold = 500);
    reqObject.newdata = data;
    console.log("reqObject: ", reqObject);
    this.setState({ loadingUpload: true });
    const predictedResponse = await api.postForPrediction(reqObject);
    this.setState({ loadingUpload: false });
    console.log("predictedResponse: ", predictedResponse);

    if (predictedResponse.status === 200) {
      if (
        !predictedResponse.data.status ||
        predictedResponse.data.status !== "failed"
      ) {
        this.setPredictedData(predictedResponse.data);
      } else if (
        predictedResponse.data.status &&
        predictedResponse.data.status === "failed"
      ) {
        toast.error(predictedResponse.data.message);
      } else {
        toast.error("An unexpected error with your data occurred");
      }
    } else {
      toast.error("an unexpected error occurred");
    }
  };

  setPredictedData = (data) => {
    const formattedPredictedData = plumber.formatApprovalStatusTableData(data);
    this.props.onDataPredicted(formattedPredictedData);
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
          console.log("upload json: ", json);
          //this.submitObject(json);
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
    /* this.props.onUpload({
      newdata: uploadData,
    }); */
    this.submitObject(uploadData);
  };

  render() {
    const { loading } = this.props;
    const { disableCancelButton, selectedFile, thresholdValid, loadingUpload } =
      this.state;
    console.log("loading: ", loading);
    return (
      <React.Fragment className="mb-80">
        <div className={this.state.show ? "flex mb-8" : "hidden"}>
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
                disabled={loadingUpload}
                onClick={this.uploadFileData}
                className="bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline w-1/2 h-full disabled:bg-gray-disabled p-2"
              >
                <div className={loadingUpload ? "" : "hidden"}>
                  <Spinner size="sm" light={true} />
                </div>
                <div className={!loadingUpload ? "" : "hidden"}>
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
                <FontAwesomeIcon
                  className="text-xs font-bold"
                  icon={faCancel}
                />
                <span className="ml-2 font-bold text-sm">Cancel</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="relative z-0 mb-4 w-full group">
            <input
              type="number"
              name="threshold"
              id="threshold"
              className={
                thresholdValid
                  ? "block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-eggyellow peer"
                  : "block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-red-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-500 peer"
              }
              placeholder=" "
              onChange={this.setThreshold}
            />
            <label
              htmlFor="floating_first_name"
              className={
                thresholdValid
                  ? "peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-eggyellow peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  : "peer-focus:font-medium absolute text-sm text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              }
            >
              Threshold
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PredictedFileUpload;
