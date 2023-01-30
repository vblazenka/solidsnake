import { JSXElement } from "solid-js";
import { Text as StyleText, WithBlink } from "./styles.css";

export const Text = ({
  children,
  blink,
}: {
  children: JSXElement;
  blink?: boolean;
}) => (
  <p class={StyleText} classList={{ [WithBlink]: blink }}>
    {children}
  </p>
);
