import React, { Component } from "react";

import "./stats.css";

class PredictionStats extends Component {
  state = {};
  render() {
    return (
      <div className="w-full text-white flex p-4 mt-4 mb-4">
        <div className="w-1/4 p-2 text-center justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Accuracy</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Area under Curve</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Kolmorogov Smirnov</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Gini Coefficient</span>
            <span className="text-eggyellow font-bold">30</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionStats;
