import React, { Component } from "react";
import { AgChartsReact } from "ag-charts-react";
import plumber from "../../../services/dataHelpers";
class CreditApprovalStatusPieChart extends Component {
  state = {
    options: {
      data: [
        { value: 56.9 },
        { value: 22.5 },
        { value: 6.8 },
        { value: 8.5 },
        { value: 2.6 },
        { value: 1.9 },
      ],
      theme: "ag-default-dark",
      series: [
        {
          type: "pie",
          angleKey: "value",
        },
      ],
    },
  };

  componentDidMount() {
    const { data } = this.props;

    if (data) {
      this.plotCharts();
    }
  }

  plotCharts = () => {
    let { options } = this.state;
    let { data } = this.props;
    console.log("PIE PROP data: ", data);

    const pieData = plumber.rollUpPieArray(data);
    console.log("pieData: ", pieData);

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
      let { data } = this.props;
      if (data) {
        this.plotCharts();
      }
    }
  }
  render() {
    const { options } = this.state;
    const { hidden } = this.props;
    return (
      <div
        className="p-4 mb-4 bg-mediumblue"
        hidden={false}
        style={{ height: "30rem" }}
      >
        <AgChartsReact className="text-white" options={options} />
      </div>
    );
  }
}

export default CreditApprovalStatusPieChart;
