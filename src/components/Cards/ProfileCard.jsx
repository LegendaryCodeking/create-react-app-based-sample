import React, { Component } from "react";
import ProfileSummaryCard from "../Profile/ProfileSummaryCard";
import UpdateCard from "../Profile/UpdateCard";

class ProfileCard extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const currentUser = this.props.user;

    this.setState({ user: currentUser });
  }

  setNewUser = (userData) => {
    this.setState({ user: userData });
  };
  render() {
    const { user } = this.state;
    return (
      <>
        <div className="flex flex-wrap mb-8 mt-16">
          <div className="w-full lg:w-8/12 px-4">
            <UpdateCard onUserChanged={this.setNewUser} user={user} />
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <ProfileSummaryCard user={user} />
          </div>
        </div>
      </>
    );
  }
}

export default ProfileCard;
