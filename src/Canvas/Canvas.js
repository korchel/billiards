import { useEffect, useRef } from "react";
import Ball from '../Ball';


const getPushAngle = (push) => {
  const { x1, x2, y1, y2 } = push;
  return Math.atan2(x2 - x1, y2 - y1);
}

const Canvas = (props) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    const push = {};
    ref.current.addEventListener('mousedown', (event) => {
      push.x1 = event.clientX;
      push.y1 = event.clientY;
    });
    ref.current.addEventListener('mouseup', (event) => {
      push.x2 = event.clientX;
      push.y2 = event.clientY;
    });

    const balls = [];
    for (let i = 0; i < 2; i += 1) {
      if (i < 1) {
        balls.push(new Ball(context, canvas, { x: 200 * (i + 0.5), y: 200 }, 'green'))
      }
      if (i >= 1) {
        balls.push(new Ball(context, canvas, { x: 200 * (i + 0.5), y: 400 }, 'red'))
      }
    };
  
    const animate = () => {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)
      balls.forEach((ball) => {
        ball.draw()
        ball.move(push);
        ball.detectCollision(balls);
      })
    };
    animate();
  }, []);

  return (
    <canvas ref={ref} {...props} />
  );
};

export default Canvas;