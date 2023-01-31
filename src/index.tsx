/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Game } from "./modules/Game";

render(() => <Game />, document.getElementById("root") as HTMLElement);
