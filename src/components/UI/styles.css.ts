import { style, keyframes } from "@vanilla-extract/css";

const blink = keyframes({
  to: { visibility: "hidden" },
});

export const Text = style({
  fontSize: "1.25rem",
  animation: `${blink} 0.9s steps(5, start) infinite`,
});
