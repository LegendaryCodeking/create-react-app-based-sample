import React, { Component } from "react";

class BasicAlert extends Component {
  state = {
    color: "",
    subtext: "",
    actualMessage: "",
  };

  componentDidMount() {
    this.setAlert();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setAlert();
    }
  }

  setAlert = () => {
    const { text, type } = this.props;

    if (type === "error") {
      this.setState({
        color: "text-red-800",
        subtext: "Error!",
        actualMessage: text,
      });
    } else if (type === "success") {
      this.setState({
        color: "text-green-800",
        subtext: "Success!",
        actualMessage: text,
      });
    } else if (type === "warning") {
      this.setState({
        color: "text-yellow-800",
        subtext: "Warning!",
        actualMessage: text,
      });
    } else if (type === "info") {
      this.setState({
        color: "text-blue-800",
        subtext: "Info!",
        actualMessage: text,
      });
    } else if (type === "normal") {
      this.setState({
        color: "text-gray-800",
        subtext: "",
        actualMessage: text,
      });
    }
  };
  render() {
    const { actualMessage, subtext, color } = this.state;
    return (
      <div
        className={` p-4 mb-4 text-sm ${color} rounded-lg bg-blue-50 `}
        role="alert"
      >
        <span className="font-medium">{subtext}</span> {actualMessage}
      </div>
    );
  }
}

export default BasicAlert;
