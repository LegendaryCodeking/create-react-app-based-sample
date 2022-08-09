import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexPage from "./views/index";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

class App extends Component {
  state = {
    user: {},
  };
  render() {
    let { user } = this.state;
    return (
      <Switch>
        <Route user={user} path="/" exact component={IndexPage} />
        <Route user={user} path="/cst" component={MainLayout} />
        <Route user={user} path="/auth" component={AuthLayout} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default App;
