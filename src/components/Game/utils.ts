import { Apple } from "../Apple/types";
import { SnakeSegment } from "../Snake/types";
import { createSnakeSegment, updateSnake } from "../Snake/utils";
import { GameState, PlayState } from "./types";

const getRandomNumberBetween = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max - min + 1));

export const createInitialGameState = (state: {
  snake: SnakeSegment[];
}): GameState => ({
  score: 0,
  apple: {
    x: getRandomNumberBetween(-180, 180),
    y: getRandomNumberBetween(-180, 180),
  },
  state: PlayState.NO_STARTED,
  snake: state.snake,
});

export const isSnakeCollisionWithWall = ({
  x,
  y,
}: {
  x: number;
  y: number;
}) => {
  if (x > 200 || x < -200 || y > 200 || y <= -200) return true;

  return false;
};

export const isSnakeCollisionWithApple = (
  snake: SnakeSegment,
  apple: Apple
): boolean => {
  if (
    snake.x < apple.x + 4.5 &&
    snake.x + 14 > apple.x &&
    snake.y < apple.y + 7.5 &&
    snake.y + 14 > apple.y
  ) {
    return true;
  }

  return false;
};

export const isSnakeCollisionWithSelf = (snake: SnakeSegment[]) => {
  const [head, ...segments] = snake;

  return segments.reduce((collided, segment) => {
    return collided || (head.x === segment.x && head.y === segment.y);
  }, false);
};

export const updateGameState = (gameState: GameState): GameState => {
  if (gameState.state === PlayState.NO_STARTED) {
    return gameState;
  }

  if (gameState.state === PlayState.PLAYING) {
    const updatedState = {
      ...gameState,
      snake: updateSnake(gameState.snake),
    };

    if (
      isSnakeCollisionWithWall(updatedState.snake[0]) ||
      isSnakeCollisionWithSelf(updatedState.snake)
    ) {
      updatedState.state = PlayState.GAME_OVER;
    }

    if (isSnakeCollisionWithApple(updatedState.snake[0], updatedState.apple)) {
      updatedState.score += 1;
      updatedState.apple = {
        x: getRandomNumberBetween(-180, 180),
        y: getRandomNumberBetween(-180, 180),
      };
      updatedState.snake = [
        ...updatedState.snake,
        createSnakeSegment({
          y: gameState.snake[gameState.snake.length - 1].y,
          x: gameState.snake[gameState.snake.length - 1].x,
          dir: gameState.snake[gameState.snake.length - 1].dir,
        }),
      ];
    }

    return updatedState;
  }

  return gameState;
};
