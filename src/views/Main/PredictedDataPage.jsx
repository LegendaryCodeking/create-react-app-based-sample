import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class PredictedDataPage extends Component {
  state = {};
  render() {
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <div
            className="p-4 mb-6 text-sm text-darkblue bg-lightblue"
            role="alert"
          >
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
        </div>
      </div>
    );
  }
}

export default PredictedDataPage;
