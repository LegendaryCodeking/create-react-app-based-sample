import React, { Component } from "react";

class ApprovalTextComponent extends Component {
  state = {
    text: "",
    classes: "",
  };

  componentDidMount() {
    const { text } = this.props;
    this.setClasses(text);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      const { text } = this.props;
      this.setClasses(text);
    }
  }

  setClasses = (text) => {
    if (text === "Approved") {
      this.setState({ classes: "text-green-500 font-bold" });
    } else if (text === "Rejected") {
      this.setState({ classes: "text-red-500 font-bold" });
    } else {
      this.setState({ classes: "text-gray-500" });
    }
  };
  render() {
    const { classes } = this.state;
    const { text } = this.props;
    return <span className={classes}>{text}</span>;
  }
}

export default ApprovalTextComponent;
