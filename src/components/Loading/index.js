import React, { Component } from "react";
import "./Loading.scss";

export default class Loading extends Component {
  render() {
    return (
      <div className="loader">
        <div className="loader_spin" />
        <div className="loader_bg" />
      </div>
    );
  }
}
