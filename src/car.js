class Car {
  constructor(game) {
    this.Game = game;
    this.Explosion = new Explosion(this);
    this.visible = true;
    this.control = true;
  }

  preload() {
    this.image = loadImage('img/GatoP.png');
    this.Explosion.preload();
  }

  setup() {
    this.offset = 25;
    this.top = height - 150;
    this.initialLeft = (width / 2) - this.offset;
    this.left = this.initialLeft;
    this.width = 70;
    this.height = 100;
    this.Explosion.setup();
  }

  draw() {
    if (this.visible) {
      this.show();
      if (this.control) {
        if (keyIsDown(37)) {
          this.toLeft();
        }
        if (keyIsDown(39)) {
          this.toRight();
        }
      } else {
        this.loseControl();
      }
    } else {
      this.Explosion.show();
    }
  }

  show() {
    image(this.image, this.left, this.top, this.width, this.height);
  }

  toLeft() {
    if (this.left > this.limitLeft) {
      this.left = this.left - (this.Game.Track.speed / 5);
    } else {
      this.explode();
    }
  }

  toRight() {
    if (this.left < this.limitRight) {
      this.left = this.left + (this.Game.Track.speed / 5);
    } else {
      this.explode();
    }
  }

  explode() {
    this.stop();
    setTimeout(function(car) {
      car.start();
    }, 2000, this);
  }

  start() {
    this.left = this.initialLeft;
    this.visible = true;
    this.control = true;
  }

  stop() {
    this.visible = false;
    this.Game.Track.stop();
    this.Game.Engine.stop();
  }

  loseControl() {
    let enemyCenter = this.Game.Enemy.left + (this.Game.Enemy.width / 2);
    if (this.left > enemyCenter) {
      this.toRight();
    } else {
      this.toLeft();
    }
  }
}
