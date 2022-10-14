import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBars/MainNav";
import Footer from "../components/Footers/MainFooter";
import TabNav from "../components/NavBars/TabNav";
import TargetVariableSettingPage from "../views/Main/TargetVariableSettingPage";
import DataDescriptionPage from "../views/Main/DataDescriptionPage";
import DataPrediction from "../views/Main/DataPredictionPage";
import Reports from "../views/Main/ReportsPage";
import ProfilePage from "../views/Main/ProfilePage";
import PredictedDataPage from "../views/Main/PredictedDataPage";

class MainLayout extends Component {
  state = {
    mlStats: {},
    approvalStatusData: {},
    TVSResultData: {},
  };
  onLogOut = () => {
    this.props.onLogOut();
  };

  setMLstats = (data) => {
    this.setState({ mlStats: data });
  };

  componentDidMount() {
    const { history } = this.props;

    try {
      const token = localStorage.getItem("token");
      if (token) {
        //history.push("/cst/dashboard");
      } else {
        history.push("/auth");
      }
    } catch (error) {
      history.push("/auth");
    }
  }

  onNext = (data) => {
    console.log("data: ", data);
    this.setState({ TVSResultData: data });
  };

  setApprovalStatusData = (data) => {
    this.setState({ approvalStatusData: data });
  };
  render() {
    let { user } = this.props;
    const { TVSResultData, approvalStatusData, mlStats } = this.state;
    return (
      <>
        <div className="relative">
          <NavBar onLogOut={this.onLogOut} user={user} {...this.props} />
          <div className="mx-auto p-2 bg-darkblue">
            <span className="text-white mt-2 ml-2 font-bold">
              AICE Credit scoring tool.
            </span>
          </div>
          <TabNav />

          <div className="">
            <Switch>
              <Route
                path="/cst/dashboard"
                exact
                component={(props) => (
                  <TargetVariableSettingPage {...props} onNext={this.onNext} />
                )}
              />
              <Route
                exact
                path="/cst/data-description"
                component={(props) => (
                  <DataDescriptionPage {...props} TVSResult={TVSResultData} />
                )}
              />
              <Route
                path="/cst/data-prediction"
                exact
                component={(props) => (
                  <DataPrediction
                    mlStats={mlStats}
                    onMLstats={this.setMLstats}
                    {...props}
                  />
                )}
              />

              <Route
                path="/cst/predicted-data"
                exact
                component={(props) => (
                  <PredictedDataPage
                    onApprovalStatusData={this.setApprovalStatusData}
                    approvalData={approvalStatusData}
                    TVSResult={TVSResultData}
                    {...props}
                  />
                )}
              />

              {/* <Route path="/logout" exact component={LogOut} /> */}
              <Route
                path="/cst/reports"
                exact
                component={(props) => (
                  <Reports
                    {...props}
                    user={user}
                    mlStats={mlStats}
                    approvalData={approvalStatusData}
                    TVSResult={TVSResultData}
                  />
                )}
              />
              <Route
                path="/cst/profile"
                exact
                component={(props) => <ProfilePage {...props} user={user} />}
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
