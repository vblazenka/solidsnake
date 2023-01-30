import { SnakeSegment } from "../Snake/types";
import { updateSnake } from "../Snake/utils";
import { GameState, PlayState } from "./types";

export const createInitialGameState = (state: {
  snake: SnakeSegment[];
}): GameState => ({
  score: 0,
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
      console.log("@game over@");
      updatedState.state = PlayState.GAME_OVER;
    }

    return updatedState;
  }

  return gameState;
};
