import React, { Component } from "react";
//import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

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
          title: {
            text: "Binary",
            enabled: true,
          },
        },
        {
          type: "number",
          position: "left",
          gridStyle: {
            stroke: "green",
            lineDash: [8, 3, 3, 3],
          },
          title: {
            text: "Frequency",
            enabled: true,
          },
        },
      ],
      series: [
        {
          type: "column",
          xKey: "x",
          yKey: "y",
        },
      ],
    },
  };

  componentDidMount() {
    const { data } = this.props;
    //const refinedChartData = plumber.getBinarySums(data);
    this.plotCharts(data);
  }

  plotCharts = (data) => {
    const options = { ...this.state.options };

    console.log("Target variable distribution Row data", data);

    options.data = data;
    options.series = [
      {
        type: "column",
        xKey: "x",
        yKey: "y",
      },
    ];

    this.setState({ options });
  };

  componentDidUpdate(previosProps, previousState) {
    //const refinedChartData = plumber.getBinarySums(data);
    if (previosProps !== this.props) {
      const { data } = this.props;
      this.plotCharts(data);
    }
  }
  render() {
    const { options } = this.state;
    const { hidden } = this.props;
    return (
      <div
        className="p-4 mb-4 bg-mediumblue"
        hidden={hidden}
        style={{ height: "30rem" }}
      >
        <AgChartsReact options={options} />
      </div>
    );
  }
}

export default TargetVariableDistributionBarChart;
