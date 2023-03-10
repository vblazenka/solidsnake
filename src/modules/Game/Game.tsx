import { Component, createSignal, Match, Switch } from "solid-js";

import { Canvas } from "../Canvas";
import { Snake } from "../Snake";
import { HUD, Text } from "../UI";
import { AppleCmp } from "../Apple";

import { useGameEvents } from "./hooks/useGameEvents";
import { useGameLoop } from "./hooks/useGameLoop";

import {
  createInitialSnakeSegment,
  updateSnakeDirection,
} from "../Snake/utils";
import { createInitialGameState, updateGameState } from "./utils";

import { GameState, PlayState } from "./types";

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

  useGameEvents((pressedKey) => {
    const gameState = getGameState().state;

    if (pressedKey === "Space" && gameState === PlayState.NO_STARTED) {
      setGameState((state) => ({
        ...state,
        state: PlayState.PLAYING,
      }));
    }

    if (pressedKey !== "Space" && gameState === PlayState.PLAYING) {
      setGameState(updateSnakeDirection(pressedKey));
    }
  });

  return (
    <Canvas>
      <Switch>
        <Match when={getGameState().state === PlayState.NO_STARTED}>
          <Text blink>PRESS SPACE TO PLAY</Text>
          <br /> {/* ¯\_(ツ)_/¯ */}
          <Text>This snake is a vegan.</Text>
          <Text>Eat as many tomatoes as you can.</Text>
          <Text>Try not to die and have fun. ☺️</Text>
        </Match>
        <Match when={getGameState().state === PlayState.PLAYING}>
          <Snake segments={getGameState().snake} />
          <AppleCmp {...getGameState().apple} />
          <HUD>
            <Text white>Score: {getGameState().score}</Text>
          </HUD>
        </Match>
        <Match when={getGameState().state === PlayState.GAME_OVER}>
          <Text blink>GAME OVER</Text>
          <Text>Final score: {getGameState().score}</Text>
        </Match>
      </Switch>
    </Canvas>
  );
};
