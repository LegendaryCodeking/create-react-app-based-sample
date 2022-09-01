import React, { Component } from "react";

import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

class DataDescriptionSearchInput extends Component {
  state = {
    selectedValues: [],
    selectedValue: "",
    loading: false,
    headers: [],
  };

  componentDidMount() {
    let { data, targetVariable, loading } = this.props;
    let headers = data.headers;
    this.setState({ loading });
    console.log("headers: ", headers);

    if (headers) {
      console.log("headers set");
      headers = headers.filter((header) => header !== targetVariable);
      this.setState({ headers });
    }

    /* if (headers.length === 0) {
    } */
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { data, targetVariable, loading } = this.props;
      let headers = data.headers;
      this.setState({ loading });
      console.log("headers: ", headers);

      if (headers) {
        console.log("headers set");
        headers = headers.filter((header) => header !== targetVariable);
        this.setState({ headers });
      }
    }
  }

  onChange = (e) => {
    let variable = e.target.value;
    if (variable !== "" || variable !== " ") {
      console.log("****************", variable);
      this.setState({ selectedValue: variable });
      this.props.onVariableChanged(variable);
    }
  };
  render() {
    const { show } = this.props;
    const { headers } = this.state;
    const { selectedValue, loading } = this.state;
    return (
      <div className={`flex px-4 pt-4 ${show ? "" : "hidden"}`}>
        <div className="w-2/12">
          <div className="h-full flex justify-start">
            <span className="py-4 text-sm text-white">
              <span className="mr-1">Set independent variable</span>
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
            value={selectedValue}
            disabled={loading}
            className="bg-darkblue form-select appearance-none border border-white text-white text-sm focus:ring-eggyellow focus:border-eggyellow block w-full p-2.5"
          >
            <option disabled={true} value={""}>
              Select one...
            </option>
            {headers
              ? headers.map((option, key) => (
                  <option value={option} key={key}>
                    {option}
                  </option>
                ))
              : ""}
          </select>
        </div>
      </div>
    );
  }
}

export default DataDescriptionSearchInput;
