class Explosion {
  constructor(car) {
    this.Car = car;
    this.frame = 0;
  }

  preload() {
    // Não há necessidade de carregar o som
  }

  setup() {
    this.width = 100;
    this.height = 100;
  }

  show() {
    let left = this.Car.left;
    if (left > this.Car.initialLeft) {
      left = left - this.Car.width;
    }
    image(
      this.Car.image,
      left,
      this.Car.top,
      this.width,
      this.height
    );
  }
}
