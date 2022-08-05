import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

class ReportsPage extends Component {
  state = {};
  render() {
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <div className="flex mb-4 mt-4">
            <div className="w-3/12">
              <div className="p-4">
                <button className="">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4">
                <button className="">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4">
                <button className="">
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              </div>
            </div>
            <div className="w-3/12">
              <div className="p-4">
                <button className="">
                  <FontAwesomeIcon icon={faDownload} />
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
