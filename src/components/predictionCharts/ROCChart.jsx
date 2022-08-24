import React, { Component } from "react";
//import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

class ROCChart extends Component {
  state = {
    options: {
      autoSize: true,
      background: {
        fill: "#131823",
      },
      theme: "ag-default-dark",
      axes: [
        {
          type: "number",
          position: "left",
          tick: {
            count: 10,
          },
          title: {
            text: "True positive rate",
            enabled: true,
          },
        },
        {
          type: "number",
          position: "bottom",
          tick: {
            count: 10,
          },
          title: {
            text: "False positive rate",
            enabled: true,
          },
        },
      ],
      series: [
        {
          xKey: "false_positive",
          yKey: "true_positive",
          yName: "True positive",
          marker: {
            size: 5,
          },
          data: [],
        },
        {
          xKey: "false_positive",
          yKey: "threshold",
          yName: "Threshold",
          strokeWidth: 1,
          strokeOpacity: 0.5,
          lineDash: [3, 3],

          data: [],
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
      options.series[0].data = ROCdata.TrueVsFalse;
      options.series[1].data = ROCdata.FalseVsThresholdArray;

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
