import React, { Component } from "react";
//import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";
import plumber from "../../../services/dataHelpers";

class TargetVariableDistributionBarChart extends Component {
  state = {
    options: {
      theme: "ag-default-dark",
      subtitle: {
        text: "in billion U.S. dollars",
      },
      data: [],
      background: {
        fill: "#131823",
      },
      axes: [
        {
          type: "category",
          position: "bottom",
          gridStyle: [
            {
              stroke: "#131823",
              lineDash: [8, 3, 3, 3],
            },
            {
              stroke: "#131823",
              lineDash: [8, 3, 3, 3],
            },
          ],
        },
        {
          type: "number",
          position: "left",
          gridStyle: {
            stroke: "green",
            lineDash: [8, 3, 3, 3],
          },
        },
      ],
      series: [
        {
          type: "column",
          xKey: "variable",
          yKey: "amount",
        },
      ],
    },
  };

  componentDidMount() {
    const { data } = this.props;
    const refinedChartData = plumber.getBinarySums(data);
    const options = { ...this.state.options };

    options.data = refinedChartData;

    this.setState({ options });
  }

  componentDidUpdate(previosProps, previousState) {
    let { data } = this.props;
    const refinedChartData = plumber.getBinarySums(data);
    if (previosProps.data !== this.props.data) {
      const options = { ...this.state.options };

      options.data = refinedChartData;

      this.setState({ options });
    }
  }
  render() {
    return (
      <div className="p-4 mb-4 bg-mediumblue" style={{ height: "30rem" }}>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

export default TargetVariableDistributionBarChart;
