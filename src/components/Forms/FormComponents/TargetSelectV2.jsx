import React, { Component } from "react";

class TargetSelectV2 extends Component {
  state = {};

  changeTarget = (e) => {
    console.log("e: ", e);
    const selectedValue = e.target.value;

    this.props.onTargetChanged(selectedValue);
  };
  render() {
    const { columns } = this.props;
    return (
      <div>
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-100"
        >
          Select a target variable (This variable is the column of your approved
          and rejected variables).
        </label>
        <select
          onChange={this.changeTarget}
          class="border border-gray-300 bg-darkblue text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option selected>Choose a column</option>
          {columns &&
            columns.map((column) => <option value={column}>{column}</option>)}
        </select>
      </div>
    );
  }
}

export default TargetSelectV2;
