import React, { Component } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "../../components/Cards/ProfileCard";

class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <div className="bg-darkblue pt-4" style={{ height: "100vh " }}>
        <div className="mx-auto container">
          <ProfileCard user={this.props.user} />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
