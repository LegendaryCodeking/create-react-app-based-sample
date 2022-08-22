import React, { Component } from "react";

import { AgChartsReact } from "ag-charts-react";

class TargetVariableCorrelationBarChart extends Component {
  state = {
    options: {
      theme: "ag-default-dark",
      subtitle: {
        text: "in billion U.S. dollars",
      },
      data: [
        {
          placeholder: "placeholder",
        },
      ],
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
            text: "Variable",
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
      series: [],
    },
  };

  componentDidMount() {
    const { rowData, columnData } = this.props.data;
    console.log("Target variable correlation chart data: ", this.props.data);
    const options = { ...this.state.options };

    options.data = rowData;

    let serieData = [
      {
        type: "column",
        xKey: columnData.x,
        yKey: columnData.y,
      },
    ];

    options.series = serieData;

    this.setState({ options });
  }

  componentDidUpdate(previousProps, previousState) {
    //let { data } = this.props;

    console.log(
      "previousState.options.data: ",
      previousState.options.data,
      this.props.data.rowData
    );
    if (previousState.options.data !== this.props.data.rowData) {
      const options = { ...this.state.options };
      const { rowData, columnData } = this.props.data;

      options.data = rowData;

      let serieData = [
        {
          type: "column",
          xKey: columnData.x,
          yKey: columnData.y,
        },
      ];

      options.series = serieData;

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
