import React, { Component } from "react";
//import { Link } from "react-router-dom";
import LogInForm from "../../components/Forms/LogInForm";

import logo from "../../assets/images/aicelogo1.png";
import "../../assets/stylesheets/login.css";

class LoginPage extends Component {
  state = {};

  onLoading = (value) => {
    this.props.onLoading(value);
  };
  render() {
    const { loading } = this.props;
    return (
      <section className="h-screen">
        <div className="h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full">
            <div className="row-0 hidden md:flex items-center mx-auto shrink-1 place-content-center md:shrink-0 basis-auto mb-12 md:mb-0 bg-blue-800 h-full xl:w-6/12 lg:w-6/12 md:w-6/12 loginBackground bg-cover">
              <div className="h-full w-full flex items-center place-content-center backdrop-blur-sm backdrop-brightness-50">
                <img src={logo} className="loginLogo" alt="Sample" />
              </div>
            </div>
            <div className="flex bg-darkblue xl:justify-center lg:justify-between justify-center items-center bg-slate-800 xl:w-6/12 lg:w-6/12 md:w-6/12 w-full h-full">
              <LogInForm
                {...this.props}
                loading={loading}
                onLoading={this.onLoading}
                onLogin={this.props.onLogin}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
