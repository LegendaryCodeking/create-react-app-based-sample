import React, { Component } from "react";
import api from "../../services/api";
import plumber from "../../services/dataHelpers";

import LoadingOverlay from "react-loading-overlay";
import PredictionStats from "../../components/Stats/DataPredictionStats";
import ModelMetricsTable from "../../components/Tables/ModelMetricsTable";
import PredictionSummaryCharts from "../../components/PredictionSummaryCharts";
//import { toast } from "react-toastify";
//import PredictionApprovalStatusTable from "../../components/Tables/PredictionApprovalStatus";

class DataPredictionPage extends Component {
  state = {
    statsData: {},
    statusText: "This may take a while...",
    tableData: {},
    confusionMatrixData: {},
    ROCData: {},
    overlayActive: true,
    chartsData: {},
    mlStats: {},
  };

  async componentDidMount() {
    this.checkPredictStatus();
  }

  checkPredictStatus = async () => {
    this.setState({ statusText: "Checking model progress..." });
    let mlStatsResponse = await api.getPrediction();
    console.log("mlStatsResponse: ", mlStatsResponse);

    if (
      mlStatsResponse.status === 200 &&
      mlStatsResponse.data.status === "successful"
    ) {
      //Step 1
      if (mlStatsResponse.data.modelling_status === "Done") {
        this.setState({
          statusText: "Training complete, loading statistics...",
        });
        setTimeout(() => {
          this.startProcessingData(mlStatsResponse.data.model_data[0]);
        }, 2000);
      } else if (mlStatsResponse.data.modelling_status === "Training Ongoing") {
        this.setState({ statusText: "Training still ongoing." });
        setTimeout(() => {
          this.checkPredictStatus();
        }, 4000);
      }
    } else if (mlStatsResponse.status === 500) {
      this.setState({ overlayActive: false });
    } else {
      this.setState({ overlayActive: false });
    }
  };

  startProcessingData = (data) => {
    let predictionData = data;

    console.log(
      "DATA PREDICTION PAGE PASSED RETURN STATEMENT : DATA DID NOT FAIL"
    );
    this.setState({ overlayActive: false, chartsData: predictionData });
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
    //this.props.onMLstats(tableData);

    //Step 4
    let matrixData = predictionData.confusion_matrix.matrix;

    this.setState({ confusionMatrixData: matrixData });
  };

  fillStatsCards(statsData) {
    this.setState({ statsData });
  }

  render() {
    const {
      statsData,
      confusionMatrixData,
      overlayActive,
      chartsData,
      statusText,
      tableData,
    } = this.state;

    //const { mlStats } = this.props;
    return (
      <LoadingOverlay
        active={overlayActive}
        spinner
        text={
          <span className="font-bold text-eggyellow">
            Loading Model analytics...<br></br>
            <span className="font-bold text-xs text-white">{statusText}</span>
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
            <PredictionSummaryCharts
              chartsData={chartsData}
              data={confusionMatrixData}
            />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default DataPredictionPage;
