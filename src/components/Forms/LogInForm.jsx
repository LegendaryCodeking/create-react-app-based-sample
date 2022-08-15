import React, { Component } from "react";

import Joi from "joi-browser";
import http from "../../services/httpService";
import config from "../../config.json";
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

  onLogin = async (username, password) => {
    let userObject = {
      username: username,
      password: password,
    };
    let user = {};
    console.log("userObject: ", userObject);

    this.setState({ loading: true });

    const { data, status } = await http
      .post(config.apiEndoint + "/login", userObject)
      .catch((err) => {
        console.log("caught error");
        this.setLoading(false);
      });
    console.log("status: ", status);
    console.log("data: ", data);

    //this.setState({ loading: false });
    this.setLoading(false);

    if (status === 200 && data.status === "failed") {
      //console.log("check your error");

      this.setState({
        errors: {
          error: data.reason,
        },
      });
      /* user.loggedIn = false;
            this.props.onLogin(user); */
    } else if (status === 200 && data.status === "success") {
      user.username = username;
      user.token = data.token;
      user.loggedIn = true;
      user.email = data.email;
      this.props.onLogin(user);
      console.log(this.props);

      toast.success("Login successful! Redirecting you...");

      setTimeout(() => {
        this.props.history.push("/cst");
      }, 3000);
    }

    /* setTimeout(() => {
      http
        .post(config.apiEndoint + "/login", userObject)
        .then((response) => {
          let { data, status } = response;
          console.log("data: ", data);
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error: ", error);
        });
    }, 1000); */
  };

  setLoading = (value) => {
    this.props.onLoading(value);
  };
  render() {
    const { account, errors } = this.state;
    const { loading } = this.props;
    return (
      <div className="mx-auto form-container">
        <form className="text-eggyellow bg-darkblue shadow-md rounded px-4 pt-6 pb-4 mb-2">
          <div className="mt-2 mb-2 p-2 text-eggyellow text-center">
            <div className="mb-2">
              <span className="text-sm">WELCOME</span>
            </div>
            <div className="mb-2">
              <span className="text-white text-sm">
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
                autoComplete="username"
                value={account.username}
                onChange={this.handleChange}
                name="username"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow invalid:border-red-600 block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Username"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-eggyellow bg-darkblue border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-eggyellow" icon={faUser} />
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
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Password"
                autoComplete="current-password"
                name="password"
                value={account.password}
                onChange={this.handleChange}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-eggyellow bg-darkblue border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-eggyellow" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-white disabled:bg-gray-500 hover:bg-eggyellow2 text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-full"
              type="button"
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
