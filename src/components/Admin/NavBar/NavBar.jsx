import React, { Component } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

class NavBar extends Component {
  state = {
    active: "dashboard",
  };

  componentDidMount() {
    let currentPath = window.location.pathname;
    console.log("currentPath: ", currentPath);
    this.setActiveWindow(currentPath);
  }

  setActiveWindow = (pathname) => {
    let tab = "";
    const paths = [
      { path: "/admin/dashboard", component: "dashboard" },
      { path: "/admin/users", component: "users" },
      { path: "/admin/organisations", component: "organisations" },
      { path: "/admin/models", component: "models" },
    ];

    paths.forEach((path) => {
      if (path.path === pathname) {
        tab = path.component;
      }
    });

    console.log("component", tab);
    this.setState({ active: tab });
  };

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      let currentPath = window.location.pathname;
      console.log("currentPath: ", currentPath);
      this.setActiveWindow(currentPath);
    }
  }

  render() {
    const { active } = this.state;
    return (
      <div className="p-4">
        <nav className="bg-darkblue p-4 border-white px-2 sm:px-4 py-2.5 rounded">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
              <span className=" text-sm whitespace-nowrap">
                <BreadCrumbs link1="admin" link2={active} />
              </span>
            </Link>
            <div className="flex items-center md:order-2">
              <button
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                {/* <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user"
                /> */}
                <Avatar
                  color={Avatar.getRandomColor("sitebase", [
                    "yellowgreen",
                    "cornflowerblue",
                    "teal",
                    "steelblue",
                    "slategray",
                    "salmon",
                  ])}
                  name={"Collins Nyamao"}
                  className="w-8 h-8 rounded-full"
                  size="35px"
                />
              </button>
              <div
                className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                style={{
                  position: "absolute",
                  inset: "0px auto auto 0px",
                  transform: "translate3d(0px, 10px, 0px)",
                }}
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="bottom"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="mobile-menu-2"
            >
              {/* <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
