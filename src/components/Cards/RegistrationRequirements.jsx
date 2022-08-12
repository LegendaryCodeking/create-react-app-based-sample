import React, { Component } from "react";

import { Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/solid";

class RegisterRequirements extends Component {
  state = {};

  componentDidMount() {
    //let { errors } = this.props;
    //let errorArray = [];
  }
  render() {
    const { errors } = this.props;
    console.log("errors: ", errors);
    return (
      <div className={errors ? "p-2" : "hidden"}>
        <Alert
          className="rounded-none"
          color="warning"
          icon={InformationCircleIcon}
          style={{ borderRadius: "0" }}
        >
          <span>
            <span className="font-bold">Errors :</span>
            <ul>
              {Object.entries(errors).map(([key, value]) => {
                return <li key={key}>{value.toString()}</li>;
              })}
            </ul>
          </span>
        </Alert>
      </div>
    );
  }
}

export default RegisterRequirements;
