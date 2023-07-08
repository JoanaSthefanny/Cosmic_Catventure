class Score {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.seconds = 60; // Tempo inicial em segundos
    this.points = 0; // Pontuação inicial
    this.timeoutOn = false; // Flag para controlar o timeout
  }

  preload() {
    // Nenhum carregamento necessário
  }

  start() {
    setInterval(function(score) {
      score.seconds--; // Decrementa o tempo a cada segundo
    }, 1000, this);
  }

  draw() {
    if (this.Game.started) {
      this.showSeconds(); // Exibe o tempo restante
      this.showPoints(); // Exibe a pontuação atual
      if (this.seconds <= 0) {
        this.gameOver(); // Encerra o jogo se o tempo acabar
      }
    } else {
      this.opening(); // Exibe a tela de abertura antes de iniciar o jogo
    }
  }

  showSeconds() {
    textAlign(RIGHT);
    fill('#fff');
    textSize(30);
    text('Tempo', width - 30, 50);
    text(this.seconds, width - 30, 90); // Exibe o tempo restante no canto superior direito
  }

  showPoints() {
    textAlign(CENTER);
    fill('#fff');
    textSize(30);
    text('Pontos', width/2, 50);
    text(this.points, width/2, 90); // Exibe a pontuação no centro da tela
  }

  opening() {
    textAlign(CENTER);
    fill('#fff');
    textSize(40);
    text('ROAD FIGHTER', width / 2, height / 2 - 50); // Título do jogo
    textSize(20);
    text('[ENTER] Para começar!', width / 2, height / 2); // Instrução para começar o jogo
    text('A  Acelerar', width / 2, height / 2 + 40); // Instrução para acelerar
    text('<- Esquerda', width / 2, height / 2 + 60); // Instrução para mover para a esquerda
    text('-> Direita', width / 2, height / 2 + 80); // Instrução para mover para a direita
  }

  gameOver() {
    textAlign(CENTER);
    fill('#ed1c24');
    textSize(50);
    text('GAME OVER!', width / 2, height / 2); // Mensagem de "GAME OVER!"
    this.Game.over(); // Encerra o jogo
  }

  addPoints() {
    this.points = this.points + 10; // Adiciona 10 pontos à pontuação atual
  }

  subtractPoints() {
    this.points = this.points - 5; // Subtrai 5 pontos da pontuação atual
  }

  addSeconds() {
    this.seconds = this.seconds + 10; // Adiciona 10 segundos ao tempo restante
  }
}
