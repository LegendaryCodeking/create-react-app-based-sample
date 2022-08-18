import React, { Component } from "react";

//import FormAlert from "./FormComponents/FormAlert";

import Joi from "joi-browser";
import http from "../../services/httpService";
import config from "../../config.json";
import auth from "../../services/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUserPlus,
  faEnvelope,
  faHandHoldingDollar,
  faUsers,
  faMapLocation,
} from "@fortawesome/free-solid-svg-icons";
import RegisterRequirements from "../Cards/RegistrationRequirements";
import { Spinner } from "flowbite-react";

class SignUpForm extends Component {
  state = {
    newUser: {
      username: "",
      personalEmail: "",
      companyEmail: "",
      companyDesignation: "",
      loanCount: "",
      location: "",
      numberOfCustomers: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      companyType: "",
    },
    errors: {},
    loading: false,
  };

  complexityOptions = {
    min: 5,
    max: 250,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };

  schema = {
    fullName: Joi.string().min(4).required().label("Full name"),
    username: Joi.string().min(5).max(20).required().label("User name"),
    personalEmail: Joi.string().required().label("Personal email"),
    companyDesignation: Joi.string().required().label("Company designation"),
    companyType: Joi.required().label("Company type"),
    companyEmail: Joi.string().email().required().label("Company email"),
    loanCount: Joi.number().min(0).required().label("Loan Number"),
    numberOfCustomers: Joi.number()
      .min(0)
      .required()
      .label("Number of customers"),
    location: Joi.string().min(4).max(20).required().label("Location"),
    password: Joi.string().min(8).max(25).required().label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };

  validate = () => {
    const JOIoptions = {
      abortEarly: true,
    };
    const { error } = Joi.validate(this.state.newUser, this.schema, JOIoptions);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const newUser = { ...this.state.newUser };
    newUser[input.name] = input.value;
    this.setState({ newUser });
  };
  submitForm = (e) => {
    e.preventDefault();

    const { password } = this.state.newUser;

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    let passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );

    if (!passwordTest) {
      this.setState({
        errors: { passwordStrength: "Password does not meet requirements" },
      });
    }
    if (errors) return;

    console.log("submitting");
    this.setLoading(true);
    this.onRegister(this.state.newUser);
  };

  onRegister = async (user) => {
    console.log("user: ", user);

    const { data, status } = await http
      .post(config.apiEndoint + "/register", user)
      .catch((err) => {
        this.setLoading(false);
      });

    this.setLoading(false);

    if (data.status === "success" && status === 200) {
      auth.logIn(data.token);

      this.props.onLogin();
      this.props.history.push("/cst");
    } else {
      console.log("error", data.status);
      this.setState({
        errors: {
          apiError: data.reason,
        },
      });
    }

    /* http
      .post(config.apiEndoint + "/register", user)
      .then((result) => {})
      .catch((error) => {
        console.log("error: ", error);
        userObject.loggedIn = false;
        this.props.onLogin(userObject);
      }); */
  };

  setLoading = (value) => {
    this.props.onLoading(value);
  };
  render() {
    const { newUser, errors } = this.state;
    const { loading } = this.props;
    console.log("loading: ", loading);
    return (
      <div className="mx-auto form-container-signup">
        <form className="text-eggyellow bg-darkblue shadow-md rounded pt-6 pb-4 mb-2">
          <div className="mt-2 mb-2 p-2 text-eggyellow text-center">
            {/* <div className="mb-2">
              <span className="text-sm">WELCOME</span>
            </div> */}
            <div className="mb-2">
              <span className="text-white font-bold text-sm">
                ARTIFICIAL INTELLIGENCE CENTER OF EXCELLENCE AFRICA
              </span>
            </div>
            <div className="mb-2">
              <span className="text-darkblue text-sm">Create an account</span>
            </div>
          </div>
          <div className="mb-4">
            {Object.entries(errors).length > 0 ? (
              <RegisterRequirements errors={errors} />
            ) : (
              ""
            )}
          </div>
          <div className="mb-4 flex">
            <div className="w-6/12 flex p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Full name"
                value={newUser.fullName}
                onChange={this.handleChange}
                name="fullName"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faUser} />
              </span>
            </div>
            <div className="w-6/12 flex p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Username"
                autoComplete="username"
                onChange={this.handleChange}
                value={newUser.username}
                name="username"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faUser} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Personal email"
                onChange={this.handleChange}
                value={newUser.personalEmail}
                name="personalEmail"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faEnvelope} />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Company designation"
                onChange={this.handleChange}
                value={newUser.companyDesignation}
                name="companyDesignation"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <select
                className="rounded-none form-select appearance-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Type of company"
                onChange={this.handleChange}
                name="companyType"
                value={newUser.companyType}
              >
                <option>Type of company</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="email"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Company email address"
                name="companyEmail"
                value={newUser.companyEmail}
                onChange={this.handleChange}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="number"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Number of loans per month"
                onChange={this.handleChange}
                value={newUser.loanCount}
                name="loanCount"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon
                  className="text-darkblue"
                  icon={faHandHoldingDollar}
                />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="number"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Current number of customers"
                onChange={this.handleChange}
                value={newUser.numberOfCustomers}
                name="numberOfCustomers"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faUsers} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Location"
                name="location"
                onChange={this.handleChange}
                value={newUser.location}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon
                  className="text-darkblue"
                  icon={faMapLocation}
                />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="password"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Password"
                name="password"
                autoComplete="new-password"
                onChange={this.handleChange}
                value={newUser.password}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="password"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Confirm password"
                value={newUser.confirmPassword}
                onChange={this.handleChange}
                name="confirmPassword"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-darkblue" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between content-center">
            <button
              className="bg-white m-auto hover:bg-eggyellow2 place-self-center text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-6/12"
              type="button"
              onClick={this.submitForm}
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
                  icon={faUserPlus}
                />
                <span className="ml-2 font-bold text-sm">Sign Up</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
