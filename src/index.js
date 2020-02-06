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

const autoScale = () => {
  console.log("triggered");
  const game_area = document.getElementById("game-canvas");
  const width_height = 4 / 3;
  const new_width = window.innerWidth;
  const new_height = window.innerHeight;
  const new_width_height = new_width / new_height;

  if (new_width_height > width_height) {
    new_width = new_height * width_height;
    game_area.style.height = new_height + 'px';
    game_area.style.width = new_width + 'px';
  } else {
    new_height = new_width / width_height;
    game_area.style.width = new_width + 'px';
    game_area.style.height = new_height + 'px';
  }

  const game_canvas = document.getElementById('game-canvas');
  game_canvas.width = new_width;
  game_canvas.height = new_height;

};

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
  
  window.addEventListener('resize', autoScale, false);
  window.addEventListener('orientationchange', autoScale, false);

});

