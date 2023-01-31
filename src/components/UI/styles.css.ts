import { style, keyframes } from "@vanilla-extract/css";

const blink = keyframes({
  to: { visibility: "hidden" },
});

export const Text = style({
  fontSize: "1.25rem",
});

export const WithBlink = style({
  animation: `${blink} 0.9s steps(5, start) infinite`,
});

export const WithWhite = style({
  color: "white",
});

export const HUDContainer = style({
  position: "absolute",
  top: -24,
  left: 0,
});
