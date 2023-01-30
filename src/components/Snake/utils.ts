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
  const SPEED = 14;

  function updateSegmentPosition(segment: SnakeSegment): SnakeSegment {
    let { dir, x, y } = { ...segment };

    if (dir === SnakeDirection.RIGHT) {
      x += SPEED;
    }

    if (dir === SnakeDirection.LEFT) {
      x -= SPEED;
    }

    if (dir === SnakeDirection.UP) {
      y -= SPEED;
    }

    if (dir === SnakeDirection.DOWN) {
      y += SPEED;
    }

    return { x, y, dir };
  }

  return snake.map(updateSegmentPosition);
};

export const updateSnakeDirection =
  (key: string) =>
  (gameState: GameState): GameState => {
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
