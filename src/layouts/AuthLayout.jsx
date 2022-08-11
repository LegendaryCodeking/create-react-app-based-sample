import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//import SecondaryNavBar from "../components/NavBars/SecondaryNav";
//import SecondaryFooter from "../components/Footers/SecondaryFooter";

import LoginPage from "../views/Auth/LogIn";
import SignUpPage from "../views/Auth/SignUp";

class AuthLayout extends Component {
  state = {};

  onLogin = (user) => {
    console.log("user AUL: ", this.props);

    this.props.onLogin(user);
  };
  render() {
    return (
      <>
        {/* <SecondaryNavBar transparent /> */}
        <main>
          <section className="">
            {/* <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                backgroundImage:
                  "url(" + require("../assets/images/authbg.png").default + ")",
              }}
            ></div> */}
            <Switch>
              <Route
                path="/auth/login"
                exact
                component={(props) => (
                  <LoginPage {...props} onLogin={this.onLogin} />
                )}
              ></Route>
              <Route path="/auth/register" exact component={SignUpPage} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
            {/* <SecondaryFooter absolute /> */}
          </section>
        </main>
      </>
    );
  }
}

export default AuthLayout;
