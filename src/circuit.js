class Circuit {
  
  constructor(game) {
    this.Game = game;
    this.enemies = [];
    this.currentEnemy = 0;
    this.map = [
      [0, 0, 100],
      [1, 0.25, 101],
      [2, 0.5, 102],
      [3, -0.25, 102],
      [0, 0.3, 110],
      [1, -0.25, 112],
      [2, 0.6, 114],
      [1, 0.25, 120],
      [2, 0.65, 121],
      [3, 0.25, 127],
      [0, -0.5, 130],
      [1, 0, 130],
      [0, -0.20, 130],
      [1, 0.20, 131],
      [0, 0.33, 133],
      [1, 0, 135],
      [0, -0.6, 140],
      [3, -0.25, 140],
      [2, 0.35, 141],
      [1, 0.45, 142],
      [2, 0, 144],
      [2, 0.25, 145],
      [1, 0.5, 148],
      [0, -0.25, 149],
      [1, 0.3, 150],
      [1, -0.25, 150],
      [0, 0.6, 150],
      [0, 0.25, 152],
      [2, 0.65, 155],
      [1, 0.25, 156],
      [3, -0.5, 158],
      [1, 0, 160],
      [0, -0.20, 161],
      [2, 0.20, 162],
      [1, 0.33, 166],
      [2, 0, 166],
      [1, -0.6, 166],
      [1, -0.25, 168],
      [3, 0.35, 169],
      [1, 0.45, 170],
      [1, 0, 171],
      [2, 0.25, 172],
      [2, 0.5, 173],
      [0, -0.25, 173],
      [1, 0.3, 173],
      [2, -0.25, 174],
      [0, 0.6, 175],
      [2, 0.25, 175],
      [2, 0.65, 176],
      [1, 0.25, 177],
      [0, -0.5, 178],
      [3, 0, 179],
      [1, -0.20, 180],
      [0, 0.20, 180],
      [2, 0.33, 180],
      [1, -0.16, 184],
      [0, -0.25, 186],
      [1, 0.35, 188],
      [0, 0.42, 188],
      [0, 0, 188],
      [1, 0.25, 188],
      [1, 0.5, 194],
      [0, -0.25, 195],
      [2, 0.32, 196],
      [0, 0.65, 200],
      [2, 0.25, 200],
      [1, -0.5, 200],
      [2, 0, 201],
      [0, -0.20, 202],
      [3, 0.10, 203],
      [2, 0.33, 204],
      [2, 0, 205],
      [0, -0.26, 205],
      [1, -0.25, 205],
      [0, 0.25, 205],
      [2, 0.45, 210],
    ];
  }

  draw() {
    for (let i=0; i<this.enemies.length; i++) {
      this.enemies[i].draw();
    }
  }
  
  addEnemy() {
    if (this.currentEnemy < this.map.length) {
      let enemy = new Enemy(this.Game, this.map[this.currentEnemy][0], this.map[this.currentEnemy][1], this.map[this.currentEnemy][2]);
      enemy.setup();
      this.enemies.push(enemy);
      this.currentEnemy++;
    }
  }

  
  
  

}