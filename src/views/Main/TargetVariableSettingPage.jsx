import React, { Component } from "react";
//import { Link } from "react-router-dom";
import TVSUploadForm from "../../components/Forms/TVSUploadForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class TargetVariableSettingPage extends Component {
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
                STEP 1: Upload the file that would be used to train the model.
                cv and .xIsx files are the allowed file formats.
              </li>
              <li>STEP 2: Set the target variable.</li>
              <li>
                STEP 3: Select a binary representation(0 or 1) for
                positive/approved.
              </li>
              <li>
                STEP 4: Select a binary representation(0 or 1) for
                negative/rejected.
              </li>
            </ul>
          </div>
          <TVSUploadForm
            {...this.props}
            onNext={this.props.onNext}
          ></TVSUploadForm>
        </div>
      </div>
    );
  }
}

export default TargetVariableSettingPage;
