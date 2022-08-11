import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBars/MainNav";
import Footer from "../components/Footers/MainFooter";
import TabNav from "../components/NavBars/TabNav";
import TargetVariableSettingPage from "../views/Main/TargetVariableSettingPage";
import DataDescriptionPage from "../views/Main/DataDescriptionPage";
import DataPrediction from "../views/Main/DataPredictionPage";
import PredictedData from "../views/Main/PredictedDataPage";
import Reports from "../views/Main/ReportsPage";

class MainLayout extends Component {
  state = {};
  onLogOut = () => {
    this.props.onLogOut();
  };

  componentDidMount() {
    console.log("main lay props", this.props);
    const { user, history } = this.props;
    if (user.loggedIn) {
    } else {
      history.push("/auth");
    }
  }
  render() {
    let { user } = this.props;
    return (
      <>
        <div className="relative">
          <NavBar onLogOut={this.onLogOut} user={user} {...this.props} />
          <div className="mx-auto p-2 bg-darkblue">
            <span className="text-white mt-2 ml-2 font-bold">
              AICE Credit scoring tool
            </span>
          </div>
          <TabNav />

          <div className="">
            <Switch>
              <Route
                path="/cst/dashboard"
                exact
                component={TargetVariableSettingPage}
              />
              <Route
                exact
                path="/cst/data-description"
                component={DataDescriptionPage}
              />
              <Route
                path="/cst/data-prediction"
                exact
                component={DataPrediction}
              />
              <Route
                path="/cst/predicted-data"
                exact
                component={PredictedData}
              />
              <Route path="/cst/reports" exact component={Reports} />
              <Redirect from="/cst" to="/cst/dashboard" />
            </Switch>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default MainLayout;
