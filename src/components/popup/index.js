import React, { Component } from "react";
import "./Popup.scss";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.popupRef = React.createRef();
  }
  render() {
    const { open, handleClose, children, heading } = this.props;
    return (
      <>
        {open && (
          <div ref={this.popupRef} className="popup">
            <div className="popup-content">
              <span className="close" onClick={handleClose}>
                &times;
              </span>
              <div className="heading">{heading}</div>
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
}
