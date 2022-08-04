import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import AICELogo from "../../assets/images/aicelogo1.png";
import "../../assets/stylesheets/main-nav.css";
class MainNavBar extends Component {
  state = {};
  render() {
    return (
      <>
        <nav className="bg-darkblue px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 border-b border-gray-200">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <img
                src={AICELogo}
                className="mr-3 h-11 sm:h-9 aice-nav"
                alt="Flowbite Logo"
              ></img>
            </Link>
            <div className="flex md:order-2">
              <button
                type="button"
                className="text-darkblue bg-eggyellow hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                <span className="ml-2">Sign Up</span>
              </button>

              <button
                type="button"
                className="text-darkblue ml-2 bg-eggyellow hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <span className="ml-2">Log In</span>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-darkblue">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white text-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white text-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white text-bold rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default MainNavBar;
