const collideBalls = (ball1, ball2) => {
      let dx = ball2.position.x - ball1.position.x;
      let dy = ball2.position.y - ball1.position.y;

      let distance = Math.sqrt(dx * dx + dy * dy);

      let normalizedCollisionVector = {x: dx / distance, y:dy / distance}

      let vRelativeVelocity = {x: ball1.speed.x - ball2.speed.x, y:ball1.speed.y - ball2.speed.y};

      let speed = vRelativeVelocity.x * normalizedCollisionVector.x + vRelativeVelocity.y * normalizedCollisionVector.y;

      if(speed < 0) return;
      let impulse = 2 * speed / (ball1.mass + ball2.mass);
     
      ball1.speed.x -= (impulse * ball2.mass * normalizedCollisionVector.x);
      ball1.speed.y -= (impulse * ball2.mass * normalizedCollisionVector.y);
      ball2.speed.x += (impulse * ball1.mass * normalizedCollisionVector.x);
      ball2.speed.y += (impulse * ball1.mass * normalizedCollisionVector.y);
     
      ball1.speed.x = (ball1.speed.x * ball1.elasticity);
      ball1.speed.y = (ball1.speed.y * ball1.elasticity);
      ball2.speed.x = (ball2.speed.x * ball2.elasticity);
      ball2.speed.y = (ball2.speed.y * ball2.elasticity);
}

class Ball {
  constructor(context, canvas, position, radius, color) {
    this.canvas = canvas;
    this.context = context
    this.color = color;
    this.position = position;
    this.radius = radius;
    this.speed = {x: 0, y: 0};
    this.mass = this.radius;
    this.elasticity = 0.9;
    this.friction = 0.005;
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

  ballHitAnotherBall(balls) {

    for (let i = 0; i < balls.length; i += 1) {
      if (this === balls[i]) continue;
      if (this.getDistance(this.position, balls[i].position) < this.radius + balls[i].radius) {
        collideBalls(this, balls[i]);
      }
    }
  }

  push(angle) {
    this.pushAngle = angle;
    this.speed = {x: 4 * Math.cos(this.pushAngle) * 60 / this.mass, y: 4 * Math.sin(this.pushAngle) * 60 / this.mass} 
  }

  move() {
    this.speed.x = this.speed.x - this.speed.x * this.friction;
    this.speed.y = this.speed.y - this.speed.y * this.friction;
  
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x + this.speed.x > this.canvas.width - this.radius ||
    this.position.x + this.speed.x < this.radius) {
      this.speed.x = -this.speed.x * this.elasticity;
    }
    if (this.position.y + this.speed.y > this.canvas.height - this.radius ||
      this.position.y + this.speed.y < this.radius) {
      this.speed.y = -this.speed.y * this.elasticity;
    }

  }
}

export default Ball;