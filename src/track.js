class Track {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.minSpeed = 0; // Velocidade mínima da pista
    this.speed = this.minSpeed; // Velocidade atual da pista
    this.maxSpeed = 10; // Velocidade máxima da pista
    this.speedFactor = 0.2; // Fator de aumento de velocidade

    this.button1Element = document.getElementById('cenario1');
    this.button2Element = document.getElementById('cenario2');
    this.button3Element = document.getElementById('cenario3');
    this.button4Element = document.getElementById('cenario4');
   
    this.button1Element.addEventListener('click', () => this.loadImage('img/pista01.jpeg'));
    this.button2Element.addEventListener('click', () => this.loadImage('img/pista02.jpeg'));
    this.button3Element.addEventListener('click', () => this.loadImage('img/pista03.jpeg'));
    this.button4Element.addEventListener('click', () => this.loadImage('img/pista04.jpeg'));
    // Adiciona os eventos de clique aos botões e vincula aos métodos correspondentes da classe
   
  }

  preload() {
   // this.image = loadImage('img/pista01.jpeg'); // Carrega a imagem da pista
  }


  setup() {
    this.height = height; // Altura da tela
    this.width = width; // Largura da tela
    this.topY = -this.height; // Posição Y da parte superior da pista
    this.bottomY = 0; // Posição Y da parte inferior da pista

    this.loadImage('img/pista01.jpeg');
   
  }

  reset() {
    this.minSpeed = 0; // Define a velocidade mínima da pista para seu valor inicial
    this.speed = this.minSpeed; // Define a velocidade atual da pista para seu valor inicial
    this.maxSpeed = 10; // Define a velocidade máxima da pista para seu valor inicial
    this.speedFactor = 0.2; // Define o fator de aumento de velocidade para seu valor inicial
  
    // Outras propriedades e configurações relevantes podem ser reiniciadas aqui
  }

  draw() {
    this.show(); // Exibe a imagem da pista
    if (this.Game.Car.visible && this.Game.started && !this.Game.winner) {
      if (keyIsDown(38)) {
        this.speedUp(); // Acelera a pista quando a tecla seta para cima é pressionada
      } else {
        this.speedDown(); // Desacelera a pista quando a tecla seta para cima não está pressionada
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

  loadImage(imagePath) {
    this.image = loadImage(imagePath); // Carrega a imagem da pista com base no caminho fornecido
  }
}