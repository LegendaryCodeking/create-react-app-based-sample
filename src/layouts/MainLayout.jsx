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
//import LogOut from "../components/LogOut";

class MainLayout extends Component {
  state = {};
  onLogOut = () => {
    this.props.onLogOut();
  };

  componentDidMount() {
    console.log("main lay props", this.props);
    const { history } = this.props;

    try {
      const token = localStorage.getItem("token");
      if (token) {
        history.push("/cst/dashboard");
      } else {
        history.push("/auth");
      }
    } catch (error) {
      console.log("error: ", error);
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
                component={(props) => (
                  <TargetVariableSettingPage
                    {...props}
                    onNext={this.props.onNext}
                  />
                )}
              />
              <Route
                exact
                path="/cst/data-description"
                component={(props) => (
                  <DataDescriptionPage
                    {...props}
                    TVSResult={this.props.TVSResult}
                  />
                )}
              />
              <Route
                path="/cst/data-prediction"
                exact
                component={DataPrediction}
              />
              <Route
                path="/cst/predicted-data"
                exact
                component={(props) => {
                  <PredictedData
                    {...props}
                    onApprovalData={this.props.onApprovalData}
                  />;
                }}
              />
              {/* <Route path="/logout" exact component={LogOut} /> */}
              <Route
                path="/cst/reports"
                exact
                component={(props) => (
                  <Reports
                    {...props}
                    approvalData={this.props.approvalData}
                    TVSResult={this.props.TVSResult}
                  />
                )}
              />
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
