import { keyCode } from "../constants/global";

//will return random location of food within snake board
export const randomFood = (min, max) =>
  Math.round((Math.random() * (max - min) + min) / 10) * 10;

//will create canvas using given details
export const drawCanvas = (element, values, fillStyle, strokeStyle, image) => {
  const snakeBoard = element.getContext("2d");
  snakeBoard.fillStyle = fillStyle;
  snakeBoard.strokeStyle = strokeStyle;
  snakeBoard.fillRect(...values);
  snakeBoard.strokeRect(...values);
};

//will return change in position of snake
export const getChangeInPositionOfSnake = ({ keyPressed, dxy: change }) => {
  let dxy = { ...change };
  switch (keyPressed) {
    case keyCode.LEFT_KEY:
      dxy.dx = dxy.dx !== 10 ? -10 : dxy.dx;
      dxy.dy = dxy.dx !== 10 ? 0 : dxy.dy;
      break;
    case keyCode.UP_KEY:
      dxy.dx = dxy.dy !== 10 ? 0 : dxy.dx;
      dxy.dy = dxy.dy !== 10 ? -10 : dxy.dy;
      break;
    case keyCode.RIGHT_KEY:
      dxy.dx = dxy.dx !== -10 ? 10 : dxy.dx;
      dxy.dy = dxy.dx !== -10 ? 0 : dxy.dy;
      break;
    case keyCode.DOWN_KEY:
      dxy.dx = dxy.dy !== -10 ? 0 : dxy.dx;
      dxy.dy = dxy.dy !== -10 ? 10 : dxy.dy;
      break;
  }
  return dxy;
};

export const filterByTerm = (inputArr, searchTerm) => {
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(searchTerm);
  });
}