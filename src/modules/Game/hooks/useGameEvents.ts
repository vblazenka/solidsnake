import { onCleanup, onMount } from "solid-js";

import { GameControlKey } from "../types";

const gameControlKeys: GameControlKey[] = [
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "Space",
];

type Callback = (keycode: GameControlKey) => void;

export const useGameEvents = (callback: Callback) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameControlKeys.includes(event.code as GameControlKey)) {
      callback(event.code as GameControlKey);
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyPress);
  });

  onCleanup(() => {
    window.addEventListener("keydown", handleKeyPress);
  });
};
