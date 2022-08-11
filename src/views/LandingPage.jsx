import React, { Component } from "react";

import LandingNavBar from "../components/NavBars/LandingNavbar";
import Footer from "../components/Footers/SecondaryFooter";

import "../assets/stylesheets/landing.css";
import backgroundImage from "../assets/images/markus-spiske-iar-afB0QQw-unsplash.png";
import aboutUsBg from "../assets/images/aboutusbg.png";
import maskGroup1 from "../assets/images/maskgroup1.png";

class IndexPage extends Component {
  state = {};
  componentDidMount() {
    console.log("landing", this.props);
  }
  render() {
    return (
      <div className="relative landingContainer">
        <LandingNavBar {...this.props} />
        <div className="h-full w-full bg-darkblue">
          <div className="relative landingMainSection bg-darkblue">
            <img
              className="w-full backgroundLandingImage"
              alt="bg"
              src={backgroundImage}
            />
            <div className="absolute top-1/2 mt-8 tracking-wide left-1/2 -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-5xl text-white font-bold">
                AICE <span className="text-eggyellow">Credit Scoring</span> Tool
              </h1>
              <h5 className="text-white font-bold">
                A tool for efficient and fast credit scoring
              </h5>
              <div className="mt-8">
                <button className="bg-eggyellow rounded-none p-2 px-4 hover:bg-eggyellow2">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <img className="w-full landingGrid1" alt="bg" src={maskGroup1} />
            </div>
            <div className="w-1/2">
              <div
                className="container w-full h-full bg-darkblue p-2"
                id="aboutUs"
              >
                <div className="p-6">
                  <h2 className="text-lightblue ml-4 text-3xl mb-4 font-bold">
                    About Us
                  </h2>
                  <p className="text-white text-left normal-case p-4 font-medium">
                    The credit tool is an Al powered platform created by the Al
                    Centre of Excellence. There has been an increase in fintech
                    industries, there's need to increase efficiency in scoring
                    the organization's clients. This tool creates the solution
                    as a plug and play plugin by artificial intelligence. Upload
                    your data for experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <div
                className="container w-full h-full bg-darkblue p-2"
                id="howItWorks"
              >
                <div className="p-6">
                  <h2 className="text-lightblue ml-4 text-3xl mb-4 font-bold">
                    How it works
                  </h2>
                  <p className="text-white text-left normal-case p-4 font-medium">
                    The tool allows uploading of historical data and predict new
                    data to know client credit scoring status and scores. If you
                    do not have an account you sign up via the button accessible
                    from our website. Once you login you may upload clean data
                    then the tool will describe, model, predict your data then
                    finally generate a report.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <img className="w-full landingGrid1" alt="bg" src={aboutUsBg} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default IndexPage;
