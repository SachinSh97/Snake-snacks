import React, { Component } from "react";
import { isEmpty, get } from "lodash";
import { Link } from "react-router-dom";
import { resource } from "../../constants/configuration";
import { storageName } from "../../constants/global";
import { setItem, removeItem, getItem } from "../../utils/storage";
import { createUserApi } from "../../api";
import infoIcon from "../../assets/img/info-icon.svg";
import "./Start.scss";

const CustomButton = React.lazy(() => import("../../components/Button"));
const TopPlayerPopup = React.lazy(() =>
  import("../components/TopPlayerListPopup")
);
const VerificationPopup = React.lazy(() =>
  import("../components/verificationPopup")
);
const TopTenScorePopup = React.lazy(() =>
  import("../components/TopTenScorePopup")
);
const CustomTooltip = React.lazy(() => import("../../components/Tooltip"));
const MessageComponent = React.lazy(() =>
  import("../../components/MessageComponent")
);
const Loader = React.lazy(() => import("../../components/Loading"));

const startConfig = resource.startContainerConfig;
class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openTopPlayerPopup: false,
      openTopTenScorePopup: false,
      openVerificationPopup: false,
      login: false,
      loading: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    const userData = getItem(storageName);
    if (!isEmpty(userData)) {
      this.setState({ login: true });
    }
  }

  handleOpenPopup = () => {
    this.setState({ openVerificationPopup: true });
  };

  renderContent = (name) => {
    return (
      <>
        {name}
        <CustomTooltip description={startConfig.toolTipText}>
          <img src={infoIcon} alt="info-icon" className="info-icon" />
        </CustomTooltip>
      </>
    );
  };

  handleClosePopup = () => {
    this.setState({
      openVerificationPopup: false,
      openTopPlayerPopup: false,
      openTopTenScorePopup: false,
    });
  };

  handleOpenTopPlayerPopup = () => {
    this.setState({ openTopPlayerPopup: true });
  };

  handleVerification = (username) => {
    if (isEmpty(username)) {
      this.setState({ errorMessage: startConfig.errorMessage });
      return;
    }

    this.setState({ loading: true }, () => {
      createUserApi(username).then((response) => {
        if (!isEmpty(get(response, "userName"))) {
          this.setState(
            { openVerificationPopup: false, login: true, loading: false },
            () => {
              setItem(storageName, response);
            }
          );
        } else {
          let errorMessage = get(response, "message", "");
          this.setState({ errorMessage, loading: false });
        }
      });
    });
  };

  handleOpenTopTenScorePopup = () => {
    this.setState({ openTopTenScorePopup: true });
  };

  handleLogout = () => {
    this.setState({ login: false }, () => {
      removeItem(storageName);
    });
  };

  handleErrorMessageClose = () => {
    this.setState({ errorMessage: "" });
  };

  handleSpinner = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  };

  render() {
    const {
      openTopPlayerPopup,
      login,
      openTopTenScorePopup,
      openVerificationPopup,
      errorMessage,
      loading,
    } = this.state;
    return (
      <>
        <MessageComponent
          dismissible={true}
          open={!isEmpty(errorMessage)}
          message={errorMessage}
          handleClose={this.handleErrorMessageClose}
        />
        {loading && <Loader />}
        <div className="start-screen_wrapper">
          <div className="start-screen_heading">{startConfig.heading}</div>
          <div className="start-screen_menu">
            <Link to={`/snack-time/lets-eat`}>
              <CustomButton
                children={
                  !login
                    ? this.renderContent(startConfig.letBeginCTA)
                    : startConfig.letBeginCTA
                }
                disabled={!login}
                variant={!login ? "secondary" : "primary"}
              />
            </Link>
            <CustomButton
              children={
                !login
                  ? this.renderContent(startConfig.topScoreCTA)
                  : startConfig.topScoreCTA
              }
              disabled={!login}
              variant={!login ? "secondary" : "primary"}
              handleClick={this.handleOpenTopTenScorePopup}
            />
            <CustomButton
              children={startConfig.topPlayerCTA}
              variant="primary"
              handleClick={this.handleOpenTopPlayerPopup}
            />
            <CustomButton
              children={!login ? startConfig.loginCTA : startConfig.logoutCTA}
              variant="primary"
              handleClick={!login ? this.handleOpenPopup : this.handleLogout}
            />
          </div>
        </div>
        {openTopPlayerPopup && (
          <TopPlayerPopup
            open={openTopPlayerPopup}
            handleClose={this.handleClosePopup}
            handleSpinner={this.handleSpinner}
          />
        )}
        {openTopTenScorePopup && (
          <TopTenScorePopup
            open={openTopTenScorePopup}
            handleClose={this.handleClosePopup}
            handleSpinner={this.handleSpinner}
          />
        )}

        {openVerificationPopup && (
          <VerificationPopup
            open={openVerificationPopup}
            handleVerification={this.handleVerification}
            handleClose={this.handleClosePopup}
          />
        )}
      </>
    );
  }
}

export default Start;
