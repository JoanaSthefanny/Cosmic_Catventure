class Score {
  constructor(game) {
    this.Game = game;
    this.seconds = 60;
    this.position = 70;
    this.timeoutOn = false;
  }

  preload() {}

  start() {
    setInterval(function(score) {
      score.seconds--;
    }, 1000, this);
  }

  draw() {
    if (this.Game.started) {
      if (this.Game.winner) {
        this.congratulate();
      } else {
        this.showPosition();
        this.showSeconds();
        if (this.seconds <= 0) {
          this.gameOver();
        }
        if (this.seconds <= 10) {
          this.timeoutSoundOn();
        }
      }
    } else {
      this.opening();
    }
  }

  showPosition() {
    textAlign(LEFT);
    fill('#fff');
    textSize(30);
    text('Posição', 30, 50)
    text(this.position, 30, 90)
  }

  showSeconds() {
    textAlign(RIGHT);
    fill('#fff');
    textSize(30);
    text('Tempo', width - 30, 50)
    text(this.seconds, width - 30, 90)
  }

  opening() {
    textAlign(CENTER);
    fill('#fff');
    textSize(40);
    text('ROAD FIGHTER', width / 2, height / 2 - 50);
    textSize(20);
    text('[ENTER] Para começar!', width / 2, height / 2);
    text('A  Acelerar', width / 2, height / 2 + 40);
    text('Z  Brecar', width / 2, height / 2 + 60);
    text('<- Esquerda', width / 2, height / 2 + 80);
    text('-> Direita', width / 2, height / 2 + 100);
  }

  congratulate() {
    this.timeoutSoundOff();
    textAlign(CENTER);
    fill('#fff');
    textSize(50);
    text('PARABÉNS!', width / 2, height / 2 - 20);
    text('Você venceu!', width / 2, height / 2 + 40);
  }

  gameOver() {
    textAlign(CENTER);
    fill('#ed1c24');
    textSize(50);
    text('GAME OVER!', width / 2, height / 2)
    this.timeoutSound.stop();
    this.Game.over();
  }

  addSeconds() {
    this.seconds = this.seconds + 10;
    this.timeoutSoundOff();
  }

  timeoutSoundOn() {
    if (!this.timeoutOn) {
      this.timeoutOn = true;
    }
  }

  timeoutSoundOff() {
    this.timeoutOn = false;
  }
}
