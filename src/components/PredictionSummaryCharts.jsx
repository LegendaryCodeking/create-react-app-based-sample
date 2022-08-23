import React, { Component } from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChartColumn, faPieChart } from "@fortawesome/free-solid-svg-icons";
import MatrixConfusionChart from "./predictionCharts/MatrixConfusionChart";
import ROCChart from "./predictionCharts/ROCChart";

class PredictionSummaryCharts extends Component {
  state = {
    barChart: false,
  };
  render() {
    //const { barChart } = this.state;
    return (
      <div className="flex mb-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2 font-bold">Confusion Matrix</span>
            </div>
            <MatrixConfusionChart data={this.props.data} />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2 font-bold">
                Receiver Operating Characteristic Curve (ROC)
              </span>
            </div>
            <ROCChart />
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionSummaryCharts;
