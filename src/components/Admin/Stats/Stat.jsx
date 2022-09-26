import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Stat extends Component {
  state = {};

  render() {
    let { icon, title, value } = this.props;
    return (
      <div className="w-full p-4 border border-gray-600 rounded-lg h-20 flex">
        <div className="w-1/3 flex items-center">
          <span className="p-4 text-lightblue font-bold text-2xl">
            <FontAwesomeIcon icon={icon} />
          </span>
        </div>
        <div className="w-2/3">
          <span className="font-bold w-full flex justify-center align-middle text-white">
            {title}
          </span>
          <span className="w-full font-bold flex place-content-center text-white">
            {value}
          </span>
        </div>
      </div>
    );
  }
}

export default Stat;
