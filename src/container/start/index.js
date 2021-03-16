import React, { Component } from "react";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";
import { StartPageConfig } from "../../constants/configuration";
import { setItem, removeItem, getItem } from "../../utils/storage";
import infoIcon from "../../assets/img/info-icon.svg";
import "./Start.scss";

import { data } from "../../dummyData";
import TopTenScorePopup from "../../components/popup/TopTenScorePopup";

const CustomButton = React.lazy(() => import("../../components/Button"));
const Popup = React.lazy(() => import("../../components/popup"));
const Form = React.lazy(() => import("../../components/Form"));
const Loader = React.lazy(() => import("../../components/Loading"));
const TopPlayerPopup = React.lazy(() =>
  import("../../components/popup/TopPlayerListpopup")
);
class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationPopup: false,
      openTopPlayerPopup: false,
      openTopTenScorePopup: false,
      login: false,
      username: "",
      new: false,
    };
  }

  componentDidMount() {
    const userData = getItem("Snake&Snack");
    if (!isEmpty(userData)) {
      this.setState({ login: true, username: userData.name });
    }
  }

  handleOpenPopup = () => {
    this.setState({ verificationPopup: true });
  };

  renderContent = (name) => {
    return (
      <>
        {name}
        <img src={infoIcon} alt="info-icon" className="info-icon" />
      </>
    );
  };

  handleClosePopup = () => {
    this.setState({
      verificationPopup: false,
      openTopPlayerPopup: false,
      openTopTenScorePopup: false,
    });
  };

  handleOpenTopPlayerPopup = () => {
    this.setState({ openTopPlayerPopup: true });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ username: value });
  };

  handleSubmit = () => {
    const { username } = this.state;
    const userData = data.users.find((item) => item.name === username);
    setItem("Snake&Snack", !isEmpty(userData) && { ...userData });
    this.setState({
      new: username ? true : false,
      login: true,
      verificationPopup: false,
    });
  };

  handleLogout = () => {
    this.setState({ login: false, username: "", new: false }, () => {
      removeItem("Snake&Snack");
    });
  };

  handleOpenTopTenScorePopup = () => {
    this.setState({ openTopTenScorePopup: true });
  };

  render() {
    const {
      verificationPopup,
      openTopPlayerPopup,
      login,
      username,
      openTopTenScorePopup,
    } = this.state;
    return (
      <>
        <div className="start-screen_wrapper">
          <div className="start-screen_heading">{StartPageConfig.heading}</div>
          <div className="start-screen_menu">
            <Link to={`/snack-time/lets-eat`}>
              <CustomButton
                children={
                  !login ? this.renderContent("Let's Begin") : "Let's Begin"
                }
                disabled={!login}
                variant={!login ? "secondary" : "primary"}
              />
            </Link>
            <CustomButton
              children={
                !login ? this.renderContent("Top Score's") : "Top Score's"
              }
              disabled={!login}
              variant={!login ? "secondary" : "primary"}
              handleClick={this.handleOpenTopTenScorePopup}
            />
            <CustomButton
              children="Top Player's"
              variant="primary"
              handleClick={this.handleOpenTopPlayerPopup}
            />
            <CustomButton
              children={!login ? "Login" : "Logout"}
              variant="primary"
              handleClick={!login ? this.handleOpenPopup : this.handleLogout}
            />
          </div>
        </div>
        {verificationPopup && (
          <Popup
            open={verificationPopup}
            handleClose={this.handleClosePopup}
            children={
              <Form
                username={username}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            }
          />
        )}
        {openTopPlayerPopup && (
          <TopPlayerPopup
            open={openTopPlayerPopup}
            handleClose={this.handleClosePopup}
          />
        )}
        {openTopTenScorePopup && (
          <TopTenScorePopup
            open={openTopTenScorePopup}
            handleClose={this.handleClosePopup}
          />
        )}
      </>
    );
  }
}

Start.defaultProps = {
  user: "",
};

export default Start;
