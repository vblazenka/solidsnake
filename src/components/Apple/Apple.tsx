import { Component } from "solid-js";
import { Container } from "./styles.css";
import { Apple as AppleType } from "./types";

export const Apple: Component<AppleType> = (props) => {
  return <div class={Container}></div>;
};
