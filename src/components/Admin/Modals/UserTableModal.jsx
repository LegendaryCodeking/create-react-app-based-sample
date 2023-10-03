import React, { Component } from "react";
import { Modal } from "flowbite-react";

class UserTableModal extends Component {
  state = {};
  render() {
    const { show, data } = this.props;
    return (
      <Modal show={show} onClose={this.props.onModalClose} color="gray">
        <Modal.Header>{data.firstName + " " + data.lastName}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Username</span>
              </div>
              <div className="w-1/2">
                <span>{data.username}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">First name</span>
              </div>
              <div className="w-1/2">
                <span>{data.firstName}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Last name</span>
              </div>
              <div className="w-1/2">
                <span>{data.lastName}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Company</span>
              </div>
              <div className="w-1/2">
                <span>{data.company}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Date of birth</span>
              </div>
              <div className="w-1/2">
                <span>{data.dateOfBirth}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Company Email</span>
              </div>
              <div className="w-1/2">
                <span>{data.companyEmail}</span>
              </div>
            </div>
            <div className="flex items-center px-4 py-2">
              <div className="w-1/2 flex justify-around">
                <span className="font-bold">Personal Email</span>
              </div>
              <div className="w-1/2">
                <span>{data.email}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className={
              data.active
                ? "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 "
                : "hidden"
            }
          >
            Deactivate
          </button>
          <button
            type="button"
            className={
              !data.active
                ? "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 "
                : "hidden"
            }
          >
            Activate
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UserTableModal;
