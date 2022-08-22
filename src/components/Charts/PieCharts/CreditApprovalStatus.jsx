import React, { Component } from "react";
import { AgChartsReact } from "ag-charts-react";

class CreditApprovalStatusPieChart extends Component {
  state = {
    options: {
      data: [
        { label: "Android", value: 56.9 },
        { label: "iOS", value: 22.5 },
        { label: "BlackBerry", value: 6.8 },
        { label: "Symbian", value: 8.5 },
        { label: "Bada", value: 2.6 },
        { label: "Windows", value: 1.9 },
      ],
      background: {
        fill: "#131823",
      },
      series: [
        {
          type: "pie",
          angleKey: "value",
          labelKey: "label",
        },
      ],
    },
  };

  componentDidMount() {}
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

export default CreditApprovalStatusPieChart;
