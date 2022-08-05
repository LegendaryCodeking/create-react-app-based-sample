import React, { Component } from "react";
import DescriptionSummaryTable from "../Tables/DescriptionSummaryTable";

class DescriptionSummaryCard extends Component {
  state = {};
  render() {
    return (
      <div
        className="w-full bg-darkblue mb-4 mt-4 p-4"
        style={{ height: "500px" }}
      >
        <div className="p-4 bg-darkblue rounded-lg border shadow-md sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none text-white">
              Latest Customers
            </h5>
            <span className="text-sm font-medium text-white hover:underline">
              View all
            </span>
          </div>
          <div class="flow-root">
            <DescriptionSummaryTable />
          </div>
        </div>
      </div>
    );
  }
}

export default DescriptionSummaryCard;
