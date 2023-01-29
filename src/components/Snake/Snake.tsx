import { Component, createEffect, For, JSXElement, splitProps } from "solid-js";
import { Head, Part } from "./styles.css.ts";
import { Snake as SnakeType, SnakeSegment } from "./types";

const getPosition = (segment: SnakeSegment) => ({
  transform: `translate(${segment.x}px, ${segment.y}px)`,
});

export const Snake: Component<SnakeType> = (props) => {
  const [{ segments }] = splitProps(props, ["segments"]);
  return (
    <For each={segments}>
      {({ x, y }, index) => (
        <div
          // TODO: you can use classList to append class conditionally
          class={`${Part} ${index() === 0 ? Head : ""}`}
          style={{ transform: `translate(${x}px, ${y}px)` }}
          data-testid="snake-segment"
        >
          {x}
        </div>
      )}
    </For>
  );
};
