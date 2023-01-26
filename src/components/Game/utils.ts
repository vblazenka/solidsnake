import { SnakeSegment } from "../Snake/types";
import { GameState, PlayState } from "./types";

export const createInitialGameState = (state: {
  snake: SnakeSegment[];
}): GameState => ({
  score: 0,
  state: PlayState.NO_STARTED,
  snake: state.snake,
});

export const updateGameState = () => {};
