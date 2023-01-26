import { onCleanup, onMount } from "solid-js";

const gameControlKeys = ["KeyW", "KeyA", "KeyS", "KeyD", "Space"];

export const useDetectWhitelistedGameKeyEvents = (callbackFn) => {
  const handleKeyPress = (event) => {
    if (gameControlKeys.includes(event.code)) {
      callbackFn(event.code);
    }
  };

  onMount(() => {
    window.addEventListener("keypress", handleKeyPress);
  });

  onCleanup(() => {
    window.addEventListener("keypress", handleKeyPress);
  });
};
