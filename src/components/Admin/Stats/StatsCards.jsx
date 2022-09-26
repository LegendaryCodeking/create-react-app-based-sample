import React, { Component } from "react";
import Stat from "./Stat";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faUserGroup,
  faMicrochip,
  faArrowsTurnToDots,
} from "@fortawesome/free-solid-svg-icons";

class StatsCards extends Component {
  state = {};
  render() {
    return (
      <div className="w-full mt-4 mb-4">
        <div className="container">
          <div className="flex items-center">
            <div className="w-1/4 items-center justify-center flex p-4">
              <Stat icon={faUserAlt} title="Total users" value="1" />
            </div>
            <div className="w-1/4 items-center justify-center flex p-4">
              <Stat icon={faUserGroup} title="organisations" value="1" />
            </div>
            <div className="w-1/4 items-center justify-center flex p-4">
              <Stat icon={faMicrochip} title="models" value="1" />
            </div>
            <div className="w-1/4 items-center justify-center flex p-4">
              <Stat icon={faArrowsTurnToDots} title="Requests" value="5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCards;
