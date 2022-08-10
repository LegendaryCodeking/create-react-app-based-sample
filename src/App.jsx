import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexPage from "./views/index";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

class App extends Component {
  state = {
    user: {
      name: "Jane Doe",
      email: "jane@aiceafrica.com",
      loggedIn: true,
    },
  };
  render() {
    let { user } = this.state;
    return (
      <Switch>
        <Route user={user} path="/" exact component={IndexPage} />
        <Route
          path="/cst"
          render={(props) => <MainLayout user={user} {...props} />}
        ></Route>
        <Route user={user} path="/auth" component={AuthLayout} />
        <Redirect from="*" to="/" />
      </Switch>
    );
  }
}

export default App;
