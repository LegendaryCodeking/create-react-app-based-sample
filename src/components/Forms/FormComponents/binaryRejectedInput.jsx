import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class BinaryRejectedInput extends Component {
  state = {
    value: 1,
  };

  onChange = (e) => {
    //console.log("e: ", e.target.value);
    const { value } = e.target;
    //console.log("value: ", value);
    const tranferValue = value === "0" ? false : true;
    //console.log("tranferValue: ", tranferValue);
    this.props.onChange(tranferValue, "rejected");
  };
  render() {
    const { formReadyForSecondaryInput, value } = this.props;
    let setValue = value ? 1 : 0;
    return (
      <div className={formReadyForSecondaryInput ? "flex" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">
              <span className="mr-1">Set binary for rejected</span>
              <FontAwesomeIcon
                data-tip="The represantation of rejected/negative unit"
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

export default BinaryRejectedInput;
