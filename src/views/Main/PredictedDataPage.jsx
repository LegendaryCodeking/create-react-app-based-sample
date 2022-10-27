import React, { Component } from "react";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faUser,
  faUserGroup,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import PredictedFileUpload from "../../components/Forms/FormComponents/PredictedFileUpload";
import plumber from "../../services/dataHelpers";
import PredictionApprovalStatusTable from "../../components/Tables/PredictionApprovalStatus";
import { toast } from "react-toastify";
//import sampleJSON from "../../assets/json/newUpload.json";
import ScoreSingleUserForm from "../../components/Forms/NewUserForm";

class PredictedDataPage extends Component {
  state = {
    loadingFileUpload: false,
    disableUploadButton: true,
    predictedData: {},
    tableData: {},
    multipleActive: false,
    singleActive: true,
    overviewActive: false,
    column_names: [],
  };

  componentDidMount() {
    //this.getHeaders();
  }
  getHeaders = async () => {
    const { TVSResult } = this.props;
    const descriptionsResponse = await api.postDescription(TVSResult);
    console.log("descriptionsResponse: ", descriptionsResponse);

    if (
      descriptionsResponse.status === 200 &&
      descriptionsResponse.data.status !== "failed"
    ) {
      let column_names = descriptionsResponse.data.data_overview.column_names;
      if (column_names && column_names.length > 0) {
        column_names = column_names.filter(
          (element) => element !== "LOAN STATUS"
        );
        console.log("column_names: ", column_names);

        this.setState({ column_names });
      }
    }
  };

  onUpload = async (fileData) => {
    //console.log("data: ", data);
    console.log("fileData: ", fileData);
    this.setState({ loadingFileUpload: true, disableUploadButton: true });

    let reqObj = {};
    //let reqObj = fileData;
    reqObj.threshold = 500;
    reqObj.newdata = fileData.newdata;
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
      this.props.onApprovalStatusData(tableData);
    }
  };

  /* componentDidUpdate(prevProps, prevState) {
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
  } */

  onFileReadyForUpload = (value) => {
    this.setState({ disableUploadButton: value });
  };

  multipleClicked = () => {
    this.setState({
      singleActive: false,
      multipleActive: true,
      overviewActive: false,
    });
  };

  singleClicked = () => {
    this.setState({
      singleActive: true,
      multipleActive: false,
      overviewActive: false,
    });
  };

  overviewClicked = () => {
    this.setState({
      singleActive: false,
      multipleActive: false,
      overviewActive: true,
      approvalData: {},
    });
  };

  setOverView = (data) => {
    this.setState({
      singleActive: false,
      multipleActive: false,
      overviewActive: true,
      approvalData: data,
    });
    this.props.onApprovalStatusData(data);
  };
  render() {
    const {
      loadingFileUpload,
      disableUploadButton,
      multipleActive,
      singleActive,
      overviewActive,
    } = this.state;
    const { approvalData } = this.state;
    return (
      <React.Fragment>
        <div
          className="bg-darkblue predictedpage pt-4 overflow-auto"
          style={{ height: "100vh " }}
        >
          <div className="mx-auto container pb-4">
            <div className="p-4 mb-6 text-sm text-darkblue bg-cream">
              <div className="p-1">
                <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
                <span className="ml-1 font-bold">Info</span>
              </div>
              <ul>
                <li>
                  <span className="font-bold">Step 1 : </span> Upload the file
                  that you want to be predicted. Allowed formats are csv and
                  xls.
                </li>
                <li>
                  <span className="font-bold">Step 2 : </span> After you submit,
                  a table will be displayed containing the predicted data and
                  credit worthiness determined.
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li className="mr-2">
                    <button
                      className={
                        singleActive
                          ? "inline-flex p-4 text-eggyellow rounded-t-lg border-b-2 border-eggyellow active group"
                          : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group"
                      }
                      onClick={this.singleClicked}
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faUser}
                      ></FontAwesomeIcon>
                      Single
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={
                        multipleActive
                          ? "inline-flex p-4 text-eggyellow rounded-t-lg border-b-2 border-eggyellow active group"
                          : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group"
                      }
                      onClick={this.multipleClicked}
                      aria-current="page"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faUserGroup}
                      ></FontAwesomeIcon>
                      Multiple
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={
                        overviewActive
                          ? "inline-flex p-4 text-eggyellow rounded-t-lg border-b-2 border-eggyellow active group"
                          : "inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group"
                      }
                      onClick={this.overviewClicked}
                      aria-current="page"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faTable}
                      ></FontAwesomeIcon>
                      Overview
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className={multipleActive ? "" : "hidden"}>
              <PredictedFileUpload
                onFileReadyForUpload={this.onFileReadyForUpload}
                disableUploadButton={disableUploadButton}
                onDataPredicted={this.setOverView}
                loading={loadingFileUpload}
              />
            </div>
            <div className={overviewActive ? "" : "hidden"}>
              <PredictionApprovalStatusTable data={approvalData} />
            </div>

            <div className={singleActive ? "" : "hidden"}>
              <ScoreSingleUserForm onDataPredicted={this.setOverView} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PredictedDataPage;
