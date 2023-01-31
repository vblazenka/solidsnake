export enum SnakeDirection {
  UP,
  DOWN,
  RIGHT,
  LEFT,
}

export type SnakeSegment = {
  x: number;
  y: number;
  dir: SnakeDirection;
};

export type Snake = {
  segments: SnakeSegment[];
};
