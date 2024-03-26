import { useEffect, useRef, useState } from 'react';

import Ball from '../Ball';
import ballsCollide from '../auxiliaryFunctions/ballsCollide';
import push from '../auxiliaryFunctions/push';
import { type IPushVector } from '../types/types';

type UseCanvas = () => (
  {
    showColorMenu: boolean;
    setShowColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
    modalCoordinates: {
      x: number;
      y: number;
    };
    currentBall: Ball | null;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | undefined>;
  }
)

export const useCanvas: UseCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [currentBall, setCurrentBall] = useState<Ball | null>(null);
  const [modalCoordinates, setModalCoordinates] = useState({ x: 0, y: 0 });

  const ballKinds = [
    { radius: 28, color: 'black' },
    { radius: 20, color: '#000080' },
    { radius: 30, color: '#065535' },
    { radius: 36, color: '#509d98' },
    { radius: 25, color: '#a94010' },
    { radius: 55, color: '#668f25' },
    { radius: 19, color: '#934946' },
    { radius: 38, color: '#6897bb' },
    { radius: 60, color: '#963c58' },
    { radius: 45, color: '#653e87' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context: CanvasRenderingContext2D | null = canvas?.getContext('2d');

    const balls: Ball[] = ballKinds.map(({ radius, color }, i) => {
      const position = i < 5
        ? { x: canvas.width / 6 * (i + 1), y: canvas.height / 3 }
        : { x: canvas.width / 6 * (i - 4), y: canvas.height / 3 * 2 };
      return new Ball(context, canvas, position, radius, color);
    });

    const pushVector: IPushVector = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    };

    let mouseFlag = 0;

    const handleMouseDown = (event: MouseEvent): void => {
      balls.forEach((ball) => {
        if (ball.circle && context?.isPointInPath(ball.circle, event.offsetX, event.offsetY)) {
          setCurrentBall(ball);
          pushVector.x1 = event.clientX;
          pushVector.y1 = event.clientY;
        }
      });
      setShowColorMenu(false);
      mouseFlag = 0;
    };

    const handleMouseMove = (): void => {
      mouseFlag = 1;
    };

    const handleMouseUp = (event: MouseEvent): void => {
      if (mouseFlag === 0) {
        if (pushVector.x1 && pushVector.y1) {
          setShowColorMenu(true);
          setModalCoordinates({ x: event.offsetX, y: event.offsetY });
        }
        pushVector.x1 = 0;
        pushVector.x2 = 0;
        pushVector.y1 = 0;
        pushVector.y2 = 0;
      } else {
        pushVector.x2 = event.offsetX;
        pushVector.y2 = event.offsetY;
        balls.forEach((ball) => {
          if (ball.circle && context?.isPointInPath(ball.circle, pushVector.x1, pushVector.y1)) {
            push(ball, pushVector);
          }
        });
      }
    };

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    const animate = (): void => {
      requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      balls.forEach((ball) => {
        ball.draw();
        ball.move();
        ballsCollide(ball, balls);
      });
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  return { showColorMenu, setShowColorMenu, modalCoordinates, currentBall, canvasRef };
};
