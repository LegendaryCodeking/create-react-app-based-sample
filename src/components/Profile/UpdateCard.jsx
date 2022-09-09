import React, { Component } from "react";

class UpdateCard extends Component {
  state = {};
  render() {
    const {
      username,
      personal_email,
      first_name,
      last_name,
      company_name,
      company_email,
    } = this.props.user;
    const designation = "Developer";
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-mediumblue mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-eggyellow text-xl font-bold">My account</h6>
              <button
                className="bg-lightBlue-500 text-eggyellow active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline outline-eggyellow focus:outline-none mr-1 ease-linear hover:bg-eggyellow hover:text-darkblue transition-all duration-150"
                type="button"
              >
                Update
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-mediumblue">
            <form>
              <h6 className="text-eggyellow text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={username}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Personal Email address
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={personal_email}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={first_name}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={last_name}
                    />
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-eggyellow text-sm mt-3 mb-6 font-bold uppercase">
                Company Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={company_name}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Company Email
                    </label>
                    <input
                      type="email"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={company_email}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Company designation
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue={designation}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Date of birth
                    </label>
                    <input
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="1990/01/01"
                      value="1990/01/01"
                    />
                  </div>
                </div>
              </div>

              {/* <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-eggyellow text-sm mt-3 mb-6 font-bold uppercase">
                About Me
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-eggyellow text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      About me
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateCard;
