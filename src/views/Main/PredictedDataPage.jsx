import React, { Component } from "react";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PredictedFileUpload from "../../components/Forms/FormComponents/PredictedFileUpload";
import plumber from "../../services/dataHelpers";
import PredictionApprovalStatusTable from "../../components/Tables/PredictionApprovalStatus";
import { toast } from "react-toastify";
import sampleJSON from "../../assets/json/newUpload.json";

class PredictedDataPage extends Component {
  state = {
    loadingFileUpload: false,
    disableUploadButton: true,
    predictedData: {},
    tableData: {},
  };

  onUpload = async (fileData) => {
    //console.log("data: ", data);
    console.log("fileData: ", fileData);
    this.setState({ loadingFileUpload: true, disableUploadButton: true });

    let reqObj = sampleJSON;
    //let reqObj = fileData;
    reqObj.threshold = 500;
    console.log("reqObj: ", reqObj);

    const predictedResponse = await api.postForPrediction(reqObj);
    console.log("predictedResponse: ", predictedResponse);

    this.setState({ loadingFileUpload: false });
    if (predictedResponse.status === 200) {
      const predictedData = predictedResponse.data;
      if (predictedData.status === "failed") {
        toast.warn(predictedData.message);
        return;
      }
      const ApprovalStatusTableData =
        plumber.formatApprovalStatusTableData(predictedData);
      console.log("ApprovalStatusTableData: ", ApprovalStatusTableData);
      let tableData = ApprovalStatusTableData;
      this.setState({ tableData });
      //this.props.onApprovalStatusData(tableData);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    if (this.state) {
      Object.entries(this.state).forEach(
        ([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
      );
    }
  }

  onFileReadyForUpload = (value) => {
    this.setState({ disableUploadButton: value });
  };
  render() {
    const { loadingFileUpload, disableUploadButton, tableData } = this.state;
    return (
      <div
        className="bg-darkblue predictedpage pt-4"
        style={{ height: "100vh " }}
      >
        <div className="mx-auto container">
          <div className="p-4 mb-6 text-sm text-darkblue bg-cream">
            <div className="p-1">
              <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
              <span className="ml-1 font-bold">Info</span>
            </div>
            <ul>
              <li>
                <span className="font-bold">Step 1 : </span> Upload the file
                that you want to be predicted. Allowed formats are csv and xls.
              </li>
              <li>
                <span className="font-bold">Step 2 : </span> After you submit, a
                table will be displayed containing the predicted data and credit
                worthiness determined.
              </li>
            </ul>
          </div>
          <PredictedFileUpload
            onFileReadyForUpload={this.onFileReadyForUpload}
            disableUploadButton={disableUploadButton}
            onUpload={this.onUpload}
            loading={loadingFileUpload}
          />
          <PredictionApprovalStatusTable data={tableData} />
        </div>
      </div>
    );
  }
}

export default PredictedDataPage;
