import React, { Component } from "react";
import { Modal } from "flowbite-react";
import ApprovalTextComponent from "./ApprovalModalTextComponent";

class ApprovalStatusModal extends Component {
  state = {};
  render() {
    const { show, data } = this.props;
    return (
      <Modal
        size="4xl"
        show={show}
        onClose={this.props.onModalClose}
        color="gray"
      >
        <Modal.Header>
          Approval status {data.Number && data.Number}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/* <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Username</span>
              </div>
              <div className="w-1/2">
                <span>{data.username}</span>
              </div>
            </div> */}
            {Object.keys(data).map((header, index) => (
              <div key={index} className="flex items-center px-4 py-2">
                <div className="w-1/2 flex justify-around">
                  <span className="font-bold">{header}</span>
                </div>
                <div className="w-1/2">
                  <ApprovalTextComponent text={data[header]} />
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <button
            type="button"
            class={
              !data.active
                ? "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 "
                : "hidden"
            }
          >
            close
          </button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ApprovalStatusModal;
