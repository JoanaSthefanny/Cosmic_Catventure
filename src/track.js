class Track {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.minSpeed = 0; // Velocidade mínima da pista
    this.speed = this.minSpeed; // Velocidade atual da pista
    this.maxSpeed = 10; // Velocidade máxima da pista
    this.speedFactor = 0.2; // Fator de aumento de velocidade
  }

  preload() {
    this.image = loadImage('img/track.png'); // Carrega a imagem da pista
  }

  setup() {
    this.height = height; // Altura da tela
    this.width = width; // Largura da tela
    this.topY = -this.height; // Posição Y da parte superior da pista
    this.bottomY = 0; // Posição Y da parte inferior da pista
  }

  draw() {
    this.show(); // Exibe a imagem da pista
    if (this.Game.Car.visible && this.Game.started && !this.Game.winner) {
      if (keyIsDown(65)) {
        this.speedUp(); // Acelera a pista quando a tecla A é pressionada
      } else {
        this.speedDown(); // Desacelera a pista quando a tecla A não está pressionada
      }
    }
    if (this.Game.winner) {
      this.Game.Car.stop(); // Para o carro quando o jogador vence o jogo
    }
    this.move(); // Move a pista
  }

  show() {
    image(this.image, 0, this.topY, this.width, this.height); // Exibe a imagem da pista na parte superior da tela
    image(this.image, 0, this.bottomY, this.width, this.height); // Exibe a imagem da pista na parte inferior da tela
  }

  speedUp() {
    if (this.speed < this.maxSpeed) {
      this.speed = this.speed + this.speedFactor; // Aumenta a velocidade da pista dentro do limite máximo
    }
    this.Game.Engine.powerUp(this.speed); // Atualiza a potência do motor do carro
  }

  speedDown() {
    if (this.speed > this.minSpeed) {
      this.speed -= this.speed * 0.05; // Desacelera a pista em 5% da velocidade atual
    } else {
      this.speed = this.minSpeed; // Define a velocidade da pista como a velocidade mínima
    }
    this.Game.Engine.powerDown(this.speed); // Atualiza a potência do motor do carro
  }

  move() {
    this.topY = this.topY + this.speed; // Move a posição Y da parte superior da pista
    this.bottomY = this.bottomY + this.speed; // Move a posição Y da parte inferior da pista
    if (this.topY > this.height) {
      this.topY = -this.height; // Reinicia a posição da parte superior da pista quando ultrapassa a altura da tela
    }
    if (this.bottomY > this.height) {
      this.bottomY = -this.height; // Reinicia a posição da parte inferior da pista quando ultrapassa a altura da tela
    }
  }

  stop() {
    this.speed = this.minSpeed; // Para a pista, definindo a velocidade como a velocidade mínima
  }
}