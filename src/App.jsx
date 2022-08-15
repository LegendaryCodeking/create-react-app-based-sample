import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexPage from "./views/LandingPage";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    user: {},
    loading: false,
  };

  onLogin = (user) => {
    //console.log("user set: ", user);
    if (user.loggedIn) {
      this.setState({
        user: {
          username: user.username,
          email: user.email,
          loggedIn: true,
          token: user.token,
        },
      });

      //console.log("this.props: ", this.props);
    } else {
      this.setState({
        user: {
          loggedIn: false,
        },
      });
    }
  };

  onLogOut = () => {
    this.setState({
      user: {
        loggedIn: false,
      },
    });
  };

  onLoading = (value) => {
    this.setState({ loading: value });
  };

  componentDidUpdate() {
    //console.log("component updated", this.props);
  }
  render() {
    let { user, loading } = this.state;
    return (
      <React.Fragment>
        <ToastContainer autoClose={2000} />
        <Switch>
          <Route user={user} path="/" exact component={IndexPage} />
          <Route
            path="/cst"
            render={(props) => (
              <MainLayout onLogOut={this.onLogOut} user={user} {...props} />
            )}
          ></Route>
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
