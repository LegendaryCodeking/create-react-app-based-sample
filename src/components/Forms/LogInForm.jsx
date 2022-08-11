import React, { Component } from "react";

import Joi from "joi-browser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import FormAlert from "./FormComponents/FormAlert";
import { Spinner } from "flowbite-react";

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

    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.onLogin(username, password);
    //
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
            {errors.username ? (
              <FormAlert data={errors.username} type={"failure"} name="Error" />
            ) : (
              ""
            )}
            {errors.password ? (
              <FormAlert data={errors.password} type={"failure"} name="Error" />
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
        </form>
      </div>
    );
  }
}

export default LogInForm;
