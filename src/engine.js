class Engine {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.power = 0; // Valor atual da potência do motor
  }

  powerUp(speed) {
    this.power = speed / 2; // Aumenta a potência do motor com base na velocidade
  }

  powerDown(speed) {
    this.power = speed / 2; // Diminui a potência do motor com base na velocidade
  }

  stop() {
    this.power = 0; // Define a potência do motor como 0 (parado)
  }
}

