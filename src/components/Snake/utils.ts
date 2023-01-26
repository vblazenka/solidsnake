import { SnakeDirection, SnakeSegment } from "./types";

export const createSnakeSegment = (
  snakeSegment: SnakeSegment
): SnakeSegment => ({
  ...snakeSegment,
});

export const createInitialSnakeSegment = (): SnakeSegment[] => [
  createSnakeSegment({ x: 200, y: 200, dir: SnakeDirection.RIGHT }),
];

export const updateSnake = (snake: SnakeSegment[]): SnakeSegment[] => {
  return snake;
  const SPEED = 2;
  for (let segment of snake) {
    switch (segment.dir) {
      case SnakeDirection.RIGHT:
        segment.x += SPEED;
        break;
      case SnakeDirection.DOWN:
        break;
      case SnakeDirection.LEFT:
        break;
      default:
        // UP
        break;
    }
  }

  return snake;
};
