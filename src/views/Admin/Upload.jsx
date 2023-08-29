import React, { Component } from "react";
import StatsCards from "../../components/Admin/Stats/StatsCards";

class Upload extends Component {
  state = {
    selectedUploadType: "api",
  };

  onChange = (e) => {
    const { value } = e.target;
    console.log("value: ", value);
    this.setState({ selectedUploadType: value });
  };
  render() {
    const { selectedUploadType } = this.state;
    return (
      <div className=" rounded-sm p-4 w-full" style={{ height: "90vh" }}>
        <StatsCards />
        <div className="mt-4 flex space-x-4">
          <div className="mb-4 flex flex-col w-2/3 border border-gray-500 rounded p-4">
            <span className="px-4 font-bold text-white"> Upload </span>
            <div className="mt-4 px-4 mb-4">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select an option
              </label>
              <select
                id="countries"
                onChange={this.onChange}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="api" defaultValue>
                  API
                </option>
                <option value="file">Excel file</option>
                <option value="database_file">Database file</option>
              </select>
            </div>
            <div
              id="api"
              className={selectedUploadType === "api" ? "" : "hidden"}
            >
              <div className="flex">
                <div className="mt-4 px-4 mb-6 w-2/3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Input API endpoint
                  </label>
                  <input
                    type="text"
                    id="countries"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mt-4 px-4 mb-6 w-1/3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Select API method
                  </label>
                  <select
                    id="countries"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="post" defaultValue>
                      POST
                    </option>
                    <option value="get">GET</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              id="database_file"
              className={selectedUploadType === "database_file" ? "" : "hidden"}
            >
              <div className="flex">
                <div className="mt-4 px-4 mb-6 w-2/3">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="file_input"
                  >
                    Upload database file
                  </label>
                  <input
                    className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                </div>
                <div className="mt-4 px-4 mb-6 w-1/3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Select a database
                  </label>
                  <select
                    id="countries"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="post" defaultValue>
                      SQL
                    </option>
                    <option value="get">MONGO</option>
                    <option value="get">POSTGRES</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              id="file"
              className={selectedUploadType === "file" ? "" : "hidden"}
            >
              <div className="flex">
                <div className="mt-4 px-4 mb-6 w-2/3">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="file_input"
                  >
                    Upload excel/csv
                  </label>
                  <input
                    className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    id="file_input"
                    type="file"
                  />
                </div>
                <div className="mt-4 px-4 mb-6 w-1/3">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Select an option
                  </label>
                  <select
                    id="countries"
                    className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="excel" defaultValue>
                      Excel
                    </option>
                    <option value="csv">Csv</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-col w-1/3 border border-gray-500 rounded">
            <div className="w-full border-b border-gray-500 py-2 text-center">
              <span className="mt-2 px-4 text-center text-gray-400 font-bold">
                Upload progress
              </span>
            </div>
            <div className="grid grid-cols-2 text-center py-4 px-4 gap-4 mt-4">
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Status
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Size
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Tries
                </span>
                <span className="text-gray-400">loading...</span>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="font-bold text-gray-400 uppercase text-sm">
                  Ping
                </span>
                <span className="text-gray-400">...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
