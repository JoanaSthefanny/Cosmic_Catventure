let game;

function preload() {
  game = new Game(); // Cria uma instância do objeto Game
  game.preload(); // Executa a função preload do objeto Game para carregar os recursos
}

function setup() {
  game.setup(); // Executa a função setup do objeto Game para configurar o jogo
  
}

function draw() {
  game.draw(); // Executa a função draw do objeto Game para atualizar e renderizar o jogo
}



