import { GameState } from "../Game/types";
import { SnakeDirection, SnakeSegment } from "./types";

export const createSnakeSegment = (
  snakeSegment: SnakeSegment
): SnakeSegment => ({
  ...snakeSegment,
});

export const createInitialSnakeSegment = (
  canvasWidth: number,
  canvasHeight: number
): SnakeSegment[] => [
  createSnakeSegment({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    dir: SnakeDirection.RIGHT,
  }),
];

export const updateSnake = (snake: SnakeSegment[]): SnakeSegment[] => {
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

const updateSnakeDirection = (gameState: GameState, key: string): GameState => {
  const keyToDirection = {
    ["KeyW"]: SnakeDirection.UP,
    ["KeyD"]: SnakeDirection.RIGHT,
    ["KeyS"]: SnakeDirection.DOWN,
    ["KeyA"]: SnakeDirection.LEFT,
  };

  // It's enough to only update head position
  // the rest of the body will follow
  const [head, ...body] = gameState.snake;
  head.dir = keyToDirection[key];

  return {
    ...gameState,
    snake: [head, ...body],
  };
};
