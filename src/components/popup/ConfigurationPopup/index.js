import React, { Component } from "react";
import { isEmpty, get } from "lodash";
import { getItem } from "../../../utils/storage";
import { storageName } from "../../../constants/global";
import { resource } from "../../../constants/configuration";
import "./ConfigurationPopup.scss";

const Popup = React.lazy(() => import("../../../components/popup"));
const InputField = React.lazy(() => import("../../../components/InputField"));
const CustomButton = React.lazy(() => import("../../../components/Button"));

const popupConfig = resource.configurationPopupConfig;

class ConfigurationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "",
      height: "",
      level: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    const userData = getItem(storageName);
    const configuration = get(userData, "configuration", {});
    if (!isEmpty(configuration)) {
      this.setState({
        width: get(configuration, "width", ""),
        height: get(configuration, "height", ""),
        level: get(configuration, "level", ""),
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSetConfiguration = () => {
    const { width, height, level } = this.state;
    const { handleSetConfiguration } = this.props;
    const heightLimit = window.innerHeight;
    const widthLimit = window.innerWidth - 20;
    if (
      width < 250 ||
      width > widthLimit ||
      height < 150 ||
      height > heightLimit
    ) {
      this.setState({
        errorMessage: `${popupConfig.errorMessage.area}-${widthLimit}/${heightLimit}`,
      });
    } else if (level > 5 || level < 1) {
      this.setState({ errorMessage: popupConfig.errorMessage.level });
    } else {
      this.setState(
        { errorMessage: "" },
        handleSetConfiguration({ width, height, level })
      );
    }
  };

  renderConfiguration = () => {
    const { width, height, level, errorMessage } = this.state;
    return (
      <div className="configuration_field">
        {!isEmpty(errorMessage) && (
          <span className="error-message">{errorMessage}</span>
        )}
        <div className="configuration_field_wrapper">
          <div>{popupConfig.label.area}</div>
          <div className="board-area">
            <InputField
              classList="input-field"
              type="number"
              name="width"
              placeholder={popupConfig.placeholder.area.width}
              value={width}
              handleChange={this.handleChange}
            />
            <span className="cross">X</span>
            <InputField
              classList="input-field"
              type="number"
              name="height"
              placeholder={popupConfig.placeholder.area.height}
              value={height}
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="configuration_field_wrapper">
          <div>{popupConfig.label.level}</div>
          <div className="snake-speed">
            <InputField
              classList="difficulty-level"
              type="number"
              name="level"
              placeholder="Enter Level from 1 to 5"
              value={level}
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <CustomButton
          children="start"
          variant="info"
          disabled={isEmpty(width) || isEmpty(height) || isEmpty(level)}
          handleClick={this.handleSetConfiguration}
        />
      </div>
    );
  };
  render() {
    const { open, heading, handleClose } = this.props;
    return (
      <div className="configuration">
        <Popup
          open={open}
          handleClose={handleClose}
          heading={heading}
          children={this.renderConfiguration()}
        />
      </div>
    );
  }
}

ConfigurationPopup.defaultProps = {
  open: false,
  heading: popupConfig.title,
  handleClose: () => {},
  handleSetConfiguration: () => {},
};

export default ConfigurationPopup;
