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

  render() {
    let { user, loading } = this.state;
    return (
      <React.Fragment>
        <ToastContainer autoClose={1000} />
        <Switch>
          <Route user={user} path="/" exact component={IndexPage} />
          <Route
            path="/cst"
            render={(props) => <MainLayout user={user} {...props} />}
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
