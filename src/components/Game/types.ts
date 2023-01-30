import { SnakeSegment } from "../Snake/types";

export enum PlayState {
  NO_STARTED,
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export type GameState = {
  score: number;
  state: PlayState;
  snake: SnakeSegment[];
};
