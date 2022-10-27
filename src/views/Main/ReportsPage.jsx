import React, { Component } from "react";
import plumber from "../../services/dataHelpers";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";
import generatePDF from "../../services/createDataSummaryReport";
import generateApprovalStatusReport from "../../services/createApprovalStatusReport";
import createMLstatsReport from "../../services/createMLstatsReport";
import createFullReport from "../../services/createFullReport";
import { Spinner } from "flowbite-react";
/* import sample from "../../samples/sampleApprovalStatusData.json";
import sampleMLdata from "../../samples/sampleMLstats.json";
import sampleTableData from "../../assets/json/sampleTableData.json"; */
//import SummaryPDF from "../../components/PDF/SummaryPDF";

class ReportsPage extends Component {
  state = {
    summaryData: {},
    data_overview: {},
    reportData: {},
    summaryReportButton: true,
    summaryReportButtonLoading: false,
    approvalReportButton: true,
    approvalReportButtonLoading: false,
    mlReportButton: true,
    mlReportButtonLoading: false,
    fullReportButton: false,
    fullReportButtonLoading: false,
  };

  getReportData = async () => {
    let { TVSResult, approvalData, mlStats } = this.props;
    let reportData = {};
    if (Object.keys(TVSResult).length > 0) {
      this.setState({ summaryReportButton: false });
      let descriptionData = await this.getDescriptionData(TVSResult);

      console.log("descriptionData: ", descriptionData);
      reportData.summaryReportData = descriptionData;
    } else {
      this.setState({ summaryReportButton: true });
    }

    //CHECK APPROVAL DATA

    if (Object.keys(approvalData).length > 0) {
      this.setState({ approvalReportButton: false });
      //remove second condition after sample data removal
      //reportData.approvalData = approvalData;
      //let approvalData = approvalData;
      let formattedApprovalData = this.formatTableDataToPDF(approvalData);
      reportData.approvalData = formattedApprovalData;
    } else {
      //disable approval button
      this.setState({ approvalReportButton: true });
    }

    //CHECK ML STATUS DATA
    let mlStatsResponse = await api.getPrediction();
    console.log("mlStatsResponse: ", mlStatsResponse);

    if (
      mlStatsResponse.status === 200 &&
      mlStatsResponse.data.status === "successful"
    ) {
      //Step 1
      if (mlStatsResponse.data.modelling_status === "Done") {
        let tableData = plumber.formatPerformanceMetricTableData(
          mlStatsResponse.data.model_data
        );
        this.setState({ mlStats: tableData });
        console.log("tableData: ", tableData);

        this.setState({ mlReportButton: false });
        let MLstatsData = this.formatTableDataToPDF(mlStats);
        console.log("MLstatsData: ", MLstatsData);
        reportData.mlStats = MLstatsData;
      } else if (mlStatsResponse.data.modelling_status === "Training Ongoing") {
        console.log("training not complete");
        this.setState({ mlReportButton: true });
      } else {
        this.setState({ mlReportButton: true });
      }
    }

    /* if (Object.keys(mlStats).length > 0) {
      this.setState({ mlReportButton: false });
      let MLstatsData = this.formatTableDataToPDF(mlStats);
      console.log("MLstatsData: ", MLstatsData);
      reportData.mlStats = MLstatsData;
    } else {
      this.setState({ mlReportButton: true });
    } */

    return reportData;
  };

  /* checkMLstats = async () => {
    let mlStatsResponse = await api.getPrediction();
    console.log("mlStatsResponse: ", mlStatsResponse);

    if (
      mlStatsResponse.status === 200 &&
      mlStatsResponse.data.status === "successful"
    ) {
      //Step 1
      if (mlStatsResponse.data.modelling_status === "Done") {
        let tableData = plumber.formatPerformanceMetricTableData(
          mlStatsResponse.data.model_data
        );
        this.setState({ mlStats: tableData });
        console.log("tableData: ", tableData);
      } else if (mlStatsResponse.data.modelling_status === "Training Ongoing") {
        console.log("training not complete");
      }
    }
  }; */

  formatTableDataToPDF = (data) => {
    console.log("data: ", data);
    let columns = [];
    data.columnData.forEach((column) => {
      columns.push(column.field);
    });

    let fData = {
      headers: columns,
      data: data.rowData,
    };

    return fData;
  };

  getDescriptionData = async (tvs) => {
    console.log("report page tvs: ", tvs);
    const response = await api.postDescription(tvs);
    if (response.status === 200 && response.data.status !== "failed") {
      const data_summary = response.data["summary_table"];
      const formattedData = plumber.formatDataSummaryData(data_summary);
      return formattedData;
    } else {
      return {};
    }
  };
  async componentDidMount() {
    //const dataDescription = this.props.TVSResult;

    const reportData = await this.getReportData();
    console.log("reportData: ", reportData);

    this.setState({ reportData });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      //const describedData = this.props.TVSResult;
      const reportData = await this.getReportData();
      console.log("reportData: ", reportData);

      this.setState({ reportData });
    }
  }
  generateSummaryReport = () => {
    const { user } = this.props;
    const summaryData = this.state.reportData.summaryReportData;
    if (summaryData) {
      //create pdf
      this.setState({ summaryReportButtonLoading: true });
      generatePDF(summaryData, user);

      setTimeout(() => {
        this.setState({ summaryReportButtonLoading: false });
      }, 5000);
    }
  };

  generateApprovalStatusReport = () => {
    const { user } = this.props;
    console.log("generating approval data");
    const approvalData = this.state.reportData.approvalData;
    if (approvalData) {
      //create pdf
      this.setState({ approvalReportButtonLoading: true });
      generateApprovalStatusReport(approvalData, user);

      setTimeout(() => {
        this.setState({ approvalReportButtonLoading: false });
      }, 5000);
    }
  };

  generateMLstatsReport = () => {
    console.log("generating MLstats report");
    const { user } = this.props;
    const { mlStats } = this.state.reportData;
    if (mlStats) {
      //create pdf
      this.setState({ mlReportButtonLoading: true });
      createMLstatsReport(mlStats, user);

      setTimeout(() => {
        this.setState({ mlReportButtonLoading: false });
      }, 5000);
    }
  };

  createFullReport = () => {
    console.log("generating full report");
    const { user } = this.props;
    const { reportData } = this.state;
    if (reportData) {
      //create pdf
      this.setState({ fullReportButtonLoading: true });
      createFullReport(reportData, user);

      setTimeout(() => {
        this.setState({ fullReportButtonLoading: false });
      }, 5000);
    }
  };
  render() {
    const {
      summaryData,
      summaryReportButton,
      summaryReportButtonLoading,
      approvalReportButton,
      approvalReportButtonLoading,
      mlReportButton,
      mlReportButtonLoading,
      fullReportButton,
      fullReportButtonLoading,
    } = this.state;
    return (
      <div className="bg-darkblue pt-4 pb-4" style={{ height: "100%" }}>
        <div className="mx-auto container mb-4">
          <div className="p-4 mb-6 text-xs text-darkblue bg-cream" role="alert">
            <div className="p-1">
              <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
              <span className="ml-1 font-bold text-xs">Info</span>
            </div>
            <ul>
              <li className="flex">
                <span className="text-xs font-bold mr-1 italic">Note :</span>
                <p className="text-xs font-bold italic">
                  While downloading, some files may take longer, kindly be
                  patient while they process.
                </p>
              </li>
              <li className="flex">
                <span className="text-xs font-bold mr-1 italic">Note :</span>
                <p className="text-xs font-bold italic">
                  If a button is disabled, the corresponding data is not loaded
                  .
                </p>
              </li>
            </ul>
          </div>
          <div className="flex mb-4 mt-4">
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  onClick={this.generateSummaryReport}
                  disabled={summaryReportButton}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-not-allowed"
                >
                  <div className={summaryReportButtonLoading ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!summaryReportButtonLoading ? "" : "hidden"}>
                    <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                    <span className="text-xs font-bold">SUMMARY REPORT</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  disabled={approvalReportButton}
                  onClick={this.generateApprovalStatusReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-not-allowed"
                >
                  <div className={approvalReportButtonLoading ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!approvalReportButtonLoading ? "" : "hidden"}>
                    <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                    <span className="text-xs font-bold">
                      APPROVAL STATUS REPORT
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  disabled={mlReportButton}
                  onClick={this.generateMLstatsReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-not-allowed"
                >
                  <div className={mlReportButtonLoading ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!mlReportButtonLoading ? "" : "hidden"}>
                    <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                    <span className="text-xs font-bold">
                      ML STATISTICS REPORT
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  disabled={fullReportButton}
                  onClick={this.createFullReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-not-allowed"
                >
                  <div className={fullReportButtonLoading ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!fullReportButtonLoading ? "" : "hidden"}>
                    <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                    <span className="text-xs font-bold">FULL REPORT</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* <SummaryPDF /> */}
          <DescriptionSummaryTable data={summaryData} />
        </div>
      </div>
    );
  }
}

export default ReportsPage;
