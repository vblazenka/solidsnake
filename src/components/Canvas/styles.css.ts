import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  background: "#ffffff",

  // TODO: Extract this to variables
  width: 400,
  height: 400,
});
