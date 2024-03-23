import React, { useEffect, useRef, useState } from "react";

import Ball from '../Ball.ts';
import ColorMenu from "./ColorMenu.jsx";
import ballsCollide from "../auxiliaryFunctions/ballsCollide.ts";
import push from "../auxiliaryFunctions/push.ts";
import { IPushVector } from '../types/types.ts';

const ballKinds = [
  {radius: 28, color: '#f6546a'},
  {radius: 20, color: '#000080'},
  {radius: 30, color: '#065535'},
  {radius: 36, color: '#509d98'},
  {radius: 25, color: '#a94010'},
  {radius: 55, color: '#668f25'},
  {radius: 19, color: '#934946'},
  {radius: 38, color: '#6897bb'},
  {radius: 60, color: '#963c58'},
  {radius: 45, color: '#653e87'},
];

const Canvas = (props) => {
  const ref = useRef<HTMLCanvasElement>();
  const [showColorMenu, setShowColorMenu] = useState(false)
  const [currentBall, setCurrentBall] = useState<Ball | null>(null);
  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement;
    const context: CanvasRenderingContext2D | null  = canvas?.getContext('2d');

    const pushVector: IPushVector = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    };
  
    let mouseFlag = 0;
    if (context) {
      const balls: Ball[] = ballKinds.map(({ radius, color }, i) => {
        const position = i < 5
          ? { x: canvas.width / 6 * (i + 1), y: canvas.height / 3 }
          : { x: canvas.width / 6 * (i - 4), y: canvas.height / 3 * 2 };
        return new Ball(context, canvas, position, radius, color);
      });

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      })

      canvas.addEventListener('mousedown', (event) => {
      balls.forEach((ball) => {
        if (context.isPointInPath(ball.circle, event.offsetX, event.offsetY)) {
          setCurrentBall(ball);
          pushVector.x1 = event.clientX;
          pushVector.y1 = event.clientY;
        }
      });
      mouseFlag = 0;
      });
      canvas.addEventListener('mousemove', () => {
        mouseFlag = 1;
      });
      canvas.addEventListener('mouseup', (event) => {
        if (mouseFlag === 0) {
          balls.forEach((ball) => {
            if (context.isPointInPath(ball.circle, event.offsetX, event.offsetY)) {
              setShowColorMenu(true)
              setModalCoordinates({ x: event.offsetX, y: event.offsetY });
            }
          });
          pushVector.x1 = 0;
          pushVector.x2 = 0;
          pushVector.y1 = 0;
          pushVector.y2 = 0;
        } else {
          if (pushVector.x1 && pushVector.y1) {
            pushVector.x2 = event.offsetX;
            pushVector.y2 = event.offsetY;
            balls.forEach((ball) => {
              if (context.isPointInPath(ball.circle, pushVector.x1, pushVector.y1)) {
                push(ball, pushVector);
              }
            });
          }
        }
      });
      const animate = () => {
        requestAnimationFrame(animate)
        context.clearRect(0, 0, canvas.width, canvas.height)
        balls.forEach((ball) => {
          ball.draw();
          ball.move();
          ballsCollide(ball, balls);
        });
      };
      animate();
    }
  }, []);

  return (
    <>
      <canvas ref={ref} {...props} />
      {showColorMenu && <ColorMenu ball={currentBall} modalCoordinates={modalCoordinates} setShowColorMenu={setShowColorMenu} />}
    </>
  );
};

export default Canvas;