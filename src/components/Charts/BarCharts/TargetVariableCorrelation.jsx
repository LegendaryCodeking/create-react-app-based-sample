import React, { Component } from "react";

import { AgChartsReact } from "ag-charts-react";

class TargetVariableCorrelationBarChart extends Component {
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
          yKey: "0",
          yName: "0",
          stacked: true,
        },
        {
          type: "column",
          xKey: "variable",
          yKey: "1",
          yName: "1",
          stacked: true,
        },
      ],
    },
  };

  componentDidMount() {
    const { data } = this.props;
    console.log("data: ", data);
    const options = { ...this.state.options };

    options.data = data;

    this.setState({ options });
  }

  componentDidUpdate(previousProps, previousState) {
    let { data } = this.props;
    if (previousState.options.data !== data) {
      const options = { ...this.state.options };

      options.data = data;

      this.setState({ options });
    }
  }
  render() {
    //const root = am5.Root.new("chartdiv");
    return (
      <div className="p-4 mb-4 bg-mediumblue" style={{ height: "30rem" }}>
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

export default TargetVariableCorrelationBarChart;
