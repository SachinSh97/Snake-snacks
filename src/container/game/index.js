import React, { Component } from "react";
import { cloneDeep, get, isEmpty } from "lodash";
import { randomFood, drawCanvas } from "../../utils/helper";
import {
  keyCode,
  snakePosition,
  storageName,
  apiRequestStatusCodes,
} from "../../constants/global";
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

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: "",
      width: "",
      dx: 10,
      dy: 0,
      foodX: 20,
      foodY: 20,
      score: 0,
      level: 1,
      timeOutId: 0,
      changeDirection: false,
      hasGameEnded: false,
      setConfiguration: true,
      openTopTenScorePopup: false,
      restart: false,
      snakeDefaultPosition: cloneDeep(snakePosition),
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
    this.setState(
      {
        width,
        height,
        level,
        setConfiguration: false,
        restart: false,
        snakeDefaultPosition: cloneDeep(snakePosition),
      },

      () => {
        this.drawSnake();
        this.startGame();
        window.addEventListener("keydown", this.changeDirection);
      }
    );
  };

  /*Function that prints the parts*/
  drawSnake = () => {
    const { snakeDefaultPosition } = this.state;
    snakeDefaultPosition.forEach((snakePart) => {
      const snakeBoard = this.snakeBoardRef.current;
      snakeBoard &&
        drawCanvas(
          snakeBoard,
          [snakePart.x, snakePart.y, 10, 10],
          "lightblue",
          "darkblue"
        );
    });
  };

  // main function called repeatedly to keep the game running
  startGame = () => {
    const hasGameEnded = this.hasGameEnded();
    this.setState({ hasGameEnded });
    if (hasGameEnded) return;
    const { foodX, foodY, level } = this.state;
    const element = this.snakeBoardRef.current;
    this.setState({ changeDirection: false });
    let timeOutId = setTimeout(() => {
      element &&
        drawCanvas(element, [0, 0, element.width, element.height], "", "");
      element &&
        drawCanvas(element, [foodX, foodY, 10, 10], "lightgreen", "darkgreen");
      this.moveSnake();
      this.drawSnake();
      // Call main again
      this.startGame();
    }, (6 - level) * 100);
    this.setState({ timeOutId });
  };

  moveSnake = () => {
    let { dx, snakeDefaultPosition, foodX, foodY, dy, score } = this.state;
    const head = {
      x: snakeDefaultPosition[0].x + dx,
      y: snakeDefaultPosition[0].y + dy,
    };
    snakeDefaultPosition.unshift(head);
    const has_eaten_food =
      snakeDefaultPosition[0].x === foodX &&
      snakeDefaultPosition[0].y === foodY;
    if (has_eaten_food) {
      // Generate new food location
      this.setState((prev) => ({ score: prev.score + 1 }), this.genFood());
    } else {
      // Remove the last part of snake body
      snakeDefaultPosition.pop();
    }
    this.setState({ snakeDefaultPosition });
  };

  hasGameEnded = () => {
    const { snakeDefaultPosition } = this.state;
    if (snakeDefaultPosition.length < 0) return;
    for (let i = 4; i < snakeDefaultPosition.length; i++) {
      if (
        snakeDefaultPosition[i].x === snakeDefaultPosition[0].x &&
        snakeDefaultPosition[i].y === snakeDefaultPosition[0].y
      )
        return true;
    }
    const hitLeftWall = snakeDefaultPosition[0].x < 0;
    const hitRightWall =
      snakeDefaultPosition[0].x > this.snakeBoardRef.current.width - 10;
    const hitTopWall = snakeDefaultPosition[0].y < 0;
    const hitBottomWall =
      snakeDefaultPosition[0].y > this.snakeBoardRef.current.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  };

  changeDirection = (event) => {
    let { changeDirection, dy, dx } = this.state;
    // Prevent the snake from reversing
    if (changeDirection) return;
    this.setState({ changeDirection: true });
    const keyPressed = event.keyCode;
    switch (keyPressed) {
      case keyCode.LEFT_KEY:
        dx = dx !== 10 ? -10 : dx;
        dy = dx !== 10 ? 0 : dy;
        break;
      case keyCode.UP_KEY:
        dx = dy !== 10 ? 0 : dx;
        dy = dy !== 10 ? -10 : dy;
        break;
      case keyCode.RIGHT_KEY:
        dx = dx !== -10 ? 10 : dx;
        dy = dx !== -10 ? 0 : dy;
        break;
      case keyCode.DOWN_KEY:
        dx = dy !== -10 ? 0 : dx;
        dy = dy !== -10 ? 10 : dy;
        break;
    }
    this.setState({ dx, dy });
  };

  genFood = () => {
    const { snakeDefaultPosition } = this.state;
    const foodX = randomFood(0, this.snakeBoardRef.current.width - 10);
    const foodY = randomFood(0, this.snakeBoardRef.current.height - 10);
    this.setState({ foodX, foodY });
    snakeDefaultPosition.forEach((part) => {
      const has_eaten = part.x === foodX && part.y === foodY;
      if (has_eaten) this.genFood();
    });
  };

  handleGameOver = () => {
    const scoreObj = {
      _id: get(getItem(storageName), "_id", ""),
      score: get(this.state, "score", 0),
    };
    updateScoreApi(scoreObj).then((response) => {
      if (
        !apiRequestStatusCodes.FORBIDDEN.includes(get(response, "status", ""))
      ) {
        console.log(response);
        this.setState({ hasGameEnded: false, openTopTenScorePopup: true });
      }
    });
  };

  handleCloseTopTenScorePopup = () => {
    this.setState({
      score: 0,
      dx: 10,
      dy: 0,
      changeDirection: false,
      hasGameEnded: false,
      snakeDefaultPosition: cloneDeep(snakePosition),
      setConfiguration: false,
      openTopTenScorePopup: false,
      restart: true,
    });
  };

  restartGame = () => {
    this.setState({ restart: false }, this.startGame());
  };

  handleBack = () => {
    clearTimeout(this.state.timeoutId);
    window.removeEventListener("keydown", this.handleKeyDown);
    this.props.history.push("/snake-time");
  };

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const {
      width,
      height,
      setConfiguration,
      hasGameEnded,
      score,
      openTopTenScorePopup,
      restart,
    } = this.state;
    return (
      <>
        <div className="snake-game_wrapper">
          {restart && (
            <div className="snake-game_restart">
              <CustomButton
                children="RESTART"
                variant="info"
                block={true}
                handleClick={this.restartGame}
              />
              <div style={{ marginRight: "60px" }} />
              <CustomButton
                children="RESET"
                variant="warning"
                block={true}
                handleClick={() => this.setState({ setConfiguration: true })}
              />
            </div>
          )}
          <div className="back" onClick={this.handleBack}>
            <img src={backIcon} alt="back-icon" className="back-icon" />
          </div>
          <div className="snake-game_playground">
            <canvas
              ref={this.snakeBoardRef}
              className="snake-game_board"
              width={width}
              height={height}
            />
          </div>

          {hasGameEnded && (
            <Popup open={hasGameEnded}>
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
            handleClose={this.handleCloseTopTenScorePopup}
          />
        )}
      </>
    );
  }
}

export default Game;
