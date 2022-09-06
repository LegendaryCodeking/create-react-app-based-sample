import React, { Component } from "react";
import plumber from "../../services/dataHelpers";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";
import generatePDF from "../../services/summaryReportGenerator";
//import SummaryPDF from "../../components/PDF/SummaryPDF";

class ReportsPage extends Component {
  state = {
    summaryData: {},
    data_overview: {},
    reportData: {},
  };

  getReportData = async () => {
    let { TVSResult } = this.props;
    let reportData = {};
    if (TVSResult) {
      let descriptionData = await this.getDescriptionData(TVSResult);
      console.log("descriptionData: ", descriptionData);
      reportData.summaryReportData = descriptionData;
    }

    return reportData;
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
    const summaryData = this.state.reportData.summaryReportData;
    if (summaryData) {
      //create pdf
      generatePDF(summaryData);
    }
  };
  render() {
    const { summaryData } = this.state;
    return (
      <div className="bg-darkblue pt-4 pb-4" style={{ height: "100%" }}>
        <div className="mx-auto container mb-4">
          <div className="flex mb-4 mt-4">
            <div className="w-3/12">
              <div className="p-4 text-white text-xs">
                <button
                  onClick={this.generateSummaryReport}
                  className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow"
                >
                  <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                  SUMMARY REPORT
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs">
                <button className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow">
                  <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                  STATUS APPROVAL REPORT
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs">
                <button className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow">
                  <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                  TEST PREDICTION REPORT
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4 text-white text-xs">
                <button className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow">
                  <FontAwesomeIcon icon={faFilePdf} className="mx-2" />
                  DOWNLOAD FULL REPORT
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
