import React, { Component } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class CustomTooltip extends Component {
  render() {
    const { children, description } = this.props;
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip-2">{description}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <span
            ref={ref}
            {...triggerHandler}
            style={{ fontSize: "12px", letterSpacing: "1px" }}
          >
            {children}
          </span>
        )}
      </OverlayTrigger>
    );
  }
}
export default CustomTooltip;
