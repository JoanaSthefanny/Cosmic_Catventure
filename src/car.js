class Car {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.Explosion = new Explosion(this); // Instância da classe Explosion para lidar com explosões
    this.visible = true; // Indica se o carro é visível na tela
    this.control = true; // Indica se o carro está sob controle do jogador
    this.speedReduced = false;

    // Imagens do carro
    this.defaultImage = loadImage('img/GatoP.gif');
    this.leftImage = loadImage('img/GatoP.gif');
    this.rightImage = loadImage('img/GatoP.gif');
  }

  preload() {
    this.Explosion.preload(); // Carrega os recursos necessários para a explosão
  }

  reset() {
    this.visible = true; // Define a visibilidade do carro como true
    this.control = true; // Define o controle do carro como true
    this.image = this.defaultImage; // Define a imagem do carro como a imagem padrão
    this.left = this.initialLeft; // Define a posição horizontal do carro como a posição inicial

    // Outras configurações ou propriedades relevantes podem ser reiniciadas aqui
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
    //this.Explosion.setup(); // Configura a explosão
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
      this.showSpeed();
    }
      
  }
 
  show() {
    // Exibe a imagem do carro na posição atual
    image(this.image, this.left, this.top, this.width, this.height);
  }

  
  toLeft() {
    if (this.left > this.limitLeft) {   
      this.left = this.left - (this.Game.Track.speed / 2);
     
    } else  {
        this.reduceSpeed(); // Reduz a velocidade da pista em 15% se estiver apenas no limite sem acelerar
      }
    }
  
 
  toRight() {
    if (this.left < this.limitRight) {
      // Move o carro para a direita até o limite direito
      this.left = this.left + (this.Game.Track.speed / 2);
    } else {
      this.reduceSpeed(); // Reduz a velocidade do carro em 15%
    }
  }

  reduceSpeed() {
    this.Game.Track.speed *= 0.85; // Reduz a velocidade da pista em 15% (85% da velocidade atual)
    this.Game.Engine.powerDown(this.Game.Track.speed); // Atualiza a potência do motor do carro
  }
  
  showSpeed() { // exibe a velocidade do carro
    const speedDisplay = document.getElementById('speed-display');
    speedDisplay.textContent = `${this.Game.Track.speed.toFixed(2)}`;
    //NumberFormat.getCurrencyInstance();
  }
/*
  speedCheck() {
    if (this.left > this.limitLeft && this.left < this.limitRight) {
      this.speedReduced = false; // Carro está dentro dos limites, redefine a flag de velocidade reduzida como false
    } else {
      this.reduceSpeed();
      this.speedReduced = true; // Carro está fora dos limites, define a flag de velocidade reduzida como true
    }
  }
*/
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