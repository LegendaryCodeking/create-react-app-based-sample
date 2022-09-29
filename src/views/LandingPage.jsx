import React, { Component } from "react";

import LandingNavBar from "../components/NavBars/LandingNavbar";
import Footer from "../components/Footers/SecondaryFooter";

import "../assets/stylesheets/landing.css";
import backgroundImage from "../assets/images/version2Designs/pietro-jeng-n6B49lTx7NM-unsplash.jpg";
import aboutUsBg from "../assets/images/version2Designs/m-ZzOa5G8hSPI-unsplash.jpg";
import maskGroup1 from "../assets/images/version2Designs/charlesdeluvio-Lks7vei-eAg-unsplash.jpg";

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
          <div className="flex mt-20" style={{ height: "50vh" }}>
            <div className="w-1/2">
              <img
                className="w-full rounded-sm p-4 landingGrid1"
                alt="bg"
                src={maskGroup1}
              />
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
                  <p className="text-slabtext whitespace-pre-line subpixel-antialiased text-left normal-case p-8 font-light leading-loose tracking-wide">
                    The credit tool is an AI powered platform created by the{" "}
                    <span className="text-eggyellow uppercase text-sm font-bold">
                      AI Centre of Excellence [ AICE™ ]
                    </span>
                    . There has been an increase in fintech industries, there's
                    need to increase efficiency in scoring the organization's
                    clients. This tool creates the solution as a plug and play
                    plugin by artificial intelligence. Upload your data for
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mb-12 pb-12" style={{ height: "50vh" }}>
            <div className="w-1/2">
              <div
                className="container w-full h-full bg-darkblue p-2"
                id="howItWorks"
              >
                <div className="p-6">
                  <h2 className="text-lightblue ml-4 text-3xl mb-4 font-bold">
                    How it works
                  </h2>
                  <p className="text-slabtext whitespace-pre-line subpixel-antialiased text-left normal-case p-8 font-medium leading-loose tracking-wide">
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
              <img
                className="w-full p-4 h-full rounded-sm landingGrid1"
                alt="bg"
                src={aboutUsBg}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default IndexPage;
