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
import sample from "../../samples/sampleApprovalStatusData.json";
import sampleMLdata from "../../samples/sampleMLstats.json";
import sampleTableData from "../../assets/json/sampleTableData.json";
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
      const sampleTVSObject = {
        target_variable: "LOAN STATUS",
        approved_binary: false,
        rejected_binary: true,
      };
      let descriptionData = await this.getDescriptionData(sampleTVSObject);
      //let descriptionData = await this.getDescriptionData(TVSResult);
      console.log("descriptionData: ", descriptionData);
      reportData.summaryReportData = descriptionData;
    } else {
      this.setState({ summaryReportButton: true });
    }

    let sData = plumber.formatApprovalStatusTableData(sample);
    console.log("sample", sData);
    let mlDataSample = plumber.formatPerformanceMetricTableData(sampleMLdata);
    console.log("mlDataSample: ", mlDataSample);

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

    if (Object.keys(mlStats).length > 0) {
      this.setState({ mlReportButton: false });
      let MLstatsData = this.formatTableDataToPDF(mlStats);
      console.log("MLstatsData: ", MLstatsData);
      reportData.mlStats = MLstatsData;
    } else {
      this.setState({ mlReportButton: true });
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

    const tableData = sampleTableData;
    this.setState({ summaryData: tableData });

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

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
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
    const MLstatsData = this.state.reportData.mlStats;
    if (MLstatsData) {
      //create pdf
      this.setState({ mlReportButtonLoading: true });
      createMLstatsReport(MLstatsData, user);

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
