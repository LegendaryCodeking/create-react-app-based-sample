import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "flowbite-react";

class LoadingButton extends Component {
  state = {
    disabled: true,
    loading: false,
  };

  icons = {
    upload: faFileUpload,
    cancel: faCancel,
  };

  onButtonClicked = (e) => {
    e.preventDefault();

    this.props.onButtonClicked(e);
  };

  render() {
    const { loading, disabled, icon, text, float } = this.props;
    return (
      <button
        disabled={disabled}
        onClick={this.onButtonClicked}
        className={`bg-eggyellow hover:bg-eggyellow2 text-darkblue focus:outline-none focus:shadow-outline disabled:bg-gray-disabled rounded-sm px-4 py-2 ${
          float !== "none" ? "float-" + float : ""
        }`}
      >
        <div className={loading ? "" : "hidden"}>
          <Spinner size="sm" light={true} />
        </div>
        <div className={!loading ? "" : "hidden"}>
          <FontAwesomeIcon
            className={icon === "none" ? "hidden" : "text-xs font-bold mr-2"}
            icon={this.icons[icon]}
          />
          <span className="font-bold text-sm">{text}</span>
        </div>
      </button>
    );
  }
}

export default LoadingButton;
