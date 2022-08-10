import React, { Component } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import LogInForm from "../../components/Forms/LogInForm";

import logo from "../../assets/images/aicelogo1.png";
import "../../assets/stylesheets/login.css";

class LoginPage extends Component {
  state = {
    loading: false,
  };

  onLogin = (username, password) => {
    let userObject = {
      username: "collinsnyamao",
      password: "123456789",
    };
    console.log("userObject: ", userObject);

    this.setState({ loading: true });

    setTimeout(() => {
      axios
        .post("http://localhost:8888/login", userObject)
        .then((response) => {
          this.setState({ loading: false });
          console.log("response: ", response);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error: ", error);
        });
    }, 10000);
  };

  render() {
    const { loading } = this.state;
    return (
      <section className="h-screen">
        <div className="h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full">
            <div className="row-0 flex items-center mx-auto shrink-1 place-content-center md:shrink-0 basis-auto mb-12 md:mb-0 bg-blue-800 h-full xl:w-7/12 lg:w-7/12 md:w-9/12 loginBackground">
              {/* <div className="h-full" style={backgroundImage}></div>
              <img
                className="items-center justify-center content-center"
                src={logo}
                alt="logo"
                style={content}
              /> */}
              <img src={logo} className="loginLogo" alt="Sample" />
            </div>
            <div className="flex  bg-darkblue xl:justify-center lg:justify-between justify-center items-center bg-slate-800 xl:w-5/12 lg:w-5/12 md:w-6/12 h-full">
              <LogInForm onLogin={this.onLogin} loading={loading} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
