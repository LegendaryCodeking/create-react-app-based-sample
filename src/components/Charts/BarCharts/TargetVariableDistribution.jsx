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
          xKey: "variable",
          yKey: "amount",
        },
      ],
    },
  };

  componentDidMount() {
    const { rowData, columnData } = this.props.data;
    //const refinedChartData = plumber.getBinarySums(data);
    const options = { ...this.state.options };
    let formattedRowData = plumber.formatBarchartDistributionData(
      rowData,
      columnData.z
    );

    console.log("Target variable distribution Row data", formattedRowData);

    options.data = formattedRowData;
    options.series = [
      {
        type: "column",
        xKey: "x",
        yKey: "y",
      },
    ];

    this.setState({ options });
  }

  componentDidUpdate(previosProps, previousState) {
    let { data } = this.props;
    //const refinedChartData = plumber.getBinarySums(data);
    if (previosProps.data !== data) {
      const options = { ...this.state.options };
      const { rowData, columnData } = this.props.data;
      let formattedRowData = plumber.formatBarchartDistributionData(
        rowData,
        columnData.z
      );
      console.log("Target variable distribution Row data", formattedRowData);

      options.data = formattedRowData;
      options.series = [
        {
          type: "column",
          xKey: "x",
          yKey: "y",
        },
      ];

      this.setState({ options });
    }
  }
  render() {
    return (
      <div
        className="p-4 mb-4 bg-mediumblue"
        hidden={this.props.hidden}
        style={{ height: "30rem" }}
      >
        <AgChartsReact options={this.state.options} />
      </div>
    );
  }
}

export default TargetVariableDistributionBarChart;
