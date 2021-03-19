import React, { Component } from "react";
import { get, isEmpty, isEqual } from "lodash";
import {
  drawCanvas,
  randomFood,
  getChangeInPositionOfSnake,
} from "../../../utils/helper";
import {
  unit,
  snakeColor,
  snakeBoardColor,
  foodColor,
} from "../../../constants/global";

class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      food: [],
      dxy: {},
      level: "",
      score: 0,
      timeInterval: 100,
      isGameOver: false,
      timeOutId: "",
    };
    this.snakeBoardRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("keydown", this.changeDirection);
    const initialState = this.initializeGame();
    this.setState({ ...initialState }, () => {
      this.drawSnake();
      this.startGame();
    });
  }

  //will initialize location of food & snake
  initializeGame = () => {
    const { width, height, level } = this.props;

    //get total unit in X & Y direction
    const totalXUnits = Math.floor(width / unit);
    const totalYUnits = Math.floor(height / unit);
    const snake = [
      { x: (totalXUnits / 2) * unit, y: (totalYUnits / 2) * unit },
      { x: ((totalXUnits - 1) / 2) * unit, y: (totalYUnits / 2) * unit },
    ];
    const food = {
      x: randomFood(0, width - 10),
      y: randomFood(0, height - 10),
    };
    const dxy = { dx: unit, dy: 0 };

    return { snake, food, level, dxy };
  };

  //will be called again & again to move snake
  startGame = () => {
    const isGameOver = this.isGameOver();
    if (isGameOver) {
      this.props.handleGameOver(this.state.score);
      return;
    }

    const { food, level, timeInterval } = this.state;
    const { width, height } = this.props;
    const snakeBoard = get(this, "snakeBoardRef.current", undefined);

    this.setState({ changeDirection: false });
    let timeOutId =
      snakeBoard &&
      setTimeout(() => {
        drawCanvas(snakeBoard, [0, 0, width, height], snakeBoardColor, "none");
        drawCanvas(
          snakeBoard,
          [get(food, "x", 20), get(food, "y", 20), unit, unit],
          foodColor,
          "none"
        );

        this.moveSnake();
        this.drawSnake();

        //call me again after timeOut
        this.startGame();
      }, (6 - level) * timeInterval);
    this.setState({ timeOutId });
  };

  //will draw a snake of length 2 unit of size 20px
  drawSnake = () => {
    const { snake } = this.state;
    const snakeBoard = get(this, "snakeBoardRef.current", undefined);
    !isEmpty(snake) &&
      snakeBoard &&
      snake.forEach((snakePart) => {
        drawCanvas(
          snakeBoard,
          [get(snakePart, "x", 150), get(snakePart, "y", 150), unit, unit],
          snakeColor,
          "none"
        );
      });
  };

  moveSnake = () => {
    let { dxy, snake, food } = this.state;

    //updated position of head of snake
    const head = {
      x: get(snake[0], "x") + get(dxy, "dx"),
      y: get(snake[0], "y") + get(dxy, "dy"),
    };

    snake.unshift(head);

    //will check food is eaten or not
    const hasEatenFood =
      isEqual(get(snake[0], "x"), get(food, "x")) &&
      isEqual(get(snake[0], "y"), get(food, "y"));

    if (hasEatenFood) {
      this.setState(
        (prevState) => ({ score: prevState.score + 1 }),
        this.generateFood()
      );
    } else {
      snake.pop();
    }

    this.setState({ snake });
  };

  generateFood = () => {
    const { snake } = this.state;
    const { width, height } = this.props;
    const food = {
      x: randomFood(0, width - 10),
      y: randomFood(0, height - 10),
    };

    this.setState({ food });

    //will check the food generated is not in snake area
    snake.forEach((snakePart) => {
      if (
        isEqual(get(snakePart, "x"), get(food, "x")) &&
        isEqual(get(snakePart, "y"), get(food, "y"))
      ) {
        this.generateFood();
      }
    });
  };

  changeDirection = (event) => {
    if (get(this.state, "changeDirection", false)) return;
    const keyPressed = get(event, "keyCode", "");
    let dxy = { ...get(this.state, "dxy", {}) };
    dxy = getChangeInPositionOfSnake({ keyPressed, dxy });
    this.setState({ dxy });
  };

  //will check snake touch the boundary or itself
  isGameOver = () => {
    const { snake } = this.state;
    const { width, height } = this.props;
    let isGameOver = "";
    if (snake.length < 0) return false;

    //will check if snake touch itself or not
    for (let i = 4; i < snake.length; i++) {
      if (
        isEqual(get(snake[i], "x"), get(snake[0], "x")) &&
        isEqual(get(snake[i], "y"), get(snake[0], "y"))
      ) {
        isGameOver = true;
      }
    }

    //will check if snake touch boarder or not
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > height - 10;

    isGameOver = hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    this.setState({ isGameOver });
    return isGameOver;
  };

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        className="snake-game_board"
        ref={this.snakeBoardRef}
        width={width}
        height={height}
      />
    );
  }
}
export default SnakeBoard;
