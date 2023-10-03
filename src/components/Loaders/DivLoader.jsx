import React, { Component } from "react";

class DivLoader extends Component {
  state = {};
  render() {
    const { show } = this.props;
    return (
      <div
        className={
          show
            ? "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50"
            : "hidden"
        }
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-eggyellow"></div>
      </div>
    );
  }
}

export default DivLoader;
