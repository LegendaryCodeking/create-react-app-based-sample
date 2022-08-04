import React, { Component } from "react";

class TargetVariableSettingPage extends Component {
  state = {};
  render() {
    return (
      <div className="">
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-green-100 rounded-lg"
          role="alert"
        >
          <span className="font-medium">Success alert!</span> Change a few
          things up and try submitting again.
        </div>
      </div>
    );
  }
}

export default TargetVariableSettingPage;
