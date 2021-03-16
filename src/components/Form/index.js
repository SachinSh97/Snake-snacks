import React, { Component } from "react";
import "./Form.scss";

const Button = React.lazy(() => import("../Button"));

class Form extends Component {
  render() {
    const { handleSubmit, handleChange, username } = this.props;
    return (
      <div>
        <input
          type="text"
          className="input-field"
          onChange={handleChange}
          value={username}
        />
        <Button
          children="That's It"
          variant="primary"
          handleClick={handleSubmit}
        />
      </div>
    );
  }
}
export default Form;
