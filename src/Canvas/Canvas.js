import { useEffect, useRef } from "react";
import Ball from '../Ball';



const Canvas = (props) => {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    // call draw function here
    const ball = new Ball(context, canvas);
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.draw()
      ball.move()
      requestAnimationFrame(animate)
    };
    animate();
    
    
  }, []);

  return (
    <canvas ref={ref} {...props} />
  );
};

export default Canvas;