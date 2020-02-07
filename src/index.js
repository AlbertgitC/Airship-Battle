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

const rescale = () => {
  const zoom_percent = parseInt(window.innerWidth / 1900 * 100);
  document.body.style.zoom = `${zoom_percent}%`;
};

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  loadGame(ctx);
  rescale();

  document.getElementById("start").onclick = () => {
    startGame(ctx);
    document.getElementById("start-menu").style.display = "none";
  };

  document.getElementById("restart").onclick = () => {
    startGame(ctx);
    document.getElementById("game-over-menu").style.display = "none";
  };

  window.addEventListener('resize', rescale);
  
});