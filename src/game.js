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

    if (!game.started){
        // Adiciona um botão para iniciar o jogo
      const startButtonContainer = document.createElement('div');
      startButtonContainer.id = 'start-button-container'; // Adiciona o ID ao elemento
      startButtonContainer.style.position = 'absolute';
      startButtonContainer.style.top = `${height / 2 + 50}px`; // Define a posição abaixo do texto "Game Over"
      startButtonContainer.style.left = '50%';
      startButtonContainer.style.transform = 'translateX(-50%)';

      const startButton = document.createElement('button');
      startButton.textContent = 'INICIAR';
      startButton.classList.add('start-button'); // Adiciona a classe CSS ao botão

      startButtonContainer.appendChild(startButton);   
      
      document.body.appendChild(startButtonContainer);

      startButton.addEventListener('click', () => {
        game.start(); // Chama a função start do objeto Game ao clicar no botão

      });
    }
    
  }

  start() {

    this.Score.start(); // Inicia a contagem do tempo no Score
    this.started = true; // Atualiza a flag para indicar que o jogo foi iniciado
    setInterval(function(game) {
      game.Circuit.addEnemy(); // Adiciona um novo inimigo ao circuito a cada 1,5 segundos
    }, 1500, this);
    const startButtonContainer = document.getElementById('start-button-container');
    if (startButtonContainer) {
      startButtonContainer.parentNode.removeChild(startButtonContainer);

    }   

  }

  draw() {
    if (this.running) {
      this.Track.draw(); // Desenha o Track
      this.Car.draw(); // Desenha o Car
      this.Score.draw(); // Desenha o Score
     
      if (this.started) {
        this.Circuit.draw(); // Desenha o Circuit se o jogo foi iniciado
        this.Score.hideImage();
      }

    } else {
      noLoop(); 

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

      // Adicione aqui o código para exibir o botão de reinício
      const restartButtonContainer = document.createElement('div');
      restartButtonContainer.id = 'restart-button-container';
      restartButtonContainer.style.position = 'absolute';
      restartButtonContainer.style.top = `${height / 2 + 50}px`;
      restartButtonContainer.style.left = '50%';
      restartButtonContainer.style.transform = 'translateX(-50%)';

      const restartButton = document.createElement('button');
      restartButton.textContent = 'REINICIAR';
      restartButton.classList.add('restart-button');

      restartButton.addEventListener('click', () => {
        game.restart(); // Chama a função reset do objeto Game ao clicar no botão de reinício
        game.start(); // Inicia o jogo novamente após o reinício
      });

      restartButtonContainer.appendChild(restartButton);
      document.body.appendChild(restartButtonContainer);
      // Interrompe o loop de desenho se o jogo não está em execução
    }
  }
  
  over() {
    this.Car.stop(); // Interrompe o carro
    this.running = false; // Atualiza a flag para indicar que o jogo terminou
   
  }

  overtake() {
    this.Score.points++; // Incrementa a contagem de pontos quando ocorre uma ultrapassagem
  }
  restart() {
    // Reinicie o estado do jogo aqui
    this.Track.reset(); // Reinicia a pista
    this.Car.reset(); // Reinicia o carro
    this.Score.reset(); // Reinicia a pontuação e o tempo
    this.Circuit.reset(); // Reinicia os inimigos
    
  
    // Atualiza as flags do jogo
    this.running = true;
    this.started = false;
    
    loop(); // Reinicie o loop de desenho
    
  
    // Remove o botão de reinício da interface
    const restartButtonContainer = document.getElementById('restart-button-container');
    if (restartButtonContainer) {
      restartButtonContainer.parentNode.removeChild(restartButtonContainer);
  }
  

    
  
  }
  
  
  
    
  
  

}

