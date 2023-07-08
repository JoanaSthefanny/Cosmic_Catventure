class Explosion {
  constructor(car) {
    this.Car = car; // Referência ao objeto Car
  }

  preload() {
    // Pré-carregamento (não há implementação neste exemplo)
  }

  setup() {
    this.width = 100; // Largura da explosão
    this.height = 100; // Altura da explosão
  }

  show() {
    let left = this.Car.left;
    if (left > this.Car.initialLeft) {
      left = left - this.Car.width; // Ajusta a posição à esquerda da explosão se o carro estiver à direita de sua posição inicial
    }
    image(
      this.Car.image,
      left,
      this.Car.top,
      this.width,
      this.height
    ); // Exibe a explosão na posição do carro
  }
}

