import React, { Component } from "react";

import { AgChartsReact } from "ag-charts-react";

class TargetVariableDistributionBarChart extends Component {
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
          gridStyle: [
            {
              stroke: "white",
              lineDash: [8, 3, 3, 3],
            },
            {
              stroke: "white",
              lineDash: [8, 3, 3, 3],
            },
          ],
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
    const { data } = this.props;

    this.plotChart(data);
  }

  plotChart = (data) => {
    const options = { ...this.state.options };

    options.data = data;

    let serieData = [
      {
        type: "column",
        xKey: "x",
        yKey: "y",
      },
    ];

    options.series = serieData;

    this.setState({ options });
  };

  componentDidUpdate(previousProps, previousState) {
    //let { data } = this.props;
    if (previousProps !== this.props) {
      this.plotChart(this.props.data);
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

export default TargetVariableDistributionBarChart;
