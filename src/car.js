class Car {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.Explosion = new Explosion(this); // Instância da classe Explosion para lidar com explosões
    this.visible = true; // Indica se o carro é visível na tela
    this.control = true; // Indica se o carro está sob controle do jogador

    // Imagens do carro
    this.defaultImage = loadImage('img/GatoP.gif');
    this.leftImage = loadImage('img/GatoP.gif');
    this.rightImage = loadImage('img/GatoP.gif');
  }

  preload() {
    this.Explosion.preload(); // Carrega os recursos necessários para a explosão
  }

  setup() {
    // Configuração inicial do carro
    this.offset = 30; // Deslocamento horizontal em relação à posição central
    this.top = height - 150; // Posição vertical do carro
    this.initialLeft = (width / 2) - this.offset; // Posição horizontal inicial
    this.left = this.initialLeft; // Posição horizontal atual
    this.width = 100; // Largura do carro
    this.height = 100; // Altura do carro
    this.image = this.defaultImage; // Imagem atual do carro
    this.limitLeft = parseInt(this.Game.Track.width * 0.25); // Limite esquerdo de movimento
    this.limitRight = parseInt(this.Game.Track.width * 0.75) - this.width + this.offset; // Limite direito de movimento
    this.Explosion.setup(); // Configura a explosão
  }

  draw() {
    if (this.visible) {
      this.show(); // Exibe o carro na tela
      if (this.control) {
        // Verifica se o carro está sob controle do jogador
        if (keyIsDown(37)) {
          this.toLeft(); // Move o carro para a esquerda
        }
        if (keyIsDown(39)) {
          this.toRight(); // Move o carro para a direita
        }
      } else {
        this.loseControl(); // Perdeu o controle do carro
      }
    } else {
      this.Explosion.show(); // Exibe a explosão do carro
    }
  }

  show() {
    // Exibe a imagem do carro na posição atual
    image(this.image, this.left, this.top, this.width, this.height);
  }

  toLeft() {
    if (this.left > this.limitLeft) {
      // Move o carro para a esquerda até o limite esquerdo
      this.left = this.left - (this.Game.Track.speed / 2);
    } else {
      this.explode(); // O carro atingiu o limite esquerdo e explode
    }
  }

  toRight() {
    if (this.left < this.limitRight) {
      // Move o carro para a direita até o limite direito
      this.left = this.left + (this.Game.Track.speed / 2);
    } else {
      this.explode(); // O carro atingiu o limite direito e explode
    }
  }

  explode() {
    this.stop(); // Para o carro e inicia o processo de explosão
    setTimeout(function(car) {
      car.start(); // Reinicia o carro após um atraso de 2 segundos
    }, 2000, this);
  }

  start() {
    // Reinicia o carro para a posição inicial e reativa a visibilidade e controle
    this.left = this.initialLeft;
    this.visible = true;
    this.control = true;
    this.image = this.defaultImage;
  }

  stop() {
    // Para o carro e interrompe a execução da pista e do motor
    this.visible = false;
    this.Game.Track.stop();
    this.Game.Engine.stop();
  }

  loseControl() {
    // O carro perdeu o controle e segue o centro do inimigo
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