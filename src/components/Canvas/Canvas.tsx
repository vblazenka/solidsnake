import type { Component, JSXElement } from "solid-js";
import { Container } from "./styles.css";

type Props = {
  children: JSXElement;
};

export const Canvas: Component<Props> = (props) => {
  return <div class={Container}>{props.children}</div>;
};
