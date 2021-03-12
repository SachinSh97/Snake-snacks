import React, { Component } from "react";
import { StartPageConfig } from "../../constants/configuration";
import "./Start.scss";

class Start extends Component {
  render() {
    return (
      <div className="start-screen_wrapper">
        <div className="start-screen_heading">{StartPageConfig.heading}</div>
      </div>
    );
  }
}
export default Start;
