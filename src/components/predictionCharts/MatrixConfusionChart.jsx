import React, { Component } from "react";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
//import api from "../../services/api";

class MatrixConfusionChart extends Component {
  state = {};

  componentDidMount() {
    let { chartData } = this.props;

    if (Object.keys(chartData).length > 0) {
      let matrixdata = chartData.confusion_matrix.matrix;
      console.log("Matrix Data: ", matrixdata);

      if (matrixdata.length > 0) {
        //
        this.createChart(matrixdata);
      }
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { chartData } = this.props;

      if (Object.keys(chartData).length > 0) {
        let matrixdata = chartData.confusion_matrix.matrix;
        console.log("Matrix Data: ", matrixdata);

        if (matrixdata.length > 0) {
          //
          this.createChart(matrixdata);
        }
      }
    }
  }

  createChart = (matrixData) => {
    if (this.chart) {
      this.chart.dispose();
    }
    const root = am5.Root.new("chartdiv", {
      paddingRight: 50,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
    });

    // ... chart code goes here ...
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        layout: root.verticalLayout,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
    });

    yRenderer.labels.template.setAll({
      fill: am5.color("#fff"),
      fontSize: "1em",
      paddingLeft: 5,
    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: yRenderer,
        categoryField: "category",
      })
    );

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 30,
      inversed: true,
    });

    xRenderer.labels.template.setAll({
      fill: am5.color("#fff"),
      fontSize: "1em",
      paddingLeft: 5,
    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: xRenderer,
        categoryField: "category",
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        calculateAggregates: true,
        stroke: am5.color(0xffffff),
        clustered: false,
        xAxis: xAxis,
        yAxis: yAxis,
        categoryXField: "x",
        categoryYField: "y",
        valueField: "value",
      })
    );

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      cornerRadiusBL: 5,
      cornerRadiusBR: 5,
      width: am5.percent(100),
      height: am5.percent(100),
      templateField: "columnSettings",
    });

    let circleTemplate = am5.Template.new({});

    // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set("heatRules", [
      {
        target: circleTemplate,
        min: 10,
        max: 35,
        dataField: "value",
        key: "radius",
      },
    ]);

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            fill: am5.color(0x000000),
            fillOpacity: 0.5,
            strokeOpacity: 0,
          },
          circleTemplate
        ),
      });
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          fill: am5.color(0xffffff),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          fontSize: 10,
          text: "{value}",
        }),
      });
    });

    let colors = {
      0: am5.color(0xca0101),
      1: am5.color(0xe17a2d),
    };

    // Set data
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
    let data = [
      {
        y: "1",
        x: "1",
        columnSettings: {
          fill: colors[1],
        },
        value: matrixData[1][1],
      },
      {
        y: "0",
        x: "0",
        columnSettings: {
          fill: colors[1],
        },
        value: matrixData[0][0],
      },
      {
        y: "0",
        x: "1",
        columnSettings: {
          fill: colors[0],
        },
        value: matrixData[0][1],
      },
      {
        y: "1",
        x: "0",
        columnSettings: {
          fill: colors[0],
        },
        value: matrixData[1][0],
      },
    ];

    series.data.setAll(data);

    yAxis.data.setAll([{ category: "1" }, { category: "0" }]);

    xAxis.data.setAll([{ category: "1" }, { category: "0" }]);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    chart.appear(1000, 100);
    //

    this.chart = chart;
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div className="p-8">
        <div
          id="chartdiv"
          className=" bg-mediumblue"
          style={{ height: "30rem" }}
        ></div>
      </div>
    );
  }
}

export default MatrixConfusionChart;
