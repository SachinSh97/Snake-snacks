export const randomFood = (min, max) =>
  Math.round((Math.random() * (max - min) + min) / 10) * 10;

export const drawCanvas = (element, values, fillStyle, strokeStyle, image) => {
  const snakeBoard = element.getContext("2d");
  snakeBoard.fillStyle = fillStyle;
  snakeBoard.strokeStyle = strokeStyle;
  snakeBoard.fillRect(...values);
  snakeBoard.strokeRect(...values);
};
