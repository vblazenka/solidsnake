import { Component, createEffect, createSignal, Match, Switch } from "solid-js";

import { Canvas } from "../Canvas";
import { Snake } from "../Snake";
import { useDetectWhitelistedGameKeyEvents } from "../../hooks/useDetectWhitelistedGameKeyEvents";
import { useGameLoop } from "../../hooks/useGameLoop";
import { createInitialSnakeSegment, updateSnake } from "../Snake/utils";
import { createInitialGameState } from "./utils";
import { GameState, PlayState } from "./types";
import { Text } from "../UI";

const updateGameState = (gameState: GameState): GameState => {
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

// const updateSnakeDirection = (gameState: GameState, key: string): GameState => {
//   const keyToDirection = {
//     w: SnakeDirection.UP,
//     d: SnakeDirection.RIGHT,
//     s: SnakeDirection.DOWN,
//     a: SnakeDirection.LEFT,
//   };

//   // It's enough to only update head position
//   // the rest of the body will follow
//   const [head, ...body] = gameState.snake;
//   head.dir = keyToDirection[key];

//   return {
//     ...gameState,
//     snake: [head, ...body],
//   };
// };

export const Game: Component = () => {
  const [getGameState, setGameState] = createSignal<GameState>(
    createInitialGameState({ snake: createInitialSnakeSegment() })
  );

  useGameLoop(() => {
    setGameState(updateGameState(getGameState()));
  });

  useDetectWhitelistedGameKeyEvents((pressedKey) => {
    if (pressedKey === "Space") {
      setGameState((state) => ({
        ...state,
        state: PlayState.PLAYING,
      }));
    }

    // setGameState(updateSnakeDirection(getGameState(), pressedKey));
  });

  return (
    <Canvas>
      <Switch>
        <Match when={getGameState().state === PlayState.NO_STARTED}>
          <Text>PRESS SPACE TO PLAY</Text>
        </Match>
        <Match when={getGameState().state === PlayState.PLAYING}>
          <Snake parts={getGameState().snake} />
        </Match>
      </Switch>
    </Canvas>
  );
};
