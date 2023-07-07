class Track {
  constructor(game) {
    this.Game = game;
    this.minSpeed = 0;
    this.speed = this.minSpeed;
    this.maxSpeed = 10;
    this.speedFactor = 0.2;
  }

  preload() {
    this.image = loadImage('img/track.png');
  }

  setup() {
    this.height = height;
    this.width = width;
    this.topY = -this.height;
    this.bottomY = 0;
  }

  draw() {
    this.show();
    if (this.Game.Car.visible && this.Game.started && !this.Game.winner) {
      if (keyIsDown(65)) {
        this.speedUp();
      } else {
        let brake = keyIsDown(90);
        this.speedDown(brake);
      }
    }
    if (this.Game.winner) {
      this.Game.Car.stop();
    }
    this.move();
  }

  show() {
    image(this.image, 0, this.topY, this.width, this.height);
    image(this.image, 0, this.bottomY, this.width, this.height);
  }

  speedUp() {
    if (this.speed < this.maxSpeed) {
      this.speed = this.speed + this.speedFactor;
    }
    this.Game.Engine.powerUp(this.speed);
  }

  speedDown(brake = false) {
    if (this.speed > this.minSpeed) {
      this.speed = this.speed - this.speedFactor;
    }
    this.Game.Engine.powerDown(this.speed);
  }

  move() {
    this.topY = this.topY + this.speed;
    this.bottomY = this.bottomY + this.speed;
    if (this.topY > this.height) {
      this.topY = -this.height;
    }
    if (this.bottomY > this.height) {
      this.bottomY = -this.height;
    }
  }

  stop() {
    this.speed = this.minSpeed;
  }
}
