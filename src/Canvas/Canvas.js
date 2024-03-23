import { useEffect, useRef, useState } from "react";
import Ball from '../Ball';
import ColorMenu from "../ColorMenu";
import ballsCollide from "../auxiliaryFunctions/ballsCollide";
import push from "../auxiliaryFunctions/push";

const ballKinds = [
  {radius: 28, color: '#f6546a'},
  {radius: 20, color: '#000080'},
  {radius: 30, color: '#065535'},
  {radius: 36, color: '#509d98'},
  {radius: 25, color: '#a94064'},
  {radius: 55, color: '#668f25'},
  {radius: 19, color: '#934946'},
  {radius: 38, color: '#6897bb'},
  {radius: 60, color: '#963c58'},
  {radius: 45, color: '#653e87'},
];

const Canvas = (props) => {
  const ref = useRef();
  const [showColorMenu, setShowColorMenu] = useState(false)
  const [currentBall, setCurrentBall] = useState(null);
  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    const pushVector = {};
    let flag = 0;

    const balls = ballKinds.map(({radius, color}, i) => {
      const position = i < 5 ? { x: 150 * (i + 0.5), y: 260 } : { x: 150 * (i - 5 + 0.5), y: 520 };
      return new Ball(context, canvas, position, radius, color);
    });

    ref.current.addEventListener('mousedown', (event) => {
      balls.forEach((ball) => {
        if (context.isPointInPath(ball.circle, event.clientX, event.clientY)) {
          setCurrentBall(ball);
          pushVector.x1 = event.clientX;
          pushVector.y1 = event.clientY;
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
        if (pushVector.x1 && pushVector.y1) {
          pushVector.x2 = event.clientX;
          pushVector.y2 = event.clientY;
          balls.forEach((ball) => {
            if (context.isPointInPath(ball.circle, pushVector.x1, pushVector.y1)) {
              push(ball, pushVector);
            }
          })   
        }
      }
    });

    const animate = () => {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)
      balls.forEach((ball) => {
        ball.draw()
        ball.move();
        ballsCollide(ball, balls);
      });
    };
    animate();
  }, []);

  return (
    <div className="container">
      <canvas ref={ref} {...props} />
      {showColorMenu && <ColorMenu ball={currentBall} modalCoordinates={modalCoordinates} setShowColorMenu={setShowColorMenu} />}
    </div>
  );
};

export default Canvas;