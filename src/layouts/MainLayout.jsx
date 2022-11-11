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
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

class MainLayout extends Component {
  state = {
    mlStats: {},
    approvalStatusData: {},
    TVSResultData: {},
    steps: [
      {
        target: ".caspre-tutor-step-1",
        title: "Data Upload",
        content: "Upload historical data for model training.",
      },
      {
        target: ".caspre-tutor-step-2",
        title: "Data description",
        content:
          "Here you can find a summary description of the data you uploaded.",
      },
      {
        target: ".caspre-tutor-step-3",
        title: "Model Statistics",
        content:
          "View the status of the model after training, these include charts and tables.",
      },
      {
        target: ".caspre-tutor-step-4",
        title: "Data prediction",
        content: "Upload new data for prediction.",
      },
      {
        target: ".caspre-tutor-step-5",
        title: "Reports",
        content:
          "View and download reports. These include data description, model metrics and data prediction reports.",
      },
      {
        target: ".caspre-tutor-step-6",
        title: "File input",
        content:
          "This is your starting point. Upload historical data here: accepted data types are csv and excel.",
      },
    ],
    run: false,
    stepIndex: 0,
  };
  onLogOut = () => {
    this.props.onLogOut();
  };

  handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      // Update state to advance the tour
      this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };

  startTour = () => {
    this.setState({ stepIndex: 0, run: true });
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
    const {
      TVSResultData,
      approvalStatusData,
      mlStats,
      run,
      steps,
      stepIndex,
    } = this.state;
    return (
      <>
        <Joyride
          run={run}
          steps={steps}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          disableScrolling={true}
          stepIndex={stepIndex}
          callback={this.handleJoyrideCallback}
          styles={{
            options: {
              zIndex: 1000,
              fontSize: "12px",
            },
          }}
        />
        <div className="relative">
          <NavBar onLogOut={this.onLogOut} user={user} {...this.props} />
          <div className="mx-auto p-2 bg-darkblue flex">
            <span className="text-white mt-2 ml-2 font-bold w-1/2">
              AICE Credit scoring tool.
            </span>
            <span
              onClick={this.startTour}
              className="text-lightblue text-xs mt-2 w-1/2 text-right mr-3 font-bold animate-pulse cursor-pointer"
            >
              Take a tour
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

              <Route path="/cst/predicted-data" exact>
                <PredictedDataPage
                  onApprovalStatusData={this.setApprovalStatusData}
                />
              </Route>

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
