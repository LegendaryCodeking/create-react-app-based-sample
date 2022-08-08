import React, { Component } from "react";
import axios from "axios";

import SignUpForm from "../../components/Forms/SignUpForm";

import logo from "../../assets/images/aicelogo1.png";
import "../../assets/stylesheets/signup.css";

class SignUpPage extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    let promise = axios.get("http://localhost:3000/");
    const response = await promise;
    console.log("response: ", response);
  }
  render() {
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
              <SignUpForm />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUpPage;
