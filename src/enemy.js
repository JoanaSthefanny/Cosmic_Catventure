class Enemy {
  constructor(game, type, percentLeft, delay) {
    this.Game = game; // Referência ao objeto Game
    this.visible = true; // Indica se o inimigo está visível na tela
    this.type = type; // Tipo do inimigo
    this.percentLeft = percentLeft; // Porcentagem da posição horizontal do inimigo em relação à largura da pista
    this.delay = delay; // Atraso inicial antes do inimigo aparecer na tela

    // Array de imagens dos inimigos
    this.images = [
      loadImage('img/Meteoro.gif'),
      loadImage('img/RatoP.gif'),
      loadImage('img/DogP.gif'),
      loadImage('img/Novelo_Pontos.png'),
      loadImage('img/Novelo_Coracao.gif')
    ];
    this.image = this.images[type]; // Imagem do inimigo correspondente ao seu tipo
  }
  
  setup() {
    // Configuração inicial do inimigo
    if (this.type === 3 || this.type === 4) {
      this.speed = 1; // Velocidade do inimigo do tipo 3 e 4
    }
    if (this.type === 0) {
      this.speed = -2; // Velocidade do inimigo do tipo 0
    }
    if (this.type === 1 || this.type === 2) {
      this.speed = 1; // Velocidade do inimigo do tipo 1 e 2
    }
    this.offset = 10; // Deslocamento em relação à posição inicial
    this.top = -this.delay; // Posição vertical inicial do inimigo
    this.initialLeft = ((width / 2) - ((width / 3) * this.percentLeft)); // Posição horizontal inicial do inimigo
    this.left = this.initialLeft - this.offset; // Posição horizontal ajustada do inimigo
    this.width = 100; // Largura do inimigo
    this.height = 100; // Altura do inimigo
  }

  reset() {
    this.visible = true; // Torna o inimigo visível
    this.top = -this.delay; // Posição vertical inicial do inimigo
    this.left = this.initialLeft - this.offset; // Posição horizontal ajustada do inimigo

    // Outras configurações iniciais do inimigo
    if (this.type === 3 || this.type === 4) {
      this.speed = 1; // Velocidade do inimigo do tipo 3 e 4
    }
    if (this.type === 0) {
      this.speed = -2; // Velocidade do inimigo do tipo 0
    }
    if (this.type === 1 || this.type === 2) {
      this.speed = 1; // Velocidade do inimigo do tipo 1 e 2
    }

    // Reposicione outras propriedades conforme necessário

    this.visible = true; // Torna o inimigo visível novamente
  }

  draw() {
    if (this.visible) {
      this.show(); // Exibe o inimigo na tela
      this.move(); // Move o inimigo
      if (this.colliding()) {
        if (this.type !== 3 || this.type !== 4) {
          this.Game.Car.control = false; // Desativa o controle do carro temporariamente
          setTimeout(function(car) {
            car.control = true; // Reativa o controle do carro após 500ms
          }, 500, this.Game.Car);
        }
      }
    }
  }

  colliding() {
    const precision = 0.5; // Precisão da colisão
    let collision = false; // Indica se houve colisão

    if (this.type !== 5) {
      // Verifica colisão entre o inimigo e o carro usando a função collideRectRect() da biblioteca p5.js
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
      this.Game.Enemy = this; // Define o inimigo atual como o inimigo colidido pelo carro
    }

    // Verifica o tipo de colisão e realiza ações específicas para cada tipo
    if (collision && this.type === 0) {
      this.Game.Score.subtractPoints(); // Subtrai pontos do jogo
      this.visible = false; // Torna o inimigo invisível
    }

    if (collision && this.type === 1) {
      this.Game.Score.subtractPoints(); // Subtrai pontos do jogo
      this.visible = false; // Torna o inimigo invisível
    }

    if (collision && this.type === 2) {
      this.Game.Score.subtractPoints(); // Subtrai pontos do jogo
      this.visible = false; // Torna o inimigo invisível
    }

    if (collision && this.type === 3) {
      collision = false; // Desativa a colisão temporariamente
      this.bonus(); // Realiza ação de bônus
      this.Game.Score.addPoints(); // Adiciona pontos ao jogo
    }

    if (collision && this.type === 4) {
      collision = false; // Desativa a colisão temporariamente
      this.bonus(); // Realiza ação de bônus
      this.Game.Score.addSeconds(); // Adiciona segundos ao jogo
    }

    return collision; // Retorna se houve colisão
  }

  show() {
    image(this.image, this.left, this.top, this.width, this.height); // Exibe a imagem do inimigo na tela
  }

  move() {
    this.top += this.Game.Track.speed - this.speed; // Move o inimigo verticalmente com base na velocidade da pista e na sua própria velocidade
    if (this.top > height) {
      this.overtake(); // Inimigo ultrapassou o limite inferior da tela
    }
    if (this.top > height * 0.25) {
      if (this.type === 1 && this.left > this.Game.Car.limitLeft + 3) {
        this.left--; // Move o inimigo do tipo 1 para a esquerda
      }
      if (this.type === 2 && this.left < this.Game.Car.limitRight - 3) {
        this.left++; // Move o inimigo do tipo 2 para a direita
      }
    }
  }

  overtake() {
    this.visible = false; // Torna o inimigo invisível
    if (this.type !== 3 || this.type !== 4) {
      this.Game.overtake(); // Executa a ação de ultrapassagem no jogo
    }
  }

  bonus() {
    this.visible = false; // Torna o inimigo invisível
    this.top = -height; // Reposiciona o inimigo acima da tela
  }
}