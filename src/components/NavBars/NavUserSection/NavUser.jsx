import React, { Component } from "react";
//import { Link } from "react-router-dom";

import { Dropdown } from "flowbite-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
//import profilePic from "../../../assets/images/avatar.webp";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";
//import { Redirect } from "react-router-dom";

class NavUser extends Component {
  state = {
    user: {
      company_email: "",
      company_name: "",
      exp: "",
      first_name: "",
      id: "",
      last_name: "",
      personal_email: "",
      username: "",
    },
  };

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      this.setUser();
    }
  }

  logOutUser = (user) => {
    console.log("user: ", user);
    //this.props.history.push("/auth");
    this.props.onLogOut();
  };

  setUser = () => {
    let { user: propUser } = this.props;
    console.log("propUser: ", propUser);

    if (propUser) {
      this.setState({ user: propUser });
    }
  };
  render() {
    let { user } = this.state;
    return (
      <div className="flex items-center md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "yellowgreen",
                "cornflowerblue",
                "teal",
                "steelblue",
                "slategray",
                "salmon",
              ])}
              name={user.first_name + " " + user.last_name}
              className="rounded-full ring-2 ring-eggyellow ring-offset-4 ring-offset-darkblue"
              size="35px"
            />
          }
        >
          <Dropdown.Header>
            <div className="flex">
              <span className="block text-sm font-bold">
                {user.first_name + " " + user.last_name}
              </span>
            </div>
            <span className="block truncate text-sm font-medium">
              {user.personal_email ? user.personal_email : user.company_email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <NavLink to="/cst/dasboard">
              {" "}
              <FontAwesomeIcon className="mr-2" icon={faHouse} /> Dashboard
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Item>
            <NavLink to="/cst/profile">
              {" "}
              <FontAwesomeIcon className="mr-2" icon={faUser} /> Profile
            </NavLink>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <NavLink to="/logout">
              {" "}
              <FontAwesomeIcon className="mr-2" icon={faPersonRunning} /> Sign
              Out
            </NavLink>
          </Dropdown.Item>
        </Dropdown>
      </div>
    );
  }
}

export default NavUser;
