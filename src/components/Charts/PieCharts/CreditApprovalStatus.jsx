import React, { Component } from "react";
import { AgChartsReact } from "ag-charts-react";
import plumber from "../../../services/dataHelpers";

class CreditApprovalStatusPieChart extends Component {
  state = {
    options: {
      data: [
        {
          x: 0,
          y: 43,
        },
        {
          x: 1,
          y: 151,
        },
      ],
      background: {
        fill: "#131823",
      },
      theme: "ag-default-dark",
      legend: {
        position: "bottom",
        item: {
          paddingX: 50,
          marker: {
            shape: "circle", // 'square', 'diamond', 'cross', 'plus', 'triangle'
          },
        },
      },
      series: [
        {
          type: "pie",
          angleKey: "y",
          labelKey: "x",
        },
      ],
    },
  };

  componentDidMount() {
    let { rowData } = this.props;
    let { options } = this.state;

    if (rowData) {
      let formattedChartData = plumber.formatPieChartDistributionData(rowData);

      console.log(
        "Target variable distribution ON pie chart",
        formattedChartData
      );

      options.data = formattedChartData;
      options.series = [
        {
          type: "pie",
          angleKey: "y",
          labelKey: "x",
        },
      ];
    }
  }

  componentDidUpdate(previosProps, previousState) {
    if (previosProps !== this.props) {
      let { rowData } = this.props;
      let { options } = this.state;

      if (rowData) {
        let formattedChartData =
          plumber.formatPieChartDistributionData(rowData);

        console.log(
          "Target variable distribution ON pie chart",
          formattedChartData
        );

        options.data = formattedChartData;
        options.series = [
          {
            type: "pie",
            angleKey: "y",
            labelKey: "x",
          },
        ];
      }
    }
  }
  render() {
    return (
      <div
        className="p-4 mb-4 bg-mediumblue"
        hidden={this.props.hidden}
        style={{ height: "30rem" }}
      >
        <AgChartsReact className="text-white" options={this.state.options} />
      </div>
    );
  }
}

export default CreditApprovalStatusPieChart;
