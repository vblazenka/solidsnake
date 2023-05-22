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


const SPEED = 14;
const SNAKE_SEGMENT_SIZE = 14;

export const updateSnake = (snake: SnakeSegment[]): SnakeSegment[] => {
  const getNewPosition = (segment: SnakeSegment, isDirChanged: boolean, oldDirRef: SnakeDirection) => {
    let { dir, x, y } = segment;

    // The adjustments in the x and y directions based on the direction of the snake
    const directionAdjustments: Record<SnakeDirection, { x: number, y: number }> = {
      [SnakeDirection.RIGHT]: { x: isDirChanged ? 0 : SPEED, y: oldDirRef === SnakeDirection.UP ? -SNAKE_SEGMENT_SIZE : (oldDirRef === SnakeDirection.DOWN ? SNAKE_SEGMENT_SIZE : 0) },
      [SnakeDirection.LEFT]: { x: isDirChanged ? 0 : -SPEED, y: oldDirRef === SnakeDirection.UP ? -SNAKE_SEGMENT_SIZE : (oldDirRef === SnakeDirection.DOWN ? SNAKE_SEGMENT_SIZE : 0) },
      [SnakeDirection.UP]: { y: isDirChanged ? 0 : -SPEED, x: oldDirRef === SnakeDirection.RIGHT ? SNAKE_SEGMENT_SIZE : (oldDirRef === SnakeDirection.LEFT ? -SNAKE_SEGMENT_SIZE : 0) },
      [SnakeDirection.DOWN]: { y: isDirChanged ? 0 : SPEED, x: oldDirRef === SnakeDirection.RIGHT ? SNAKE_SEGMENT_SIZE : (oldDirRef === SnakeDirection.LEFT ? -SNAKE_SEGMENT_SIZE : 0) },
    };

    const adjustment = directionAdjustments[dir];
    return { ...segment, x: x + adjustment.x, y: y + adjustment.y };
  };

  const updateSegmentPosition = (segment: SnakeSegment, index: number) => {
    const isHeadSegment = index === 0;
    const oldDirRef = segment.dir;

    // each segment behind head should take the dir from the segment in front of him
    const dir = isHeadSegment ? segment.dir : snake[index - 1].dir;
   
    // if dir is changed then we need to reposition segment behind the next segment
    const isDirChanged = !isHeadSegment && oldDirRef !== dir;

    return createSnakeSegment(getNewPosition({ ...segment, dir }, isDirChanged, oldDirRef));
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
