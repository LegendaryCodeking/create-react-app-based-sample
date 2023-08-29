import React, { Component } from "react";
import dataHelper from "../../../services/dataHelpers";

class ApprovalStatusModal extends Component {
  state = {
    selected: "D",
    creditStatus: {
      category: "not available",
      explanation: "not available",
      contributingFactors: [],
      textColorClass: "text-gray-500",
    },
  };

  componentDidMount() {
    const { data } = this.props;
    console.log("data: ", data);
    this.processScore();
  }

  componentDidUpdate(previousProps) {
    if (previousProps !== this.props) {
      const { data } = this.props;
      console.log("data: ", data);
      this.processScore();
    }
  }

  closeModal = () => {
    this.props.onCloseModal();
  };

  processScore = () => {
    const { data } = this.props;

    if (data && data.Score) {
      const creditStatus = dataHelper.generateCreditScoreDetails(data.Score);
      console.log("creditStatus: ", creditStatus);
      let categoryLetter;
      if (creditStatus.category === "Excellent") {
        categoryLetter = "A";
      } else if (creditStatus.category === "Good") {
        categoryLetter = "B";
      } else if (creditStatus.category === "Fair") {
        categoryLetter = "C";
      } else {
        categoryLetter = "D";
      }
      this.setState({ creditStatus, selected: categoryLetter });
    }
  };

  render() {
    const { show, data } = this.props;
    const { selected, creditStatus } = this.state;
    return (
      <div
        tabindex="-1"
        className={
          show
            ? "fixed top-1/2 left-1/2 z-50 flex justify-center items-center backdrop-blur-sm w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-screen"
            : "fixed top-1/2 left-1/2 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  max-h-full"
        }
      >
        <div className="relative w-full max-w-6xl">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between px-4 py-2 border-b rounded-t">
              <h3 className="font-semibold text-gray-500">Credit profile</h3>
              <button
                onClick={this.closeModal}
                className="text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                data-modal-hide="defaultModal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex px-4 py-4">
              <div className="w-1/3 p-4 flex flex-col border-r h-full">
                {/* <div className="flex justify-between px-4">
                  <span className=" text-sm text-gray-400 mt-6 font-semibold">
                    Customer Identifier :
                  </span>
                  <span className=" text-sm text-gray-400 mt-6 font-semibold">
                    {data.Number}
                  </span>
                </div> */}
                <span className="mt-12 text-sm text-gray-400 px-4 font-semibold">
                  Customer identified as {data.Number} has
                  <span className={`mx-1 ${creditStatus.textColorClass}`}>
                    {creditStatus.category}
                  </span>{" "}
                  credit score of :
                </span>
                <div
                  className={`flex justify-center text-4xl font-bold ${creditStatus.textColorClass} mt-10 items-start `}
                >
                  {data.Score ? data.Score.toFixed(2) : 0}
                </div>

                <div className="mt-24 flex flex-col px-4">
                  <div className="text-xs font-bold flex flex-col">
                    <span>suggested action according to threshold:</span>{" "}
                    <span
                      className={
                        data.Status !== "Approved"
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {data.Status === "Approved" ? "Approve" : "Reject"}
                    </span>
                  </div>
                  <span className="text-xs font-bold mt-2 flex flex-col">
                    <span>suggested action according to model:</span>{" "}
                    <span
                      className={
                        creditStatus.category === "Excellent" ||
                        creditStatus.category === "Good"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {creditStatus.category === "Excellent" ||
                      creditStatus.category === "Good"
                        ? "Approve"
                        : "Reject"}
                    </span>
                  </span>
                </div>
                {/* <div className="mt-8 px-4 py-2 flex">
                  <button className="bg-eggyellow hover:bg-eggyellow2 text-darkblue px-4 py-2 rounded text-xs">
                    Download report
                  </button>
                </div> */}
              </div>
              <div className="w-2/3 p-4 flex flex-col">
                <div className="flex w-full px-8 py-2 justify-center space-x-4 pb-4 border-b">
                  <div
                    className={
                      selected === "A"
                        ? "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-green-600 bg-green-600 text-white font-bold"
                        : "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-green-600 text-darkblue font-bold"
                    }
                  >
                    <span>A</span>
                    <span className="text-xs">Excellent</span>
                  </div>
                  <div
                    className={
                      selected === "B"
                        ? "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-blue-600 bg-blue-600 text-white font-bold"
                        : "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-blue-600 text-darkblue font-bold"
                    }
                  >
                    <span>B</span>
                    <span className="text-xs">Good</span>
                  </div>
                  <div
                    className={
                      selected === "C"
                        ? "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-yellow-600 bg-yellow-600 text-white font-bold"
                        : "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-yellow-600 text-darkblue font-bold"
                    }
                  >
                    <span>C</span>
                    <span className="text-xs">Fair</span>
                  </div>
                  <div
                    className={
                      selected === "D"
                        ? "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-red-600 bg-red-600 text-white font-bold"
                        : "w-1/4 border flex flex-col text-center justify-center p-2 rounded border-red-600 text-darkblue font-bold"
                    }
                  >
                    <span>D</span>
                    <span className="text-xs">Poor</span>
                  </div>
                </div>
                <div className="mt-2 px-2 py-2 flex flex-col border-b">
                  <span className="text-sm uppercase text-gray-500 font-bold">
                    Explanation
                  </span>
                  <span className="text-sm text-gray-700 py-2 mt-2">
                    {creditStatus.explanation}
                  </span>
                </div>
                <div className="mt-2 px-2 py-2 flex flex-col">
                  <span className="text-sm uppercase text-gray-500 font-bold mb-2">
                    Contributing factors
                  </span>
                  {creditStatus.contributingFactors.length > 0 &&
                    creditStatus.contributingFactors.map((factor, index) => (
                      <span key={index} className="text-sm text-gray-700">
                        * {factor}
                      </span>
                    ))}
                </div>
              </div>
              {/* <div className="w-1/3 p-4 flex"></div> */}
            </div>
            {/* <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
              download
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ApprovalStatusModal;
