import { rooms } from "../rooms.js";
import { Move } from "../functions/move.js";
import { Action } from "../functions/actions.js";

const START = document.getElementById("start_screen");
START.style.visibility = "visible";


window.addEventListener("keyup", (e) => {
  if (e.key === "z" || e.key === "s" || e.key === "q" || e.key === "d") {
    Move(e.key);
  }
  else if (e.key === "a") {
    Move(e.key);
  }
});

window.addEventListener("keydown", () => {
  START.style.visibility = "hidden";
});
