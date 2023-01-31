import { SnakeSegment } from "../Snake/types";
import { Apple } from "../Apple/types";

export enum PlayState {
  NO_STARTED,
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export type GameState = {
  score: number;
  state: PlayState;
  apple: Apple;
  snake: SnakeSegment[];
};

export type GameControlKey = "KeyW" | "KeyA" | "KeyS" | "KeyD" | "Space";
