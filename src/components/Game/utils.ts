import { SnakeSegment } from "../Snake/types";
import { updateSnake } from "../Snake/utils";
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

export const isCollisionWithWall = ({ x, y }) => {
  if (x > 200 || x < -200 || y > 200 || y <= -200) return true;

  return false;
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

    if (isCollisionWithWall(updatedState.snake[0])) {
      updatedState.state = PlayState.GAME_OVER;
    }

    return updatedState;
  }

  return gameState;
};
