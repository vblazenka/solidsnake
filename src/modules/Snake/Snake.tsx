import { Component, For } from "solid-js";
import { Head, Part } from "./styles.css";
import { Snake as SnakeType, SnakeSegment } from "./types";

export const Snake: Component<SnakeType> = (props) => (
  <For each={props.segments}>
    {(segment, index) => (
      <div
        class={Part}
        classList={{ [Head]: index() === 0 }}
        style={{ transform: `translate(${segment.x}px, ${segment.y}px)` }}
        data-testid="snake-segment"
      ></div>
    )}
  </For>
);
