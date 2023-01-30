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

  function updateSegmentPosition(
    segment: SnakeSegment,
    index: number
  ): SnakeSegment {
    let { dir, x, y } = { ...segment };

    const isHeadSegment = index === 0;
    const oldDirRef = dir;

    dir = isHeadSegment ? dir : snake[index - 1].dir;

    const isDirChanged = !isHeadSegment && oldDirRef !== dir;

    if (dir === SnakeDirection.RIGHT) {
      if (isDirChanged) {
        if (oldDirRef === SnakeDirection.UP) {
          y -= 14;
        }
        if (oldDirRef === SnakeDirection.DOWN) {
          y += 14;
        }
      } else {
        x += SPEED;
      }
    }

    if (dir === SnakeDirection.LEFT) {
      if (isDirChanged) {
        if (oldDirRef === SnakeDirection.UP) {
          y -= 14;
        }
        if (oldDirRef === SnakeDirection.DOWN) {
          y += 14;
        }
      } else {
        x -= SPEED;
      }
    }

    if (dir === SnakeDirection.UP) {
      if (isDirChanged) {
        if (oldDirRef === SnakeDirection.RIGHT) {
          x += 14;
        }
        if (oldDirRef === SnakeDirection.LEFT) {
          x -= 14;
        }
      } else {
        y -= SPEED;
      }
    }

    if (dir === SnakeDirection.DOWN) {
      if (isDirChanged) {
        if (oldDirRef === SnakeDirection.RIGHT) {
          x += 14;
        }
        if (oldDirRef === SnakeDirection.LEFT) {
          x -= 14;
        }
      } else {
        y += SPEED;
      }
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
    const newDir = keyToDirection[key];

    const shouldPreventReverseDirection =
      (newDir === SnakeDirection.RIGHT && head.dir === SnakeDirection.LEFT) ||
      (newDir === SnakeDirection.LEFT && head.dir === SnakeDirection.RIGHT) ||
      (newDir === SnakeDirection.UP && head.dir === SnakeDirection.DOWN) ||
      (newDir === SnakeDirection.DOWN && head.dir === SnakeDirection.UP);

    head.dir = shouldPreventReverseDirection ? head.dir : newDir;

    return {
      ...gameState,
      snake: [head, ...body],
    };
  };
