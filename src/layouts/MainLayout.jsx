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
import ProfilePage from "../views/Main/ProfilePage";
//import LogOut from "../components/LogOut";

class MainLayout extends Component {
  state = {
    mlStats: {},
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
  render() {
    let { user } = this.props;
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
                component={(props) => (
                  <DataPrediction onMLstats={this.setMLstats} {...props} />
                )}
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
                    user={user}
                    mlStats={this.state.mlStats}
                    approvalData={this.props.approvalData}
                    TVSResult={this.props.TVSResult}
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
