let game;

function preload() {
  game = new Game();
  game.preload();
}

function setup() {
  game.setup();
}

function draw() {
  game.draw();
}

function keyPressed() {
  if (keyCode === ENTER) {
    game.start();
  }
}