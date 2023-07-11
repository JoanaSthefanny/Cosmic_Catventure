class Score {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.seconds = 60; // Tempo inicial em segundos
    this.points = 0; // Pontuação inicial
    this.timeoutOn = false; // Flag para controlar o timeout
    this.intervalId = null; // Inicializa como nulo
  }

  preload() {
    // Nenhum carregamento necessário
  }


  start() {
    this.intervalId = setInterval(() => {
      this.seconds--; // Decrementa o tempo a cada segundo
    }, 1000);
  }



  draw() {
    if (this.Game.started) {
      this.showSeconds(); // Exibe o tempo restante
      this.showPoints(); // Exibe a pontuação atual
      if (this.seconds <= 0) {
        this.gameOver(); // Encerra o jogo se o tempo acabar
      }
    } else {
      this.opening(); // Exibe a tela de abertura antes de iniciar o jogo
    }
    
  }

  reset() {
    this.seconds = 60; // Reinicia o tempo restante para o valor inicial
    this.points = 0; // Reinicia a pontuação para o valor inicial
    this.timeoutOn = false; // Flag para controlar o timeout
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  showSeconds() { // conta os segundos
    const timeDisplay = document.getElementById('time-display');
    timeDisplay.textContent = `${this.seconds}`;
  }

  showPoints() { // conta o tempo
    const pointsDisplay = document.getElementById('points-display')
    pointsDisplay.textContent = `${this.points}`;
  }

  opening() {
    textAlign(CENTER);
    fill('#fff');
    textSize(40);
    textFont('pixel');
    text('Cosmic CatVenture', width / 2, height / 2 - 50); // Título do jogo

    // adiciona uma imagem mostrando as teclas utilizadas para manusear o jogo
    const imagemContainer = document.createElement('div');
    imagemContainer.style.position = 'absolute';
    imagemContainer.id = 'imagem-container'; // Adiciona o ID ao container
    imagemContainer.style.top = `${height / 2 - 250}px`;
    imagemContainer.style.left = '50%';
    imagemContainer.style.transform = 'translateX(-50%)';
    
    const imagem = document.createElement('img');
    imagem.src = 'img/setas.png';
    imagem.id = 'setas-image';


    imagemContainer.appendChild(imagem);
    document.body.appendChild(imagemContainer);

    
  }

  hideImage() { // retira a imagem das teclas de utilização quando o jogo inicia
    const image = document.getElementById('imagem-container');
    if (image) {
      image.parentNode.removeChild(image); // remove a imagem
    }
  }
  
  gameOver() {
    textAlign(CENTER);
    fill('#ed1c24');
    textSize(50);
    text('GAME OVER!', width / 2, height / 2); // Mensagem de "GAME OVER!"
    textSize(20);
    fill('#fff');
    text(`Pontuação: ${this.Game.Score.points}`, width / 2, height / 2 + 40);   

    this.Game.over(); // Encerra o jogo  
  }

  
  addPoints() {
    this.points = this.points + 10; // Adiciona 10 pontos à pontuação atual
  }

  subtractPoints() {
    this.points = this.points - 5; // Subtrai 5 pontos da pontuação atual
  }

  addSeconds() {
    this.seconds = this.seconds + 10; // Adiciona 10 segundos ao tempo restante
  }
}
