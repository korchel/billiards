import Ball from '../Ball';
import { IPosition } from '../types/types';

const ballHitBall = (ball1: Ball, ball2: Ball): void => {
  const dx = ball2.position.x - ball1.position.x;
  const dy = ball2.position.y - ball1.position.y;
  
  const distance = Math.sqrt(dx * dx + dy * dy);

  const normalizedCollisionVector = { x: dx / distance, y: dy / distance };

  const vRelativeVelocity = { x: ball1.speed.x - ball2.speed.x, y: ball1.speed.y - ball2.speed.y };

  const speed = vRelativeVelocity.x * normalizedCollisionVector.x + vRelativeVelocity.y * normalizedCollisionVector.y;

  if (speed < 0) return;
  const impulse = 2 * speed / (ball1.mass + ball2.mass);
  
  ball1.speed.x -= (impulse * ball2.mass * normalizedCollisionVector.x);
  ball1.speed.y -= (impulse * ball2.mass * normalizedCollisionVector.y)
  ball2.speed.x += (impulse * ball1.mass * normalizedCollisionVector.x);
  ball2.speed.y += (impulse * ball1.mass * normalizedCollisionVector.y);
  
  ball1.speed.x = (ball1.speed.x * ball1.elasticity);
  ball1.speed.y = (ball1.speed.y * ball1.elasticity);
  ball2.speed.x = (ball2.speed.x * ball2.elasticity);
  ball2.speed.y = (ball2.speed.y * ball2.elasticity);
};

const getDistanceBetweenBalls = (pos1: IPosition, pos2: IPosition): number => {
  const x1 = pos1.x;
  const y1 = pos1.y;
  const x2 = pos2.x;
  const y2 = pos2.y;
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
};
  
const ballsCollide = (ball: Ball, balls: Ball[]): void => {
  for (let i = 0; i < balls.length; i += 1) {
    if (ball === balls[i]) continue;
    if (getDistanceBetweenBalls(ball.position, balls[i].position) < ball.radius + balls[i].radius) {
      ballHitBall(ball, balls[i]);
    }
  }
};

export default ballsCollide;