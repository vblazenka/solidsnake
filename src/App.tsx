import type { Component } from "solid-js";

import { Canvas } from "./components/Canvas";
import { Snake } from "./components/Snake";

/*

  - Head -> direction
  - update position every X seconds

*/

const App: Component = () => {
  return (
    <Canvas>
      <Snake />
    </Canvas>
  );
};

export default App;
