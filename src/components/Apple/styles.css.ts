import { style } from "@vanilla-extract/css";

export const Container = style({
  position: "absolute",
  width: 10,
  height: 10,
  borderRadius: 2,

  background: "#D0312D",

  "::before": {
    content: "",
    position: "relative",
    top: -5,
    left: 5.5,
    transform: "rotate(45deg)",
    background: "#115C01",
    display: "block",
    width: 3,
    height: 6.5,
  },
});
