import MovingObject from "./moving_object";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  
  window.MovingObject = MovingObject;
  window.ctx = ctx;
});