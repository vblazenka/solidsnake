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
  const SPEED = 7;

  function updateSegmentPosition(segment: SnakeSegment): SnakeSegment {
    let s = { ...segment };
    switch (s.dir) {
      case SnakeDirection.RIGHT:
        s.x += SPEED;
        break;
      case SnakeDirection.DOWN:
        break;
      case SnakeDirection.LEFT:
        break;
      case SnakeDirection.UP:
        break;
      default:
        break;
    }

    return s;
  }

  return snake.map(updateSegmentPosition);
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
