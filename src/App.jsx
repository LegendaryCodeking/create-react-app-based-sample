import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexPage from "./views/LandingPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./services/authService";
import LogOut from "./components/LogOut";

class App extends Component {
  state = {
    user: {},
    loggedIn: true,
    loading: false,
    TVSResultData: [],
    approvalData: {},
  };

  onNext = (data) => {
    this.setState({ TVSResultData: data });
  };

  componentDidMount() {
    //const token = localStorage.getItem("token");
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  onLogin = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  onLoading = (value) => {
    this.setState({ loading: value });
  };

  onApprovalData = (data) => {
    this.setState({ approvalData: data });
  };

  render() {
    let { user, loading, TVSResultData, approvalData } = this.state;
    return (
      <React.Fragment>
        <ToastContainer
          autoClose={1000}
          position="bottom-right"
          theme="colored"
          hideProgressBar={true}
        />
        <Switch>
          <Route user={user} path="/" exact component={IndexPage} />
          <Route
            path="/cst"
            render={(props) => (
              <MainLayout
                TVSResult={TVSResultData}
                onNext={this.onNext}
                user={user}
                approvalData={approvalData}
                onApprovalData={this.onApprovalData}
                {...props}
              />
            )}
          ></Route>
          <Route path="/logout">
            <LogOut />
          </Route>
          <Route
            user={user}
            path="/auth"
            component={(props) => (
              <AuthLayout
                loading={loading}
                onLoading={this.onLoading}
                onLogin={this.onLogin}
                {...props}
              />
            )}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
