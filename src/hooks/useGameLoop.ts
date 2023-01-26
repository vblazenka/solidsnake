import { onCleanup, onMount } from "solid-js";

export const useGameLoop = (updateFn, delay: number = 300) => {
  let timer;

  onMount(() => {
    timer = setInterval(() => {
      updateFn();
    }, delay);
  });

  onCleanup(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
};
