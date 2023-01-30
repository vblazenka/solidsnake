import { Component, createEffect, createSignal, Match, Switch } from "solid-js";

import { Canvas } from "../Canvas";
import { Snake } from "../Snake";
import { useDetectWhitelistedGameKeyEvents } from "../../hooks/useDetectWhitelistedGameKeyEvents";
import { useGameLoop } from "../../hooks/useGameLoop";
import { createInitialSnakeSegment, updateSnake } from "../Snake/utils";
import { createInitialGameState, updateGameState } from "./utils";
import { GameState, PlayState } from "./types";
import { Text } from "../UI";

export const Game: Component = () => {
  const $canvas = document.querySelector("#canvas");
  const [getGameState, setGameState] = createSignal<GameState>(
    createInitialGameState({
      snake: createInitialSnakeSegment(
        $canvas?.getBoundingClientRect().width || 0,
        $canvas?.getBoundingClientRect().height || 0
      ),
    })
  );

  useGameLoop(() => {
    setGameState(updateGameState);
  });

  useDetectWhitelistedGameKeyEvents((pressedKey) => {
    if (pressedKey === "Space") {
      setGameState((state) => ({
        ...state,
        state: PlayState.PLAYING,
      }));
    } else {
      console.log("@should change dir");
      // setGameState(updateSnakeDirection(getGameState(), pressedKey));
    }
  });

  return (
    <Canvas>
      <Switch>
        <Match when={getGameState().state === PlayState.NO_STARTED}>
          <Text>PRESS SPACE TO PLAY</Text>
        </Match>
        <Match when={getGameState().state === PlayState.PLAYING}>
          <Snake segments={getGameState().snake} />
        </Match>
      </Switch>
    </Canvas>
  );
};
