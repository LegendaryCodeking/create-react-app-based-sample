import React, { Component } from "react";
//import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

class ROCChart extends Component {
  state = {
    options: {
      autoSize: true,
      title: {
        text: "Fuel Spending (2019)",
      },
      background: {
        fill: "#131823",
      },
      theme: "ag-default-dark",
      data: [
        {
          quarter: "Q1",
          petrol: 200,
          diesel: 100,
        },
        {
          quarter: "Q2",
          petrol: 300,
          diesel: 130,
        },
        {
          quarter: "Q3",
          petrol: 350,
          diesel: 160,
        },
        {
          quarter: "Q4",
          petrol: 400,
          diesel: 200,
        },
      ],
      axes: [
        {
          type: "number",
          position: "left",
          tick: {
            count: 10,
          },
        },
        {
          type: "number",
          position: "bottom",
          tick: {
            count: 10,
          },
        },
      ],
      series: [
        {
          xKey: "false_positive",
          yKey: "true_positive",
          yName: "True positive",
        },
        {
          xKey: "false_positive",
          yKey: "threshold",
          yName: "Threshold",
        },
      ],
    },
  };

  async componentDidMount() {
    let data = await api.getPrediction();
    const { options } = this.state;
    if (data) {
      let ROCdata = plumber.formatROCData(data);
      console.log("ROCdata: ", ROCdata);
      options.data = ROCdata;

      this.setState({ options });
    }
  }
  render() {
    return (
      <div className="mt-8 p-8" style={{ height: "30rem" }}>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

export default ROCChart;
