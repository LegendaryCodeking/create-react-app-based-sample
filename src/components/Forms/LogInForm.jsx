import React, { Component } from "react";

import Joi from "joi-browser";
//import http from "../../services/httpService";
import api from "../../services/api";
import auth from "../../services/authService";
//import config from "../../config.json";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import RegisterRequirements from "../Cards/RegistrationRequirements";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

class LogInForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
    loading: false,
  };

  schema = {
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(5).max(20).required(),
  };

  validate = () => {
    const JOIoptions = {
      abortEarly: true,
    };
    const { error } = Joi.validate(this.state.account, this.schema, JOIoptions);

    if (!error) return null;
    //

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state.account;
    this.setLoading(true);

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onLogin(username, password);
    //
  };

  componentDidUpdate(previousProps, previousState, snapshot) {
    console.log("previousProps: ", previousProps);
    console.log("previousState: ", previousState);
    console.log("snapshot: ", snapshot);

    let stateKeys = Object.keys(previousState);

    if (this.props !== previousProps) {
      stateKeys.forEach((key) => {
        if (previousState[key] !== this.state[key]) {
          this.setState({ [key]: previousState[key] });
        }
      });
    }
  }
  onLogin = async (username, password) => {
    let userObject = {
      username: username,
      password: password,
    };
    //let user = {};
    console.log("userObject: ", userObject);

    this.setState({ loading: true });

    const response = await api.postLogin(userObject);
    console.log("status: ", response.status);
    console.log("login response: ", response);

    //this.setState({ loading: false });
    this.setLoading(false);

    if (response.status === 200 && response.data.status === "failed") {
      //console.log("check your error");
      toast.error(response.data.reason);

      this.setState({
        errors: {
          error: response.data.reason,
        },
      });
      /* user.loggedIn = false;
            this.props.onLogin(user); */
    } else if (response.status === 200 && response.data.status === "success") {
      auth.logIn(response.data.token);
      this.props.onLogin();

      toast.success("Login successful! Redirecting you...");

      setTimeout(() => {
        this.props.history.push("/cst");
      }, 1000);

      const authenticatedUser = auth.getCurrentUser();
      console.log("authenticatedUser: ", authenticatedUser);
      const logLoginResponse = await api.postNewLogin(authenticatedUser);

      if (logLoginResponse.status === 200) {
        console.log("log successful! Redirecting");
      }
    } else if (response.status === 400 && response.data.status === "failed") {
      toast.error(response.data.reason);
    }
  };

  setLoading = (value) => {
    this.props.onLoading(value);
  };
  render() {
    const { account, errors } = this.state;
    const { loading } = this.props;
    return (
      <div className="mx-auto form-container">
        <form
          autoComplete="off"
          className="text-eggyellow bg-darkblue shadow-md rounded px-4 pt-6 pb-4 mb-2"
        >
          <div className="mt-2 mb-2 p-2 text-eggyellow text-center">
            <div className="mb-2">
              <span className="text-sm font-bold">WELCOME</span>
            </div>
            <div className="mb-2">
              <span className="text-white font-bold text-xs">
                ARTIFICIAL INTELLIGENCE CENTER OF EXCELLENCE AFRICA
              </span>
            </div>
          </div>
          <div className="mb-4">
            {Object.entries(errors).length > 0 ? (
              <RegisterRequirements errors={errors} />
            ) : (
              ""
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-Montserrat font-regular text-yellow dark:text-gray-300">
              Username
            </label>
            <div className="flex">
              <input
                autoFocus
                disabled={loading}
                type="text"
                autoComplete="off"
                value={account.username}
                onChange={this.handleChange}
                name="username"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Username"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faUser} />
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-yellow dark:text-gray-300">
              Password
            </label>
            <div className="flex">
              <input
                type="password"
                disabled={loading}
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={account.password}
                onChange={this.handleChange}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-white disabled:bg-gray-500 hover:bg-eggyellow2 text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-full"
              type="button"
              name="submitBtn"
              id="submitBtn"
              onClick={this.handleSubmit}
              disabled={this.validate()}
            >
              <div className={loading ? "" : "hidden"}>
                <Spinner size="sm" light={true} />
                <span className="ml-2 text-darkblue font-bold text-sm">
                  Loading...
                </span>
              </div>
              <div className={!loading ? "" : "hidden"}>
                <FontAwesomeIcon
                  className="text-xs font-bold"
                  icon={faArrowRightToBracket}
                />
                <span className="ml-2 font-bold text-sm">Log In</span>
              </div>
            </button>
          </div>
          <div className="flex mb-4 mt-4">
            <div className="w-1/2">
              <Link
                to="/auth/register"
                className="text italic text-xs text-eggyellow font-bold hover:text-eggyellow2 hover:cursor-pointer float-left"
              >
                Create account ?
              </Link>
            </div>
            <div className="w-1/2">
              <Link
                to="/auth"
                className="text italic text-xs text-eggyellow font-bold hover:text-eggyellow2 hover:cursor-pointer float-right"
              >
                Forgot password
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LogInForm;
