import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainFooter extends Component {
  state = {};
  render() {
    return (
      <footer className=" bottom-0 left-0 z-20 p-4 w-full bg-darkblue border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-white sm:text-center">
          © 2022{" "}
          <Link to="/" className="hover:underline">
            AICE™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
          <li>
            <Link to="/" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default MainFooter;
