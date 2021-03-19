import React, { Component } from "react";
import { get, isEmpty } from "lodash";
import { storageName } from "../../constants/global";
import { updateScoreApi } from "../../api";
import { setItem, getItem } from "../../utils/storage";
import backIcon from "../../assets/img/arrow_left.svg";
import "./Game.scss";

const CustomButton = React.lazy(() => import("../../components/Button"));
const Popup = React.lazy(() => import("../../components/popup"));
const ConfigurationPopup = React.lazy(() =>
  import("../components/ConfigurationPopup")
);
const TopTenScorePopup = React.lazy(() =>
  import("../components/TopTenScorePopup")
);
const SnakeBoard = React.lazy(() => import("../components/SnakeBoard"));
const Loader = React.lazy(() => import("../../components/Loading"));
const MessageComponent = React.lazy(() =>
  import("../../components/MessageComponent")
);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      width: "",
      score: 0,
      level: 1,
      setConfiguration: true,
      openTopTenScorePopup: false,
      restart: false,
      isGameOver: false,
      showBoard: false,
      loading: false,
      errorMessage: "",
    };
    this.snakeBoardRef = React.createRef();
  }

  componentDidMount() {
    let userData = getItem(storageName);
    if (isEmpty(userData)) {
      this.props.history.push("/snack-time");
    }
  }

  handleSetConfiguration = ({ width, height, level }) => {
    let userData = getItem(storageName);
    setItem(storageName, {
      ...userData,
      configuration: { width, height, level },
    });
    this.setState({
      width,
      height,
      level,
      setConfiguration: false,
      showBoard: true,
      restart: false,
    });
  };

  handleScorePoints = (score) => {
    this.setState({ isGameOver: true, score });
  };

  handleGameOver = () => {
    const scoreObj = {
      _id: get(getItem(storageName), "_id", ""),
      score: get(this.state, "score", 0),
    };
    updateScoreApi(scoreObj).then((response) => {
      if (isEmpty(get(response, "message", ""))) {
        this.setState({ isGameOver: false, openTopTenScorePopup: true });
      } else {
        this.setState({ errorMessage: get(response, "message", "") });
      }
    });
  };

  handleCloseTopTenScorePopup = () => {
    this.setState({
      score: 0,
      isGameOver: false,
      setConfiguration: false,
      openTopTenScorePopup: false,
      restart: true,
      showBoard: false,
    });
  };

  restartGame = () => {
    this.setState({ restart: false, showBoard: true });
  };

  handleBack = () => {
    this.props.history.push("/snake-time");
  };

  handleErrorMessageClose = () => {
    this.setState({ errorMessage: "" });
  };

  handleSpinner = () => {
    this.setState((prevState) => ({ loading: !prevState.loading }));
  };

  render() {
    const {
      width,
      height,
      setConfiguration,
      score,
      level,
      openTopTenScorePopup,
      restart,
      isGameOver,
      showBoard,
      loading,
      errorMessage,
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
        <div className="snake-game_wrapper">
          <div className="back" onClick={this.handleBack}>
            <img src={backIcon} alt="back-icon" className="back-icon" />
          </div>
          <div className="snake-game_playground">
            {restart && (
              <div className="snake-game_restart">
                <CustomButton
                  children="RESTART"
                  variant="info"
                  block={true}
                  handleClick={this.restartGame}
                />
                <div style={{ marginRight: "40px" }} />
                <CustomButton
                  children="RESET"
                  variant="warning"
                  block={true}
                  handleClick={() => this.setState({ setConfiguration: true })}
                />
              </div>
            )}
            {showBoard && (
              <SnakeBoard
                width={width}
                height={height}
                level={level}
                handleGameOver={this.handleScorePoints}
              />
            )}
          </div>

          {isGameOver && (
            <Popup open={isGameOver}>
              <div className="snake-game_over">
                <span className="title">Game Over</span>
                <span className="sub-title">Score</span>
                <span className="score">{score}</span>
                <CustomButton
                  children="OK"
                  variant="success"
                  block={true}
                  handleClick={this.handleGameOver}
                />
              </div>
            </Popup>
          )}
        </div>

        {setConfiguration && (
          <ConfigurationPopup
            open={setConfiguration}
            handleSetConfiguration={this.handleSetConfiguration}
          />
        )}
        {openTopTenScorePopup && (
          <TopTenScorePopup
            open={openTopTenScorePopup}
            handleSpinner={this.handleSpinner}
            handleClose={this.handleCloseTopTenScorePopup}
          />
        )}
      </>
    );
  }
}

export default Game;
