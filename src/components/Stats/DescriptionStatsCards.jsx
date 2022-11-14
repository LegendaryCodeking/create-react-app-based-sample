import React, { Component } from "react";

class DescriptionStatsCards extends Component {
  state = {};
  render() {
    const { data } = this.props;
    return (
      <div className="w-full text-white md:flex p-4 mt-4 mb-4">
        <div className="md:w-1/4 p-2 text-center justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Number of columns</span>
            <span className="text-eggyellow font-bold">
              {data.number_of_columns}
            </span>
          </div>
        </div>
        <div className="md:w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Number of rows</span>
            <span className="text-eggyellow font-bold">
              {data.number_of_rows}
            </span>
          </div>
        </div>
        <div className="md:w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Categorical variables</span>
            <span className="text-eggyellow font-bold">
              {data.number_of_categorical_variables}
            </span>
          </div>
        </div>
        <div className="md:w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Numerical variables</span>
            <span className="text-eggyellow font-bold">
              {data.number_of_numerical_variabes}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default DescriptionStatsCards;
