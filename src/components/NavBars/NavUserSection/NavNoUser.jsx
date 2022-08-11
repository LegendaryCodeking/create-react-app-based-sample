import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

class NavNoUser extends Component {
  state = {};
  switchToLogin = () => {
    this.props.history.push("/auth");
    //console.log(this.props);
  };
  switchToRegister = () => {
    this.props.history.push("/auth/register");
  };
  render() {
    return (
      <div className="flex md:order-2">
        <button
          type="button"
          onClick={this.switchToRegister}
          className="text-darkblue bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-l hover:bg-from-gradient-start hover:bg-gradient-end focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          <span className="ml-2">Sign Up</span>
        </button>

        <button
          type="button"
          onClick={this.switchToLogin}
          className="text-white border border-eggyellow hover:bg-eggyellow hover:text-darkblue ml-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          <span className="ml-2">Log In</span>
        </button>
      </div>
    );
  }
}

export default NavNoUser;
