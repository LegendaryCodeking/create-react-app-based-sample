import React, { Component } from "react";

import "./stats.css";

class PredictionStats extends Component {
  state = {
    stats: {
      accuracy: 0,
      area_under_curve: 0,
      kolmogrov_smirnov: 0,
      gini: 0,
    },
  };

  componentDidMount() {
    let { data } = this.props;

    if (data) {
      let statObject = {
        accuracy: data.accuracy,
        area_under_curve: data.area_under_curve,
        kolmogrov_smirnov: data.kolmogrov_smirnov,
        gini: data.gini,
      };
      this.setState({ stats: statObject });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let { data } = this.props;
      console.log("data: ", data);

      if (data) {
        let statObject = {
          accuracy: data.accuracy,
          area_under_curve: data.area_under_curve,
          kolmogrov_smirnov: data.kolmogrov_smirnov,
          gini: data.gini,
        };
        this.setState({ stats: statObject });
      }
    }
  }
  render() {
    const { stats } = this.state;
    return (
      <div className="w-full text-white flex p-4 mt-4 mb-4">
        <div className="w-1/4 p-2 text-center justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Accuracy</span>
            <span className="text-eggyellow font-bold">{stats.accuracy}</span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Area under Curve</span>
            <span className="text-eggyellow font-bold">
              {stats.area_under_curve}
            </span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Kolmorogov Smirnov</span>
            <span className="text-eggyellow font-bold">
              {stats.kolmogrov_smirnov}
            </span>
          </div>
        </div>
        <div className="w-1/4 p-2 text-center  justify-center items-center">
          <div className="w-full border flex flex-col border-eggyellow border-l-8 hover:border-l-4 p-2">
            <span className="stats-title">Gini Coefficient</span>
            <span className="text-eggyellow font-bold">{stats.gini}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default PredictionStats;
