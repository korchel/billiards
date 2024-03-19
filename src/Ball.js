
class Ball {
    constructor(context, canvas, position, speed, color) {
      this.canvas = canvas;
      this.context = context
      this.color = color;
      this.position = position;
      this.radius = 10;
      this.speed = speed;
      // this.elasticity 
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.context.fill();
        this.context.closePath();
    }
  static getDistance(pos1, pos2) {
    const x1 = pos1.x;
    const y1 = pos1.y;
    const x2 = pos2.x;
    const y2 = pos2.y;
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
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
