
class Ball {
    constructor(context, canvas, position, color) {
      this.canvas = canvas;
      this.context = context
      this.color = color;
      this.position = position;
      this.radius = 100;
      this.speed = {x: 5, y: 5};
      // this.elasticity 
    }

  draw() {
    this.circle = new Path2D();
    this.circle.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill(this.circle);
  }
  getDistance(pos1, pos2) {
    const x1 = pos1.x;
    const y1 = pos1.y;
    const x2 = pos2.x;
    const y2 = pos2.y;
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  }

  detectCollision(balls) {
    for (let i = 0; i < balls.length; i += 1) {
      if (this === balls[i]) continue;
      if (this.getDistance(this.position, balls[i].position) < this.radius + balls[i].radius) {
        console.log('collision!')
      }
    }
  }

  move(push) {
    const { x1 = 0, x2 = 0, y1 = 0, y2 = 0 } = push;
    if (x1 < this.position.x + this.radius
      && x1 > this.position.x - this.radius
      && y1 < this.position.y + this.radius
      && y1 > this.position.y - this.radius
    ) {
      const pushAngle = Math.atan2(x2 - x1, y2 - y1);
      this.position.x += this.speed.x * Math.cos(pushAngle)
      this.position.y += this.speed.y * Math.sin(pushAngle)
    }
    // this.position.x += this.speed.x 
    // this.position.y += this.speed.y 
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
