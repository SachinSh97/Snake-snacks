import React, { Component } from "react";
import { isEmpty } from "lodash";
import { resource } from "../../../constants/configuration";
import "./VerificationPopup.scss";

const Popup = React.lazy(() => import("../../../components/popup"));
const InputField = React.lazy(() => import("../../../components/InputField"));
const CustomButton = React.lazy(() => import("../../../components/Button"));

const popupConfig = resource.verificationPopupConfig;

class VerificationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ userName: value });
  };

  renderForm = () => {
    const { handleVerification } = this.props;
    const { userName } = this.state;
    return (
      <div className="verification">
        <InputField
          classList="userName"
          type="text"
          name="userName"
          placeholder={popupConfig.placeholder.username}
          value={userName}
          handleChange={this.handleChange}
        />
        <div style={{ marginTop: "10px" }} />
        <CustomButton
          children={popupConfig.ctaBtn}
          variant="info"
          disabled={isEmpty(userName)}
          handleClick={() => handleVerification(userName)}
        />
      </div>
    );
  };
  render() {
    const { open, handleClose, heading } = this.props;
    return (
      <Popup
        open={open}
        heading={heading}
        handleClose={handleClose}
        children={this.renderForm()}
      />
    );
  }
}

VerificationPopup.defaultProps = {
  open: false,
  heading: popupConfig.title,
  handleClose: () => {},
};

export default VerificationPopup;
