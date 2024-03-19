import { useEffect, useRef } from "react";
import Ball from '../Ball';


const Canvas = (props) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    // call draw function here
    const ball1 = new Ball(context, canvas, { x: 100, y: 200 }, { x: 2, y: 3 }, 'red');
    const ball2 = new Ball(context, canvas, { x: 100, y: 400 }, { x: 2, y: 3 }, 'black');
    const ball3 = new Ball(context, canvas, {x: 100, y: 400}, {x: 2, y: 3}, 'black');
    const animate = () => {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)
      ball1.draw()
      ball2.draw()
      ball1.move()
      ball2.move()
      if (Ball.getDistance(ball1.position, ball2.position) < ball1.radius + ball2.radius) {
        ball1.speed.x = -ball1.speed.x
        ball1.speed.y = -ball1.speed.y
        ball2.speed.x = -ball2.speed.x
        ball2.speed.y = -ball2.speed.y
      }
    };
    animate();
  }, []);

  return (
    <canvas ref={ref} {...props} />
  );
};

export default Canvas;