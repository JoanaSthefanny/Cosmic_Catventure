class Engine {
  constructor(game) {
    this.Game = game;
    this.power = 0;
  }

  preload() {
    // Não há necessidade de carregar arquivos de som
  }

  powerUp(speed) {
    this.power = speed / 10;
  }

  powerDown(speed) {
    this.power = speed / 10;
  }


  stop() {
    this.power = 0;
  }
}
