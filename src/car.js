class Car {
  constructor(game) {
    this.Game = game;
    this.Explosion = new Explosion(this);
    this.visible = true;
    this.control = true;

    this.defaultImage = loadImage('img/GatoP.png');
    this.leftImage = loadImage('img/GatoP.png');
    this.rightImage = loadImage('img/GatoP.png');
  }

  preload() {
    this.Explosion.preload();
  }

  setup() {
    this.offset = 30;
    this.top = height - 150;
    this.initialLeft = (width / 2) - this.offset;
    this.left = this.initialLeft;
    this.width = 70;
    this.height = 100;
    this.image = this.defaultImage;
    this.limitLeft = parseInt(this.Game.Track.width * 0.25);
    this.limitRight = parseInt(this.Game.Track.width * 0.75) - this.width + this.offset;
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
    this.image = this.defaultImage;
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
      this.image = this.rightImage;
    } else {
      this.toLeft();
      this.image = this.leftImage;
    }
  }
}
