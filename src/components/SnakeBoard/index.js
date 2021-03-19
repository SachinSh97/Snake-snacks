import React, { Component } from "react";
import boardImg from "../../assets/img/snake-board-bg.jpg";
import foodImg from "../../assets/img/normal-egg.png";
import "./SnakeBoard.scss";

//board background image
const Food = new Image();
Food.src = foodImg;

class SnakeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 20,
      snake: [],
      food: [],
      score: 0,
      keyType: "",
      timeOutId: 0,
    };
    this.snakeBoardRef = React.createRef();
  }

  componentDidMount() {
    this.initializeGame();
    window.addEventListener("keydown", this.direction);
    this.gameLoop();
  }

  gameLoop = () => {
    const timeOutId = setTimeout(() => {
      if (!this.state.isGameOver) {
        this.drawCanvas();
      }
      this.gameLoop();
    }, 100);

    this.setState({ timeOutId });
  };

  initializeGame = () => {
    const { width, height } = this.props;
    const { unit } = this.state;
    const totalUnitsInX = width / unit / 2;
    const totalUnitsInY = height / unit / 2;
    this.setState({
      snake: [
        { x: totalUnitsInX * unit, y: totalUnitsInY * unit },
        { x: (totalUnitsInX - 1) * unit, y: totalUnitsInY * unit },
      ],
      food: {
        x: Math.floor(Math.random() * totalUnitsInX + 1) * unit,
        y: Math.floor(Math.random() * totalUnitsInY + 3) * unit,
      },
    });
  };

  drawCanvas = () => {
    let snake = [...this.state.snake];
    let { unit, food, score, keyType } = this.state;
    let snakeBoard = this.snakeBoardRef.current.getContext("2d");
    for (let i = 0; i < snake.length; i++) {
      snakeBoard.fillStyle = i == 0 ? "green" : "white";
      snakeBoard.fillRect(snake[i].x, snake[i].y, unit, unit);
      snakeBoard.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }

    snakeBoard.drawImage(Food, food.x, food.y, 20, 20);

    //old position of snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //remove the tail of snake
    snake.pop();

    //which direction snake moves;
    if (keyType === "LEFT") snakeX -= unit;
    if (keyType === "UP") snakeY -= unit;
    if (keyType === "RIGHT") snakeX += unit;
    if (keyType === "DOWN") snakeY += unit;

    //add new head
    let newHead = {
      x: snakeX,
      y: snakeY,
    };

    snake.unshift(newHead);

    snakeBoard.fillStyle = "white";
    snakeBoard.font = "45px Change one";
    snakeBoard.fillText(score, 2 * unit, 1.6 * unit);
    this.setState({ snake });
  };

  direction = (event) => {
    const { keyCode } = event;
    let { keyType } = this.state;
    if (keyCode == 37 && keyType != "RIGHT") {
      keyType = "LEFT";
    } else if (keyCode == 38 && keyType != "DOWN") {
      keyType = "UP";
    } else if (keyCode == 39 && keyType != "LEFT") {
      keyType = "RIGHT";
    } else if (keyCode == 40 && keyType != "UP") {
      keyType = "DOWN";
    }
    this.setState({ keyType });
  };

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { width, height } = this.props;
    return (
      <canvas
        className="snake-board"
        ref={this.snakeBoardRef}
        width={width}
        height={height}
      />
    );
  }
}
export default SnakeBoard;
