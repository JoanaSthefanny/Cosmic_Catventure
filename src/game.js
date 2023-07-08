class Game {
  constructor() {
    this.Track = new Track(this); // Instância do objeto Track
    this.Car = new Car(this); // Instância do objeto Car
    this.Score = new Score(this); // Instância do objeto Score
    this.Engine = new Engine(this); // Instância do objeto Engine
    this.Circuit = new Circuit(this); // Instância do objeto Circuit
    this.running = true; // Flag para indicar se o jogo está em execução
    this.started = false; // Flag para indicar se o jogo foi iniciado
  }

  preload() {
    this.Track.preload(); // Pré-carregamento do Track
    this.Car.preload(); // Pré-carregamento do Car
    this.Score.preload(); // Pré-carregamento do Score
  }

  setup() {
    createCanvas(windowWidth, windowHeight); // Criação do canvas com base nas dimensões da janela
    frameRate(50); // Definição da taxa de quadros por segundo
    this.Track.setup(); // Configuração do Track
    this.Car.setup(); // Configuração do Car
  }

  start() {
    this.Score.start(); // Inicia a contagem do tempo no Score
    this.started = true; // Atualiza a flag para indicar que o jogo foi iniciado
    setInterval(function(game) {
      game.Circuit.addEnemy(); // Adiciona um novo inimigo ao circuito a cada 1,5 segundos
    }, 1500, this);
  }

  draw() {
    if (this.running) {
      this.Track.draw(); // Desenha o Track
      this.Car.draw(); // Desenha o Car
      this.Score.draw(); // Desenha o Score
      if (this.started) {
        this.Circuit.draw(); // Desenha o Circuit se o jogo foi iniciado
      }
    } else {
      noLoop(); // Interrompe o loop de desenho se o jogo não está em execução
    }
  }

  over() {
    this.Car.stop(); // Interrompe o carro
    this.running = false; // Atualiza a flag para indicar que o jogo terminou
  }

  overtake() {
    this.Score.points++; // Incrementa a contagem de pontos quando ocorre uma ultrapassagem
  }
}

