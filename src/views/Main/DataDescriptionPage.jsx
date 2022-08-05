import React, { Component } from "react";

class DataDescriptionPage extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <div className="p-4 text-sm text-green-700 bg-green" role="alert">
            <span className="font-medium text-green">Succness alert!</span>
          </div>
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
            <CardBarChart />
          </div> */}
      </div>
    );
  }
}

export default DataDescriptionPage;
