import { useEffect, useRef, useState } from "react";
import Ball from '../Ball';
import ColorMenu from "../ColorMenu";


const getPushAngle = (push) => {
  const { x1, x2, y1, y2 } = push;
  return Math.atan2(x2 - x1, y2 - y1);
}

const Canvas = (props) => {
  const ref = useRef();
  const [currentBall, setCurrentBall] = useState(null);
  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
  
    const balls = [];
    const push = {};
    let flag = 0;

    for (let i = 0; i < 2; i += 1) {
      if (i < 1) {
        balls.push(new Ball(context, canvas, { x: 200 * (i + 0.5), y: 200 }, 'green'))
      }
      if (i >= 1) {
        balls.push(new Ball(context, canvas, { x: 200 * (i + 0.5), y: 400 }, 'red'))
      }
    };

    ref.current.addEventListener('mousedown', (event) => {
      console.log(event)
      push.x1 = event.clientX;
      push.y1 = event.clientY;
      flag = 0
    });
    ref.current.addEventListener('mousemove', (event) => {
      push.x2 = event.clientX;
      push.y2 = event.clientY;
      flag = 1;
    });
    ref.current.addEventListener('mouseup', (event) => {
      if (flag === 0) {
        balls.forEach((ball) => {
        if (context.isPointInPath(ball.circle, event.clientX, event.clientY)) {
          setCurrentBall(ball);
          setModalCoordinates({ x: event.clientX, y: event.clientY });
        }
      })
      } else {
        push.x2 = event.clientX;
        push.y2 = event.clientY;
      }
    });

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
    <>
      <canvas ref={ref} {...props} />
      {!!currentBall && <ColorMenu ball={currentBall} modalCoordinates={modalCoordinates} setCurrentBall={setCurrentBall} />}
    </>
    
  );
};

export default Canvas;