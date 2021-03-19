import React, { Component } from "react";
import "./InputField.scss";

class InputField extends Component {
  render() {
    const {
      type,
      placeholder,
      handleChange,
      value,
      classList,
      required,
      name,
    } = this.props;
    return (
      <>
        <input
          className={`custom-input ${classList}`}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          name={name}
          required={required}
        />
      </>
    );
  }
}

InputField.defaultProps = {
  classList: "",
  type: "text",
  placeholder: "",
  value: "",
  name: "",
  required: false,
  onChange: () => {},
};

export default InputField;
