import { useEffect, useRef, useState } from "react";
import Ball from '../Ball';
import ColorMenu from "../ColorMenu";


const getPushAngle = (push) => {
  const { x1, x2, y1, y2 } = push;
  return Math.atan2( y2 - y1,  x2 - x1);
}

const Canvas = (props) => {
  const ref = useRef();
  const [showColorMenu, setShowColorMenu] = useState(false)
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
      balls.forEach((ball) => {
        if (context.isPointInPath(ball.circle, event.clientX, event.clientY)) {
          setCurrentBall(ball);
          push.x1 = event.clientX;
          push.y1 = event.clientY;
        }
      })
      flag = 0
    });
    ref.current.addEventListener('mousemove', () => {
      flag = 1;
    });
    ref.current.addEventListener('mouseup', (event) => {
      if (flag === 0) {
        balls.forEach((ball) => {
          if (context.isPointInPath(ball.circle, event.clientX, event.clientY)) {
            setShowColorMenu(true)
            setModalCoordinates({ x: event.clientX, y: event.clientY });
          }
        })
      } else {
        if (push.x1 && push.y1) {
          push.x2 = event.clientX;
          push.y2 = event.clientY;
          balls.forEach((ball) => {
            if (context.isPointInPath(ball.circle, push.x1, push.y1)) {
              ball.push(getPushAngle(push));
            }
          })
          // console.log(getPushAngle(push) * 180 / Math.PI)     
        }
      }
    });

    const animate = () => {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)
      balls.forEach((ball) => {
        ball.draw()
        ball.move();
        ball.detectCollision(balls);
      })
    };
    animate();
  }, []);

  return (
    <>
      <canvas ref={ref} {...props} />
      {showColorMenu && <ColorMenu ball={currentBall} modalCoordinates={modalCoordinates} setShowColorMenu={setShowColorMenu} />}
    </>
    
  );
};

export default Canvas;