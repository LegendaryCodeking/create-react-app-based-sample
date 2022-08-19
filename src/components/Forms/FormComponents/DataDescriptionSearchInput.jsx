import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class DataDescriptionSearchInput extends Component {
  state = {};
  render() {
    const { show } = this.props;
    return (
      <div className={`flex px-4 pt-4 ${show ? "" : "hidden"}`}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">
              <span className="mr-1">Set binary for approved</span>
              <FontAwesomeIcon
                data-tip="The represantation of approved/positive unit"
                className="text-blue-200"
                icon={faCircleInfo}
              />
              <ReactTooltip />
            </span>
          </div>
        </div>
        <div className="w-10/12">
          <select className="bg-darkblue form-select appearance-none border border-white text-white text-sm focus:ring-eggyellow focus:border-eggyellow block w-full p-2.5">
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
      </div>
    );
  }
}

export default DataDescriptionSearchInput;
