import React, { Component } from "react";

//import FormAlert from "./FormComponents/FormAlert";

import Joi from "joi-browser";
import api from "../../services/api";
//import config from "../../config.json";
//import auth from "../../services/authService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faUserPlus,
  faEnvelope,
  faMapLocation,
  faUserGear,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import RegisterRequirements from "../Cards/RegistrationRequirements";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

class SignUpForm extends Component {
  state = {
    newUser: {
      userName: "",
      personalEmail: "",
      companyEmail: "",
      companyDesignation: "",
      location: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      firstName: "",
      lastName: "",
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
    firstName: Joi.string().min(4).required().label("First name"),
    lastName: Joi.string().min(4).required().label("Last name"),
    userName: Joi.string().min(5).max(20).required().label("User name"),
    personalEmail: Joi.string().required().label("Personal email"),
    companyDesignation: Joi.string().required().label("Company designation"),
    companyName: Joi.required().label("Company Name"),
    companyEmail: Joi.string().email().required().label("Company email"),
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

    let { newUser } = this.state;

    let registerUser = {
      username: newUser.userName,
      email: newUser.personalEmail,
      company_email: newUser.companyEmail,
      company_designation: newUser.companyDesignation,
      company_location: newUser.location,
      total_customers: 0,
      password: newUser.password,
      company_name: newUser.companyName,
      date_of_birth: "2020-01-01",
      total_amount_disbursed: 0,
      first_name: newUser.firstName,
      last_name: newUser.lastName,
    };

    const response = await api.postRegister(registerUser).catch((err) => {
      this.setLoading(false);
    });
    console.log("response: ", response);

    this.setLoading(false);

    if (response.data.status === "success" && response.status === 200) {
      //auth.logIn(response.data.token);

      //this.props.onLogin();
      this.props.history.push("/auth/login");
    } else if (response.status === 200 && response.data.status === "failed") {
      toast.error(response.data.response);
    } else {
      console.log("error", response.data.status);
      this.setState({
        errors: {
          apiError: response.data.reason,
        },
      });
    }
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
              <span className="text-eggyellow font-bold text-sm">
                ARTIFICIAL INTELLIGENCE CENTER OF EXCELLENCE AFRICA
              </span>
            </div>
            <div className=" mt-4">
              <span className="text-white text-xs font-bold">
                Input your details to create your account... or{" "}
                <p
                  className="text-lightblue hover:text-eggyellow cursor-pointer"
                  onClick={() => this.props.history.push("/auth/login")}
                >
                  Sign in ?
                </p>{" "}
                if you already have an account.
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
          <div className="mb-4 flex">
            <div className="w-6/12 flex p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={this.handleChange}
                name="firstName"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faUser} />
              </span>
            </div>
            <div className="w-6/12 flex p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Last Name"
                onChange={this.handleChange}
                value={newUser.lastName}
                name="lastName"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faUser} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Username"
                onChange={this.handleChange}
                value={newUser.userName}
                name="userName"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faUser} />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Personal Email"
                onChange={this.handleChange}
                value={newUser.personalEmail}
                name="personalEmail"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Company name"
                onChange={this.handleChange}
                value={newUser.companyName}
                name="companyName"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faBuilding} />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="email"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Company email address"
                name="companyEmail"
                value={newUser.companyEmail}
                onChange={this.handleChange}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faEnvelope} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Company designation"
                onChange={this.handleChange}
                value={newUser.companyDesignation}
                name="companyDesignation"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faUserGear} />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Location"
                onChange={this.handleChange}
                value={newUser.location}
                name="location"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faMapLocation} />
              </span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="flex w-6/12 p-2">
              <input
                type="password"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Password"
                name="password"
                autoComplete="new-password"
                onChange={this.handleChange}
                value={newUser.password}
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faLock} />
              </span>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="password"
                className="rounded-none bg-darkblue border text-eggyellow peer focus:ring-2 focus:ring-eggyellow focus:border-none block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 focus:border-r-0"
                placeholder="Confirm password"
                value={newUser.confirmPassword}
                onChange={this.handleChange}
                name="confirmPassword"
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-darkblue bg-eggyellow border border-l-0 border-eggyellow peer-focus:ring-2 peer-focus:ring-eggyellow peer-focus:bg-darkblue peer-focus:text-eggyellow peer-focus:border-none peer-focus:border-l-0 peer-focus:ring-l-0">
                <FontAwesomeIcon className="" icon={faLock} />
              </span>
            </div>
          </div>
          {/* <div className="mb-4 flex">
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
          </div> */}
          <div className="flex items-center justify-between content-center mt-8">
            <button
              className="bg-white m-auto hover:bg-eggyellow2 place-self-center text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-6/12"
              type="button"
              id="registerSubmitButton"
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
