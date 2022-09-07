import React, { Component } from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faChartColumn, faPieChart } from "@fortawesome/free-solid-svg-icons";
import MatrixConfusionChart from "./predictionCharts/MatrixConfusionChart";
import ROCChart from "./predictionCharts/ROCChart";
//import api from "../services/api";

class PredictionSummaryCharts extends Component {
  state = {
    barChart: false,
    chartsData: {},
  };

  async componentDidMount() {
    /* const response = await api.getPrediction();
    if (
      response.status === 200 &&
      response.data &&
      response.data.status !== "failed"
    ) {
      let { data } = response;
      this.setState({ chartsData: data });
    } */
  }
  render() {
    const { chartsData } = this.props;
    return (
      <div className="flex mb-4 text-white p-4">
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2 font-bold">Confusion Matrix</span>
            </div>
            <MatrixConfusionChart
              data={this.props.data}
              chartData={chartsData}
            />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <div className="container bg-mediumblue">
            <div className="border-b border-gray-300 p-2 py-4">
              <span className="text-sm ml-2 font-bold">
                Receiver Operating Characteristic Curve (ROC)
              </span>
            </div>
            <ROCChart chartData={chartsData} />
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionSummaryCharts;
