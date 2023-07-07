class Game {
  constructor() {
    this.Track = new Track(this);
    this.Car = new Car(this);
    this.Score = new Score(this);
    this.Engine = new Engine(this);
    this.Circuit = new Circuit(this);
    this.running = true;
    this.started = false;
  }

  preload() {
    this.Track.preload();
    this.Car.preload();
    this.Score.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(50);
    this.Track.setup();
    this.Car.setup();
  }

  start() {
    this.Score.start();
    this.started = true;
    setInterval(function(game) {
      game.Circuit.addEnemy();
    }, 1500, this);
  }

  draw() {
    if (this.running) {
      this.Track.draw();
      this.Car.draw();
      this.Score.draw();
      if (this.started) {
        this.Circuit.draw();
      }
    } else {
      noLoop();
    }
  }

  over() {
    this.Car.stop();
    this.running = false;
  }

  overtake() {
    this.Score.points++;
  }
}
