import React, { Component } from "react";

import ReactTooltip from "react-tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class TargetVariableInput extends Component {
  state = {
    show: true,
    selectedValue: "",
  };

  onChange = (e) => {
    let variable = e.target.value;
    this.setState({ selectedValue: variable });
    this.props.onVariableChanged(variable);
  };
  render() {
    const { formReadyForSecondaryInput, options } = this.props;
    const { selectedValue } = this.state;
    return (
      <div className={formReadyForSecondaryInput ? "flex" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">
              <span className="mr-1">Set target variable</span>
              <FontAwesomeIcon
                data-tip="Target variable is the attribute being predicted"
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
            value={selectedValue}
            className="bg-darkblue form-select appearance-none border border-white text-white text-sm focus:ring-eggyellow focus:border-eggyellow block w-full p-2.5"
          >
            <option disabled={true} value={""}>
              Select one...
            </option>
            {options.map((option, key) => (
              <option value={option} key={key}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default TargetVariableInput;
