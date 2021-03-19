import React, { Component } from "react";
import Button from "react-bootstrap/Button";

class CustomButton extends Component {
  render() {
    const {
      children,
      disabled,
      variant,
      handleClick,
      block,
      size,
    } = this.props;
    return (
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        block={block}
        onClick={handleClick}
      >
        {children}
      </Button>
    );
  }
}

CustomButton.defaultProps = {
  variant: "",
  size: "lg",
  disabled: false,
  block: false,
  onClick: () => {},
};

export default CustomButton;
