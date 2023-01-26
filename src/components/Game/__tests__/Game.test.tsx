import { SnakeDirection, updateSnake } from "../Game";

const SEGMENT_SIZE = 5;
const snakeMock = [
  { x: SEGMENT_SIZE, y: 0, dir: SnakeDirection.RIGHT },
  { x: SEGMENT_SIZE * 2, y: 0, dir: SnakeDirection.RIGHT },
  { x: SEGMENT_SIZE * 3, y: 0, dir: SnakeDirection.RIGHT },
];

describe("Game", () => {
  describe("updateSnake", () => {
    test("updates each snake segment according to the next one", () => {
      expect(updateSnake(snakeMock)).toBe([]);
    });
  });
});
