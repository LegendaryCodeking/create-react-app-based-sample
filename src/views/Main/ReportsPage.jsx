import React, { Component } from "react";
import plumber from "../../services/dataHelpers";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";
import generatePDF from "../../services/summaryReportGenerator";
import generateApprovalStatusReport from "../../services/approvalStatusReportGenerator";
import createMLstatsReport from "../../services/createMLstatsReport";
import createFullReport from "../../services/createFullReport";
import { Spinner } from "flowbite-react";
import sample from "../../samples/sampleApprovalStatusData.json";
import sampleMLdata from "../../samples/sampleMLstats.json";
//import SummaryPDF from "../../components/PDF/SummaryPDF";

class ReportsPage extends Component {
  state = {
    summaryData: {},
    data_overview: {},
    reportData: {},
    reportButton1: false,
    reportButton2: false,
    reportButton3: false,
    reportButton4: false,
  };

  getReportData = async () => {
    let { TVSResult, approvalData, mlStats } = this.props;
    let reportData = {};
    if (TVSResult) {
      let descriptionData = await this.getDescriptionData(TVSResult);
      console.log("descriptionData: ", descriptionData);
      reportData.summaryReportData = descriptionData;
    }

    let sData = plumber.formatApprovalStatusTableData(sample);
    console.log("sample", sData);
    let mlDataSample = plumber.formatPerformanceMetricTableData(sampleMLdata);

    if (Object.keys(approvalData).length > 0 || true) {
      //remove second condition after sample data removal
      //reportData.approvalData = approvalData;
      let approvalData = sData;
      let formattedApprovalData = this.formatTableDataToPDF(approvalData);
      reportData.approvalData = formattedApprovalData;
    }

    if (Object.keys(mlStats).length > 0 || true) {
      let MLstatsData = this.formatTableDataToPDF(mlDataSample);
      console.log("MLstatsData: ", MLstatsData);
      reportData.mlStats = MLstatsData;
    }

    return reportData;
  };

  formatTableDataToPDF = (data) => {
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
    const describedData = this.props.TVSResult;

    if (describedData) {
      //const data = await api.postDescription(describedData);
      const reportData = await this.getReportData();
      console.log("reportData: ", reportData);

      this.setState({ reportData });
      //
      /* const data_overview = data.data_overview;
      const formattedData = plumber.formatDataSummaryData(data.summary_table);
      this.setState({
        summaryData: formattedData,
        data_overview: data_overview,
      }); */
    }
  }
  generateSummaryReport = () => {
    const { user } = this.props;
    const summaryData = this.state.reportData.summaryReportData;
    if (summaryData) {
      //create pdf
      this.setState({ reportButton1: true });
      generatePDF(summaryData, user);

      setTimeout(() => {
        this.setState({ reportButton1: false });
      }, 5000);
    }
  };

  generateApprovalStatusReport = () => {
    const { user } = this.props;
    console.log("generating approval data");
    const approvalData = this.state.reportData.approvalData;
    if (approvalData) {
      //create pdf
      this.setState({ reportButton2: true });
      generateApprovalStatusReport(approvalData, user);

      setTimeout(() => {
        this.setState({ reportButton2: false });
      }, 15000);
    }
  };

  generateMLstatsReport = () => {
    console.log("generating MLstats report");
    const { user } = this.props;
    const MLstatsData = this.state.reportData.mlStats;
    if (MLstatsData) {
      //create pdf
      this.setState({ reportButton3: true });
      createMLstatsReport(MLstatsData, user);

      setTimeout(() => {
        this.setState({ reportButton3: false });
      }, 5000);
    }
  };

  createFullReport = () => {
    console.log("generating full report");
    const { user } = this.props;
    const { reportData } = this.state;
    if (reportData) {
      //create pdf
      this.setState({ reportButton4: true });
      createFullReport(reportData, user);

      setTimeout(() => {
        this.setState({ reportButton4: false });
      }, 5000);
    }
  };
  render() {
    const {
      summaryData,
      reportButton1,
      reportButton2,
      reportButton3,
      reportButton4,
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
            </ul>
          </div>
          <div className="flex mb-4 mt-4">
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  onClick={this.generateSummaryReport}
                  disabled={reportButton1}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-none"
                >
                  <div className={reportButton1 ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!reportButton1 ? "" : "hidden"}>
                    <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                    <span className="text-xs font-bold">SUMMARY REPORT</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs flex justify-center">
                <button
                  disabled={reportButton2}
                  onClick={this.generateApprovalStatusReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-none"
                >
                  <div className={reportButton2 ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!reportButton2 ? "" : "hidden"}>
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
                  disabled={reportButton3}
                  onClick={this.generateMLstatsReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-none"
                >
                  <div className={reportButton3 ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!reportButton3 ? "" : "hidden"}>
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
                  disabled={reportButton4}
                  onClick={this.createFullReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow disabled:bg-gray-600 disabled:outline-gray-900 disabled:cursor-none"
                >
                  <div className={reportButton4 ? "" : "hidden"}>
                    <Spinner size="sm" light={true} />
                  </div>
                  <div className={!reportButton4 ? "" : "hidden"}>
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
