import { Component } from "solid-js";
import { Container } from "./styles.css";
import { Apple } from "./types";

export const AppleCmp: Component<Apple> = (props) => {
  return (
    <div
      class={Container}
      style={{ transform: `translate(${props.x}px, ${props.y}px)` }}
    ></div>
  );
};
