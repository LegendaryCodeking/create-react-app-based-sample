import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

class LogInForm extends Component {
  state = {};
  render() {
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
            <label className="block mb-2 text-sm font-Montserrat font-regular text-yellow dark:text-gray-300">
              Username
            </label>
            <div className="flex">
              <input
                type="text"
                id="website-admin"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
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
              ></input>
              <span className="inline-flex items-center px-3 text-sm text-eggyellow bg-darkblue border border-l-0 border-eggyellow">
                <FontAwesomeIcon className="text-eggyellow" icon={faLock} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-white hover:bg-eggyellow2 text-darkblue py-2 px-4 focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              <FontAwesomeIcon
                className="text-xs font-bold"
                icon={faArrowRightToBracket}
              />
              <span className="ml-2 font-bold text-sm">Log In</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LogInForm;
