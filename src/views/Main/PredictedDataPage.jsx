import React, { Component } from "react";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import PredictedFileUpload from "../../components/Forms/FormComponents/PredictedFileUpload";
import plumber from "../../services/dataHelpers";
import PredictionApprovalStatusTable from "../../components/Tables/PredictionApprovalStatus";
import { toast } from "react-toastify";

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

    const predictedResponse = await api.postForPrediction(fileData);
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
      this.props.onApprovalData(ApprovalStatusTableData);
      let tableData = ApprovalStatusTableData;
      this.setState({ tableData });
    }
  };

  onFileReadyForUpload = (value) => {
    this.setState({ disableUploadButton: value });
  };
  render() {
    const { loadingFileUpload, disableUploadButton, tableData } = this.state;
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <div className="p-4 mb-6 text-sm text-darkblue bg-cream" role="alert">
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
