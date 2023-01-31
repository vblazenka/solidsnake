import { onCleanup, onMount } from "solid-js";

type Callback = () => void;

export const useGameLoop = (callback: Callback, delay: number = 300) => {
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    timer = setInterval(() => {
      callback();
    }, delay);
  });

  onCleanup(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
};
