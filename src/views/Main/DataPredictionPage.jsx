import React, { Component } from "react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

import LoadingOverlay from "react-loading-overlay";
import PredictionStats from "../../components/Stats/DataPredictionStats";
import ModelMetricsTable from "../../components/Tables/ModelMetricsTable";
import PredictionSummaryCharts from "../../components/PredictionSummaryCharts";
import { toast } from "react-toastify";
//import PredictionApprovalStatusTable from "../../components/Tables/PredictionApprovalStatus";

class DataPredictionPage extends Component {
  state = {
    statsData: {},
    tableData: {},
    confusionMatrixData: {},
    ROCData: {},
    overlayActive: true,
  };

  async componentDidMount() {
    let mlStatsResponse = await api.getPrediction();
    console.log("mlStatsResponse: ", mlStatsResponse);

    if (mlStatsResponse.status === 200) {
      //Step 1
      let predictionData = mlStatsResponse.data;

      if (predictionData.status === "failed") {
        toast.warn(predictionData.message);
      }

      this.setState({ overlayActive: false });
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
    } else if (mlStatsResponse.status === 500) {
      this.setState({ overlayActive: false });
    } else {
      this.setState({ overlayActive: false });
    }
  }

  fillStatsCards(statsData) {
    this.setState({ statsData });
  }

  render() {
    const { statsData, tableData, confusionMatrixData, overlayActive } =
      this.state;
    return (
      <LoadingOverlay
        active={overlayActive}
        spinner
        text={
          <span className="font-bold text-sm text-eggyellow">
            loading prediction analytics...
          </span>
        }
        styles={{
          overlay: (base) => ({
            ...base,
            zIndex: "9 !important",
          }),
        }}
      >
        <div className="bg-darkblue pt-4" style={{ height: "100% " }}>
          <div className="mx-auto container pb-4">
            <PredictionStats data={statsData} />
            <ModelMetricsTable data={tableData} />
            <PredictionSummaryCharts data={confusionMatrixData} />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default DataPredictionPage;
