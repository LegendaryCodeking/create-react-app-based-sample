import React, { Component } from "react";
//import { Link } from "react-router-dom";

import { Dropdown } from "flowbite-react";

//import profilePic from "../../../assets/images/avatar.webp";
import { NavLink } from "react-router-dom";
import Avatar from "react-avatar";
//import { Redirect } from "react-router-dom";

class NavUser extends Component {
  state = {};

  logOutUser = (user) => {
    console.log("user: ", user);
    //this.props.history.push("/auth");
    this.props.onLogOut();
  };
  render() {
    let { user } = this.props;
    return (
      <div className="flex items-center md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              name={user.username}
              className="rounded-full ring ring-lightblue"
              size="45px"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.username}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <NavLink to="/auth" onClick={(e) => this.logOutUser(user)}>
              Sign Out
            </NavLink>
          </Dropdown.Item>
        </Dropdown>
      </div>
    );
  }
}

export default NavUser;
