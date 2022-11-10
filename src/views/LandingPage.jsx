import React, { Component } from "react";

import LandingNavBar from "../components/NavBars/LandingNavbar";
import Footer from "../components/Footers/SecondaryFooter";

import "../assets/stylesheets/landing.css";
import backgroundImage from "../assets/images/version2Designs/pietro-jeng-n6B49lTx7NM-unsplash.jpg";
import triangleSpiral from "../assets/images/trangle.svg";
import roseSpiral from "../assets/images/rose.svg";

class IndexPage extends Component {
  state = {};
  componentDidMount() {
    console.log("landing", this.props);
  }
  render() {
    return (
      <div className="relative landingContainer">
        <LandingNavBar {...this.props} />
        <div
          className="h-full w-full bg-darkblue snap-y snap-mandatory"
          style={{ height: "100%" }}
        >
          <div
            className="relative landingMainSection bg-darkblue -mt-24 snap-center"
            style={{ height: "100vh" }}
          >
            <img
              className="w-full blur-sm opacity-30 backgroundLandingImage"
              alt="bg"
              src={backgroundImage}
              style={{ height: "100vh" }}
            />
            <div className="absolute mix-blend-normal top-1/2 tracking-wide left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-5xl text-white font-bold">
                AICE <span className="text-eggyellow">Credit Scoring</span> Tool
              </h1>
              <h5 className="text-white font-bold mt-2">
                A tool for efficient and fast credit scoring
              </h5>
              <div className="mt-8">
                <button
                  onClick={() => this.props.history.push("/auth/register")}
                  className="bg-eggyellow rounded-none p-2 px-4 hover:bg-eggyellow2 animate-pulse transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="flex my-20 p-10">
            <div className="w-1/2">
              <div
                className="container w-full h-full bg-darkblue p-2"
                id="howItWorks"
              >
                <div className="p-6 mt-5">
                  <span className="text-base text-lightblue uppercase ml-4 font-bold mb-4">
                    Getting Started
                  </span>
                  <h1 className="text-eggyellow ml-4 text-5xl mb-2 mt-2 font-bold">
                    How it works
                  </h1>
                  <p className="text-subwhite text-sm leading-7 whitespace-pre-line subpixel-antialiased text-left normal-case p-4 font-medium leading-loose tracking-wide">
                    The tool allows uploading of historical data and predict new
                    data to know client credit scoring status and scores. If you
                    do not have an account you sign up via the button accessible
                    from our website. Once you login you may upload clean data
                    then the tool will describe, model, predict your data then
                    finally generate a report.
                  </p>
                  <button
                    onClick={() => this.props.history.push("/auth/register")}
                    className="bg-lightblue px-4 py-2 rounded-md ml-4 mt-4"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2 justify-center">
              <img
                className="w-full p-4 h-full rounded-sm"
                alt="bg"
                style={{
                  height: "25rem",
                }}
                src={triangleSpiral}
              />
            </div>
          </div>
          {/* <hr className="divide-y-2 divide-subwhite mx-8 my-10" /> */}
          <div className="flex p-6 mx-10 mb-20">
            <div className="w-1/3 p-8">
              <h3 className="mt-2 text-lightblue font-bold">Step 1</h3>
              <p className="text-subwhite mt-4 leading-7">
                Upload your historical data that includes your target variables
                ( approved or rejected statuses ). This data will then be used
                to train your model which can later be used to analyze any new
                data.
                <br />
                <span className="text-sm font-bold mt-2">
                  note: Accepted data types are CSV and Excel sheets.
                </span>
              </p>
            </div>
            <div className="w-1/3 p-8">
              <h3 className="mt-2 text-lightblue font-bold">Step 2</h3>
              <p className="text-subwhite mt-4 leading-7">
                After your model has completed training, review the metrics
                (accuracy) of your model. if you are satisfied, then upload any
                new data for analysis and prediction. Your data can be uploaded
                singularly or in bulk through an excel sheet. <br />
                <span className="text-sm font-bold mt-2">
                  note: This data should not have the target variable column.
                </span>
              </p>
            </div>
            <div className="w-1/3 p-8">
              <h3 className="mt-2 text-lightblue font-bold">Step 3</h3>
              <p className="text-subwhite mt-4 leading-7">
                Analyze your data and use it to get insights. Reports can be
                downloaded in the reports page. These reports include approval
                status reports, Model metrics, a summary of your initial data
                and a full report including all the above data.
              </p>
            </div>
          </div>
          <div className="flex mb-12 pb-40">
            <div className="w-1/2 flex justify-center">
              <img
                className="w-full p-4 h-full rounded-sm"
                alt="bg"
                style={{
                  height: "25rem",
                }}
                src={roseSpiral}
              />
            </div>
            <div className="w-1/2">
              <div
                className="container w-full h-full bg-darkblue p-2"
                id="howItWorks"
              >
                <div className="p-6 mt-5">
                  <span className="text-base text-lightblue uppercase ml-4 font-bold mb-4">
                    THE VISION
                  </span>
                  <h1 className="text-eggyellow ml-4 text-4xl mb-2 mt-2 font-bold">
                    Who is caspre for.
                  </h1>
                  <p className="text-subwhite text-sm leading-7 whitespace-pre-line subpixel-antialiased text-left normal-case p-4 font-medium tracking-wide">
                    Caspre is intended for financial institutions and industries
                    that intend to harness the full power of machine learning
                    and AI to achieve analysis of large sums of financial data
                    in little to no time. These insights will save analysts the
                    time and cost it takes to make due diligence investigations
                    before approving or rejecting loans.
                  </p>
                  <button
                    onClick={() => this.props.history.push("/auth/register")}
                    className="bg-lightblue px-4 py-2 rounded-md ml-4 mt-4"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default IndexPage;
