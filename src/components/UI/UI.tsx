import { JSXElement } from "solid-js";
import { Text as StyleText } from "./styles.css";

export const Text = ({ children }: { children: JSXElement }) => (
  <p class={StyleText}>{children}</p>
);
