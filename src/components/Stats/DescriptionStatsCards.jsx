import React, { Component } from "react";

class DescriptionStatsCards extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div className="w-full text-white flex p-4 mt-4 mb-4">
        <div className="w-1/4 p-2 text-center justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Number of columns</span>
            <span className="text-eggyellow font-bold">{data.columnCount}</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Number of rows</span>
            <span className="text-eggyellow font-bold">{data.rowCount}</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Categorical variables</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Numerical variables</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
      </div>
    );
  }
}

export default DescriptionStatsCards;
