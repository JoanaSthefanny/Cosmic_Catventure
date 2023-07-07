class Circuit {
  constructor(game) {
    this.Game = game;
    this.enemies = [];
    this.currentEnemy = 0;
    this.map = [];

    while (true) {
      const type = Math.random() < 0.2 ? Math.floor(Math.random() * 2) + 3 : Math.floor(Math.random() * 3); // 20% de chance para tipos 3 e 4, e 80% de chance para tipos 0, 1 e 2
      const horizontal = Math.random() * 1.2 - 0.6; // Valores entre -0.6 e 0.6
      const vertical = Math.floor(Math.random() * 111) + 100; // Valores entre 100 e 210
      this.map.push([type, horizontal, vertical]);

      if (this.map.length >= 1000) {
        break; // Encerra o loop após gerar 1000 valores aleatórios
      }
    }
  }

  draw() {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      enemy.draw();

      if (enemy.y > canvas.height) {
        // Remove o inimigo se estiver abaixo da parte inferior da tela
        this.enemies.splice(i, 1);
        i--;
      }
    }

    const maxEnemies = 10 + Math.floor(this.Game.points / 10);
    while (this.enemies.length < maxEnemies) {
      this.addEnemy();
    }
  }

  addEnemy() {
    if (this.currentEnemy >= this.map.length) {
      this.currentEnemy = 0; // Reinicia o índice quando alcançar o final da matriz
    }

    const enemy = new Enemy(
      this.Game,
      this.map[this.currentEnemy][0],
      this.map[this.currentEnemy][1],
      this.map[this.currentEnemy][2]
    );
    enemy.setup();
    this.enemies.push(enemy);
    this.currentEnemy++;
  }
}
