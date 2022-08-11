import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexPage from "./views/index";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

class App extends Component {
  state = {
    user: {},
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

  componentDidUpdate() {
    console.log("component updated", this.props);
  }
  render() {
    let { user } = this.state;
    return (
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
            <AuthLayout onLogin={this.onLogin} {...props} />
          )}
        />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default App;
