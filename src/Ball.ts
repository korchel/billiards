import { type ISpeed, type IPosition } from './types/types';

class Ball {
  public speed: ISpeed;
  public mass: number;
  public elasticity: number;
  public friction: number;
  public circle: Path2D | null;

  constructor (
    public context: CanvasRenderingContext2D,
    public canvas: HTMLCanvasElement,
    public position: IPosition,
    public radius: number,
    public color: string,
  ) {
    this.canvas = canvas;
    this.context = context;
    this.color = color;
    this.position = position;
    this.radius = radius;
    this.speed = { x: 0, y: 0 };
    this.mass = this.radius;
    this.elasticity = 0.9;
    this.friction = 0.005;
    this.circle = null;
  }

  draw (): void {
    this.circle = new Path2D();
    this.circle.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill(this.circle);
  }

  move (): void {
    this.speed.x = this.speed.x - this.speed.x * this.friction;
    this.speed.y = this.speed.y - this.speed.y * this.friction;

    this.position.x = this.position.x + this.speed.x;
    this.position.y = this.position.y + this.speed.y;

    if (this.position.x + this.speed.x > this.canvas.width - this.radius ||
    this.position.x + this.speed.x < this.radius) {
      this.speed.x = -this.speed.x * this.elasticity;
    }
    if (this.position.y + this.speed.y > this.canvas.height - this.radius ||
      this.position.y + this.speed.y < this.radius) {
      this.speed.y = -this.speed.y * this.elasticity;
    }
  }
};

export default Ball;
