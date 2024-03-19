
class Ball {
    constructor(context, canvas) {
        this.canvas = canvas;
        this.context = context
        this.color = 'black'
        this.position = {x: 100, y: 200};
        this.radius = 10;
        this.speed = {x: 2, y: 3};
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.context.fill();
        this.context.closePath();
    }

  move() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (this.position.x + this.speed.x > this.canvas.width - this.radius ||
    this.position.x + this.speed.x < this.radius) {
      this.speed.x = -this.speed.x;
    }
    if (this.position.y + this.speed.y > this.canvas.height - this.radius ||
      this.position.y + this.speed.y < this.radius) {
        this.speed.y = -this.speed.y;
      }
  }
}

export default Ball;
