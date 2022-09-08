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
            className="px-6 py-4 mb-6 text-sm text-darkblue bg-cream"
            role="alert"
          >
            <div className="p-1">
              <FontAwesomeIcon className="" icon={faCircleInfo} />{" "}
              <span className="ml-1 font-bold">Info</span>
            </div>
            <ul className="text-xs ml-2">
              <li className="pb-1">
                <span className="font-bold mx-2">STEP 1 :</span> Upload the file
                that would be used to train the model. cv and .xIsx files are
                the allowed file formats.
              </li>
              <li className="pb-1">
                <span className="font-bold mx-2">STEP 2 :</span> Set the target
                variable. (Choose a variable with binary values)
              </li>
              <li className="pb-1">
                <span className="font-bold mx-2">STEP 3 :</span> Select a binary
                representation(0 or 1) for positive/approved.
              </li>
              <li className="pb-1">
                <span className="font-bold mx-2">STEP 4 :</span> Select a binary
                representation(0 or 1) for negative/rejected.
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
