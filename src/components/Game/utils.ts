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

export const updateGameState = (gameState: GameState): GameState => {
  if (gameState.state === PlayState.NO_STARTED) {
    return gameState;
  }

  if (gameState.state === PlayState.PLAYING) {
    return {
      ...gameState,
      snake: updateSnake(gameState.snake),
    };
  }

  return gameState;
};
