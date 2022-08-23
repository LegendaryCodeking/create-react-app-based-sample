import React, { Component } from "react";
import plumber from "../../services/dataHelpers";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import DescriptionSummaryTable from "../../components/Tables/DescriptionSummaryTable";

class ReportsPage extends Component {
  state = {
    summaryData: {},
    data_overview: {},
  };

  async componentDidMount() {
    const describedData = this.props.TVSResult;

    if (describedData) {
      const data = await api.postDescription(describedData);

      //
      const data_overview = data.data_overview;
      const formattedData = plumber.formatDataSummaryData(data.summary_table);
      this.setState({
        summaryData: formattedData,
        data_overview: data_overview,
      });
    }
  }
  generateSummaryReport = () => {
    //ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
    //console.log("pdfStream: ", pdfStream);
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
          <DescriptionSummaryTable data={summaryData} />
        </div>
      </div>
    );
  }
}

export default ReportsPage;
