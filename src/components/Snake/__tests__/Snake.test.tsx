import { cleanup, render, screen } from "@solidjs/testing-library";
import { Snake } from "../Snake";

describe("Snake", () => {
  describe("given an array of snake parts, produce snake of the same size as given snake parts", () => {
    test("renders snake consiting of a single part - her head", () => {
      const SNAKE_PARTS = [{ x: 0, y: 0, dir: 2 }];
      render(() => <Snake parts={SNAKE_PARTS} />);

      const snakeParts = screen.getAllByTestId("snake-part");
      expect(snakeParts.length).toBe(1);

      cleanup();
    });

    test("renders snake consiting of two parts - her head and one body segment", () => {
      const SNAKE_PARTS = [
        { x: 0, y: 0, dir: 2 },
        { x: 0, y: 0, dir: 2 },
      ];
      render(() => <Snake parts={SNAKE_PARTS} />);

      const snakeParts = screen.getAllByTestId("snake-part");
      expect(snakeParts.length).toBe(2);

      cleanup();
    });
  });
});
