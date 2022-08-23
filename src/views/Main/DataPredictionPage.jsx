import React, { Component } from "react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

import PredictionStats from "../../components/Stats/DataPredictionStats";
import ModelMetricsTable from "../../components/Tables/ModelMetricsTable";
import PredictionSummaryCharts from "../../components/PredictionSummaryCharts";

class DataPredictionPage extends Component {
  state = {
    statsData: {},
    tableData: {},
    confusionMatrixData: {},
    ROCData: {},
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

      //Step 4
      let matrixData = predictionData.confusion_matrix.matrix;

      this.setState({ confusionMatrixData: matrixData });
    }
  }

  fillStatsCards(statsData) {
    this.setState({ statsData });
  }

  render() {
    const { statsData, tableData, confusionMatrixData } = this.state;
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100% " }}>
        <div className="mx-auto container pb-4">
          <PredictionStats data={statsData} />
          <ModelMetricsTable data={tableData} />
          <PredictionSummaryCharts data={confusionMatrixData} />
        </div>
      </div>
    );
  }
}

export default DataPredictionPage;
