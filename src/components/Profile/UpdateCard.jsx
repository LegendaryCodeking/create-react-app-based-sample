import React, { Component } from "react";
//import moment from "moment";
import auth from "../../services/authService";

class UpdateCard extends Component {
  state = {
    user: {
      username: "",
      personal_email: "",
      first_name: "",
      last_name: "",
      company_name: "",
      company_email: "",
    },
    oldUser: {},
    userHasEdited: false,
  };

  componentDidMount() {
    //let date = Date.now();
    //let formattedDate = moment(date).format("YYYY-MM-DD");
    //console.log("formattedDate: ", formattedDate);
    this.setCurrentUserDetails();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps !== this.props) {
      //this.setCurrentUserDetails();
    }
  }

  setCurrentUserDetails = () => {
    const user = auth.getCurrentUser();
    console.log("user set up: ", user);
    //console.log("propUserDetails: ", propUserDetails);
    //let { user: currentUserDetails } = this.state;

    if (Object.keys(user).length > 0) {
      this.setState({ user: user, oldUser: user });
    }
  };

  checkInputsDifference = () => {
    let { user, oldUser } = this.state;
    if (JSON.stringify(oldUser) !== JSON.stringify(user)) {
      console.log("user has changed new: ", user);
      console.log("user has changed old: ", oldUser);
      this.setState({ userHasEdited: true });
    } else {
      console.log("user hasnt changed new: ", user);
      console.log("user hasnt changed old: ", oldUser);
      this.setState({ userHasEdited: false });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("input: ", input.value, input.name);
    let { user } = this.state;
    user[input.name] = input.value;
    this.setState({ user });
    setTimeout(() => {
      this.checkInputsDifference();
    }, 500);
  };
  render() {
    const {
      username,
      personal_email,
      first_name,
      last_name,
      company_name,
      company_email,
    } = this.state.user;
    const { userHasEdited } = this.state;
    const designation = "Developer";
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-mediumblue mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-eggyellow text-xl font-bold">My account</h6>
              <button
                className="bg-mediumblue text-eggyellow active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline outline-eggyellow focus:outline-none mr-1 ease-linear hover:bg-eggyellow hover:text-darkblue transition-all disabled:bg-gray-700 disabled:outline-gray-900 disabled:text-black duration-150"
                type="button"
                disabled={!userHasEdited}
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
                      value={username}
                      name="username"
                      readOnly
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
                      value={personal_email}
                      name="personal_email"
                      readOnly
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
                      value={first_name}
                      name="first_name"
                      onChange={this.handleChange}
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
                      value={last_name}
                      onChange={this.handleChange}
                      name="last_name"
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
                      readOnly
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-darkblue bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={company_name}
                      name="company_name"
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
                      value={company_email}
                      name="company_email"
                      readOnly
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
                      value={designation}
                      name="designation"
                      onChange={this.handleChange}
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
                      value="2022-01-01"
                      name="date_of_birth"
                      onChange={this.handleChange}
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
