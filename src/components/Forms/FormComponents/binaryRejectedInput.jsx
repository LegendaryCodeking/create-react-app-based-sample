import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class BinaryRejectedInput extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
    const { binaries, value } = this.props;

    if (value) {
      this.setState({ value });
    } else {
      if (binaries.length > 0) {
        this.setState({ value: binaries[0] });
      }
    }
  }

  onChange = (e) => {
    //console.log("e: ", e.target.value);
    const { value } = e.target;
    console.log("value: ", value);
    //console.log("value: ", value);
    //const transferValue = value === "0" ? false : true;
    //console.log("transferValue: ", transferValue);
    this.props.onChange(value, "rejected");
  };
  render() {
    const { formReadyForSecondaryInput, binaries } = this.props;
    //let { value } = this.state;
    return (
      <div className={formReadyForSecondaryInput ? "flex" : "hidden"}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">
              <span className="mr-1">Set binary for rejected</span>
              <FontAwesomeIcon
                data-tip="The representation of rejected/negative unit"
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
            className="bg-darkblue form-select appearance-none border border-white text-white text-sm focus:ring-eggyellow focus:border-eggyellow block w-full p-2.5"
          >
            <option>...</option>
            {binaries.map((binary, index) => (
              <option key={index} value={binary}>
                {binary}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default BinaryRejectedInput;
