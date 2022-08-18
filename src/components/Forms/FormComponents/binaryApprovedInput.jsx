import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class BinaryApprovedInput extends Component {
  state = {
    value: 0,
  };

  onChange = (e) => {
    const { value } = e.target;
    const tranferValue = value === "0" ? false : true;
    this.props.onChange(tranferValue, "approved");
  };
  render() {
    const { formReadyForSecondaryInput, value } = this.props;
    let setValue = value ? 1 : 0;
    return (
      <div className={formReadyForSecondaryInput ? "flex" : "hidden"}>
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
          <select
            onChange={this.onChange}
            value={setValue}
            className="bg-darkblue form-select appearance-none border border-white text-white text-sm focus:ring-eggyellow focus:border-eggyellow block w-full p-2.5"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>
      </div>
    );
  }
}

export default BinaryApprovedInput;
