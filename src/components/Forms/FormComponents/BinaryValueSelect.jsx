import React, { Component } from "react";

class BinaryValueSelect extends Component {
  state = {};

  onApproveChanged = (e) => {
    console.log("e: ", e);
    const selectedValue = e.target.value;

    this.props.onApproveChanged(selectedValue);
  };

  onRejectedChanged = (e) => {
    console.log("e: ", e);
    const selectedValue = e.target.value;

    this.props.onRejectedChanged(selectedValue);
  };

  render() {
    const { options } = this.props;
    return (
      <div className="flex space-x-6">
        <div className="w-1/2 py-2">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-100"
          >
            Select the variable for approved credit requests.
          </label>
          <select
            onChange={this.onApproveChanged}
            class="border border-gray-300 bg-darkblue text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a variable</option>
            {options &&
              options.map((option) => <option value={option}>{option}</option>)}
          </select>
        </div>
        <div className="w-1/2 py-2">
          <label
            for="countries"
            class="block mb-2 text-sm font-medium text-gray-100"
          >
            Select the variable for rejected credit requests.
          </label>
          <select
            onChange={this.onRejectedChanged}
            class="border border-gray-300 bg-darkblue text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a variable</option>
            {options &&
              options.map((option) => <option value={option}>{option}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

export default BinaryValueSelect;
