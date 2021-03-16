import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class CustomButton extends Component {
  render() {
    const { children, disabled, variant, handleClick, block } = this.props;
    return (
      <Button
        variant={variant}
        size="lg"
        disabled={disabled}
        block={block}
        onClick={handleClick}
      >
        {children}
      </Button>
    );
  }
}
