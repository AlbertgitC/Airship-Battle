import GameView from "./game_view";
import Game from "./game";


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});