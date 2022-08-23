import React, { Component } from "react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

import PredictionStats from "../../components/Stats/DataPredictionStats";
import ModelMetricsTable from "../../components/Tables/ModelMetricsTable";

class DataPredictionPage extends Component {
  state = {
    statsData: {},
    tableData: {},
  };

  async componentDidMount() {
    let predictionData = await api.getPrediction();
    console.log("predictionData: ", predictionData);

    if (predictionData) {
      //Step 1
      let statsObject = {
        accuracy: predictionData.accuracy,
        area_under_curve: predictionData.auc_score,
        kolmogrov_smirnov: predictionData.kolmogrov_smirnov,
        gini: predictionData.gini,
      };

      this.fillStatsCards(statsObject);
      //Step 2

      let tableData = plumber.formatPerformanceMetricTableData(predictionData);
      console.log("tableData: ", tableData);

      //Step 3

      this.setState({ tableData });
    }
  }

  fillStatsCards(statsData) {
    this.setState({ statsData });
  }

  render() {
    const { statsData, tableData } = this.state;
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container pb-4">
          <PredictionStats data={statsData} />
          <ModelMetricsTable data={tableData} />
        </div>
      </div>
    );
  }
}

export default DataPredictionPage;
