import React, { Component } from "react";
import PredictionStats from "../../components/Stats/DataPredictionStats";

class DataPredictionPage extends Component {
  state = {};
  render() {
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <PredictionStats />
        </div>
      </div>
    );
  }
}

export default DataPredictionPage;
