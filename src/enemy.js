class Enemy {
  constructor(game, type, percentLeft, delay) {
    this.Game = game;
    this.visible = true;
    this.type = type;
    this.percentLeft = percentLeft;
    this.delay = delay;

    this.images = [
      loadImage('img/Meteoro.gif'),
      loadImage('img/RatoP.gif'),
      loadImage('img/GatoP.png'),
      loadImage('img/Novelo_Pontos.gif'),
      loadImage('img/Novelo_Coracao.gif')
    ];
    this.image = this.images[type];
  }

  setup() {
    if (this.type === 3 || this.type === 4) {
      this.speed = 1;
    }
    if(this.type === 0){
      this.speed = -2;
    }
    if(this.type === 1 || this.type === 4) {
      this.speed = 1;
    }
    this.offset = 10;
    this.top = -this.delay;
    this.initialLeft = ((width / 2) - ((width / 3) * this.percentLeft));
    this.left = this.initialLeft - this.offset;
    this.width = 70;
    this.height = 100;

  }

  draw() {
    if (this.visible) {
      this.show();
      this.move();
      if (this.colliding()) {
        if (this.type !== 3 || this.type !== 4) {
          this.Game.Car.control = false;
          setTimeout(function(car) {
            car.control = true;
          }, 500, this.Game.Car);
        }
      }
    }
  }

  colliding() {
    const precision = 0.5;
    let collision = false;

    if (this.type !== 5) {
      collision = collideRectRect(
        this.top,
        this.left,
        this.width * precision,
        this.height * precision,
        this.Game.Car.top,
        this.Game.Car.left,
        this.Game.Car.width * precision,
        this.Game.Car.height * precision
      );
    }

    if (collision) {
      this.Game.Enemy = this;
    }

    if(collision && this.type === 0){
      this.Game.Score.subtractPoints();
    }

    if(collision && this.type === 1){
      this.Game.Score.subtractPoints();
    }

    if(collision && this.type === 2){
      this.Game.Score.subtractPoints();
    }

    if (collision && this.type === 3) {
      collision = false;
      this.bonus();
      this.Game.Score.addPoints();
    }

    if (collision && this.type === 4) {
      collision = false;
      this.bonus();
      this.Game.Score.addSeconds();
    }

    return collision;
  }

  show() {
    image(this.image, this.left, this.top, this.width, this.height);
  }

  move() {
    this.top += this.Game.Track.speed - this.speed;
    if (this.top > height) {
      this.overtake();
    }
    if (this.top > height * 0.25) {
      if (this.type === 1 && this.left > this.Game.Car.limitLeft + 3) {
        this.left--;
      }
      if (this.type === 2 && this.left < this.Game.Car.limitRight - 3) {
        this.left++;
      }
    }
  }

  overtake() {
    this.visible = false;
    if (this.type !== 3) {
      this.Game.overtake();
    }
  }

  bonus() {
    this.visible = false;
    this.top = -height;
  }
}