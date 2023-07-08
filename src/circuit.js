class Circuit {
  constructor(game) {
    this.Game = game; // Referência ao objeto Game
    this.enemies = []; // Array para armazenar os inimigos
    this.currentEnemy = 0; // Índice do próximo inimigo a ser adicionado
    this.map = []; // Mapa que define o tipo, posição horizontal e vertical dos inimigos

    // Gera o mapa de inimigos aleatoriamente
    while (true) {
      const type = Math.random() < 0.2 ? Math.floor(Math.random() * 2) + 3 : Math.floor(Math.random() * 3); // 20% de chance para tipos 3 e 4, e 80% de chance para tipos 0, 1 e 2
      const horizontal = Math.random() * 1.2 - 0.6; // Valores entre -0.6 e 0.6
      const vertical = Math.floor(Math.random() * 111) + 100; // Valores entre 100 e 210
      this.map.push([type, horizontal, vertical]);

      if (this.map.length >= 100) {
        break; // Encerra o loop após gerar 100 valores aleatórios
      }
    }
  }

  draw() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.draw(); // Desenha o inimigo na tela

      if (enemy.y > canvas.height) {
        // Remove o inimigo se estiver abaixo da parte inferior da tela
        this.enemies.splice(i, 1);
        i--;
      }
    }

    const maxEnemies = 10 + Math.floor(this.Game.points / 10); // Determina o número máximo de inimigos com base nos pontos do jogo
    while (this.enemies.length < maxEnemies) {
      this.addEnemy(); // Adiciona novos inimigos até atingir o máximo
    }
  }

  addEnemy() {
    if (this.currentEnemy >= this.map.length) {
      this.currentEnemy = 0; // Reinicia o índice quando alcançar o final da matriz de mapa
    }

    const enemy = new Enemy(
      this.Game,
      this.map[this.currentEnemy][0], // Tipo do inimigo definido pelo mapa
      this.map[this.currentEnemy][1], // Posição horizontal do inimigo definida pelo mapa
      this.map[this.currentEnemy][2]  // Posição vertical do inimigo definida pelo mapa
    );
    enemy.setup(); // Configura o inimigo
    this.enemies.push(enemy); // Adiciona o inimigo ao array de inimigos
    this.currentEnemy++; // Incrementa o índice do próximo inimigo a ser adicionado
  }
}