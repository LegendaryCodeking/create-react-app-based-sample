import React, { Component } from "react";

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

class SignUpForm extends Component {
  state = {};
  render() {
    return (
      <div className="mx-auto form-container-signup">
        <form className="text-eggyellow bg-darkblue shadow-md rounded pt-6 pb-4 mb-2">
          <div className="mt-2 mb-2 p-2 text-eggyellow text-center">
            {/* <div className="mb-2">
              <span className="text-sm">WELCOME</span>
            </div> */}
            <div className="mb-2">
              <span className="text-white text-sm">
                ARTIFICIAL INTELLIGENCE CENTER OF EXCELLENCE AFRICA
              </span>
            </div>
            <div className="mb-2">
              <span className="text-darkblue text-sm">Create an account</span>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="w-6/12 flex p-2">
              <input
                type="text"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Full name"
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
              >
                <option>Choose one...</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
            <div className="flex w-6/12 p-2">
              <input
                type="email"
                className="rounded-none bg-darkblue border text-eggyellow focus:ring-eggyellow focus:border-eggyellow block flex-1 min-w-0 w-full text-sm border-eggyellow p-2.5 "
                placeholder="Company email address"
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
            >
              <FontAwesomeIcon className="text-xs" icon={faUserPlus} />
              <span className="ml-2 text-sm font-bold">Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
