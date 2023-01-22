import { style } from "@vanilla-extract/css";

export const Container = style({
  padding: "0.5rem",
  background: "#ffffff",

  // Extract this to variables
  width: 400,
  height: 400,
});
