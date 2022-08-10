import React, { Component } from "react";
import { Alert } from "flowbite-react";
import { InformationCircleIcon } from "@heroicons/react/solid";

class FormAlert extends Component {
  state = {};
  render() {
    const { data, type, name } = this.props;
    console.log("data: ", data);
    return (
      <Alert color={type} icon={InformationCircleIcon}>
        <span>
          <span className="font-medium">{name} : </span>
          <span>{data}</span>
        </span>
      </Alert>
    );
  }
}

export default FormAlert;
