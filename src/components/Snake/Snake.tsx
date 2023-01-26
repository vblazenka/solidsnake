import { Component, For, JSXElement } from "solid-js";
import { Head, Part } from "./styles.css.ts";
import { Snake as SnakeType, SnakeSegment } from "./types";

const getPosition = (part: SnakeSegment) => ({
  transform: `translate(${part.x}px, ${part.y}px)`,
});

export const Snake: Component<SnakeType> = (props) => {
  return (
    <For each={props.segments}>
      {(segment, index) => (
        <div
          // TODO: you can use classList to append class conditionally
          class={`${Part} ${index() === 0 ? Head : ""}`}
          style={getPosition(segment)}
          data-testid="snake-segment"
        ></div>
      )}
    </For>
  );
};
