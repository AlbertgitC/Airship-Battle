import GameView from "./game_view";
import Game from "./game";

const loadGame = (ctx) => {
  const game = new Game();
  new GameView(game, ctx).start();
}

const startGame = (ctx) => {
  const game = new Game();
  new GameView(game, ctx).start();
  game.bindKeyHandlers();
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  loadGame(ctx);
  
  document.getElementById("start").onclick = () => {
    startGame(ctx);
    document.getElementById("start-menu").style.display = "none";
  };

  document.getElementById("restart").onclick = () => {
    startGame(ctx);
    document.getElementById("game-over-menu").style.display = "none";
  };
  
  
});