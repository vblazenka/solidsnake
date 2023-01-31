import { JSXElement } from "solid-js";
import {
  HUDContainer,
  Text as StyleText,
  WithBlink,
  WithWhite,
} from "./styles.css";

export const Text = ({
  children,
  blink,
  white,
}: {
  children: JSXElement;
  blink?: boolean;
  white?: boolean;
}) => (
  <p class={StyleText} classList={{ [WithBlink]: blink, [WithWhite]: white }}>
    {children}
  </p>
);

export const HUD = ({ children }: { children: JSXElement }) => (
  <div class={HUDContainer}>{children}</div>
);
