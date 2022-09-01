import React, { Component } from "react";
import { AgChartsReact } from "ag-charts-react";

class CreditApprovalStatusPieChart extends Component {
  state = {
    options: {
      data: [],
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
      series: [],
    },
  };

  componentDidMount() {
    //this.plotCharts();
  }

  plotCharts = () => {
    let { options } = this.state;
    let { data } = this.props;

    options.data = data;
    options.series = [
      {
        type: "pie",
        angleKey: "y",
        labelKey: "x",
      },
    ];

    this.setState({ options });
  };
  componentDidUpdate(previosProps, previousState) {
    if (previosProps !== this.props) {
      //this.plotCharts();
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
        <AgChartsReact className="text-white" options={options} />
      </div>
    );
  }
}

export default CreditApprovalStatusPieChart;
