import React, { Component } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import auth from "../../services/authService";
import plumber from "../../services/dataHelpers";

class ScoreSingleUserForm extends Component {
  state = {
    headers: [],
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log("e: ", e);
    const { headers } = this.state;
    const targets = e.target;
    const data = new FormData(targets);
    const targetObject = {};
    headers.forEach((header) => {
      targetObject[header] = data.get(header);
    });

    //console.log(targetObject);
    console.log("targetObject: ", targetObject);

    this.submitObject(targetObject);
  };

  submitObject = async (data) => {
    let reqObject = {};
    reqObject.threshold = 300;
    reqObject.newdata = [data];
    console.log("reqObject: ", reqObject);
    const predictedResponse = await api.postForPrediction(reqObject);
    console.log("predictedResponse: ", predictedResponse);

    if (predictedResponse.status === 200) {
      if (
        !predictedResponse.data.status ||
        predictedResponse.data.status !== "failed"
      ) {
        this.setPredictedData(predictedResponse.data);
      } else if (
        predictedResponse.data.status &&
        predictedResponse.data.status === "failed"
      ) {
        toast.error(predictedResponse.data.message);
      } else {
        toast.error("An unexpected error with your data occurred");
      }
    } else {
      toast.error("an unexpected error occurred");
    }
  };

  setPredictedData = (data) => {
    const formattedPredictedData = plumber.formatApprovalStatusTableData(data);
    this.props.onDataPredicted(formattedPredictedData);
  };

  setHeaders = async () => {
    const { headers: propHeaders } = this.props;
    const user = auth.getCurrentUser();
    const dbHeadersResponse = await api.getUserHeaders();

    this.setState({ headers: propHeaders });
    if (dbHeadersResponse.status === 200) {
      const headerData = dbHeadersResponse.data;
      console.log("dbHeadersResponse: ", headerData);
      if (headerData.length > 0) {
        headerData.forEach((header) => {
          if (header.username === user.username) {
            this.setState({ headers: header.headers });
          }
        });
      }
    }
  };

  componentDidMount() {
    this.setHeaders();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setHeaders();
    }
  }
  render() {
    const { headers } = this.state;
    return (
      <>
        <form autoComplete="off" onSubmit={this.submitForm}>
          <div className="grid md:grid-cols-2 md:gap-6">
            {headers.map((header, key) => (
              <div className="relative z-0 mb-4 w-full group" key={key}>
                <input
                  type="text"
                  name={header}
                  id={header}
                  className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-eggyellow peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-eggyellow peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {header}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="text-darkblue bg-eggyellow hover:bg-eggyellow2 focus:ring-4 focus:outline-none focus:ring-eggyellow font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default ScoreSingleUserForm;
