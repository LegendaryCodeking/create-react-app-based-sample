import React, { Component } from "react";
import Stat from "./Stat";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faUserGroup,
  faMicrochip,
  faDatabase,
  faArrowsTurnToDots,
} from "@fortawesome/free-solid-svg-icons";

class StatsCards extends Component {
  state = {
    statistics: [
      { title: "Total Users", value: 5, icon: faUserAlt },
      { title: "Datasets", value: 1, icon: faDatabase },
      { title: "Models", value: 1, icon: faMicrochip },
      { title: "API Calls", value: 500, icon: faArrowsTurnToDots },
    ],
  };
  render() {
    const { statistics } = this.state;
    return (
      <div className="w-full mt-4 mb-4">
        <div className="container">
          <div className="flex items-center">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="w-1/4 items-center justify-center flex p-4"
              >
                <Stat icon={stat.icon} title={stat.title} value={stat.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCards;
