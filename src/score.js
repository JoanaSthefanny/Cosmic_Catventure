class Score {
  constructor(game) {
    this.Game = game;
    this.seconds = 60;
    this.points = 0;
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
        this.showSeconds();
        this,this.showPoints();
        if (this.seconds <= 0) {
          this.gameOver();
        }
    } else {
      this.opening();
    }
  }



  showSeconds() {
    textAlign(RIGHT);
    fill('#fff');
    textSize(30);
    text('Tempo', width - 30, 50)
    text(this.seconds, width - 30, 90)
  }

  showPoints() {
    textAlign(CENTER);
    fill('#fff');
    textSize(30);
    text('Pontos', width/2, 50)
    text(this.points, width/2, 90)
  }

  opening() {
    textAlign(CENTER);
    fill('#fff');
    textSize(40);
    text('ROAD FIGHTER', width / 2, height / 2 - 50);
    textSize(20);
    text('[ENTER] Para começar!', width / 2, height / 2);
    text('A  Acelerar', width / 2, height / 2 + 40);
    text('<- Esquerda', width / 2, height / 2 + 60);
    text('-> Direita', width / 2, height / 2 + 80);
  }



  gameOver() {
    textAlign(CENTER);
    fill('#ed1c24');
    textSize(50);
    text('GAME OVER!', width / 2, height / 2)
    this.Game.over();
  }

  addPoints() {
    this.points = this.points + 10;
  }

  subtractPoints() {
    this.points = this.points - 5;
  }


  addSeconds() {
    this.seconds = this.seconds + 10;
  }


}
