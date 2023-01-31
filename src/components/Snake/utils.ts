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
  const SNAKE_SEGMENT_SIZE = 14;

  const updateSegmentPosition = (segment: SnakeSegment, index: number) => {
    let { dir, x, y } = segment;

    const isHeadSegment = index === 0;
    const oldDirRef = dir;
    // each segment behind head should take the dir from the segment in front of him
    dir = isHeadSegment ? dir : snake[index - 1].dir;
    // if dir is changed then we need to reposition segment behind the next segment
    const isDirChanged = !isHeadSegment && oldDirRef !== dir;

    switch (dir) {
      case SnakeDirection.RIGHT:
        x += isDirChanged ? 0 : SPEED;
        if (oldDirRef === SnakeDirection.UP) y -= SNAKE_SEGMENT_SIZE;
        if (oldDirRef === SnakeDirection.DOWN) y += SNAKE_SEGMENT_SIZE;
        break;
      case SnakeDirection.LEFT:
        x -= isDirChanged ? 0 : SPEED;
        if (oldDirRef === SnakeDirection.UP) y -= SNAKE_SEGMENT_SIZE;
        if (oldDirRef === SnakeDirection.DOWN) y += SNAKE_SEGMENT_SIZE;
        break;
      case SnakeDirection.UP:
        y -= isDirChanged ? 0 : SPEED;
        if (oldDirRef === SnakeDirection.RIGHT) x += SNAKE_SEGMENT_SIZE;
        if (oldDirRef === SnakeDirection.LEFT) x -= SNAKE_SEGMENT_SIZE;
        break;
      case SnakeDirection.DOWN:
        y += isDirChanged ? 0 : SPEED;
        if (oldDirRef === SnakeDirection.RIGHT) x += SNAKE_SEGMENT_SIZE;
        if (oldDirRef === SnakeDirection.LEFT) x -= SNAKE_SEGMENT_SIZE;
        break;
    }

    return createSnakeSegment({ x, y, dir });
  };

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
