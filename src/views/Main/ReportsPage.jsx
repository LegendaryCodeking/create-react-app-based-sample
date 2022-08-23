import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

class ReportsPage extends Component {
  state = {};
  render() {
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh" }}>
        <div className="mx-auto container">
          <div className="flex mb-4 mt-4">
            <div className="w-3/12">
              <div className="p-4 text-white text-xs">
                <button className="outline outline-lightblue py-2 px-4 hover:text-black hover:bg-eggyellow hover:outline-eggyellow">
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
        </div>
      </div>
    );
  }
}

export default ReportsPage;
