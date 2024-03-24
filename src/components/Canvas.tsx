import React, { type LegacyRef, type FC } from 'react';

import ColorMenu from './ColorMenu';
import { useCanvas } from '../hooks/index';

const Canvas: FC = () => {
  const { showColorMenu, setShowColorMenu, modalCoordinates, currentBall, canvasRef } = useCanvas();
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (
    <>
      <canvas ref={canvasRef as LegacyRef<HTMLCanvasElement> | undefined} height={height} width={width} />
      {showColorMenu && <ColorMenu ball={currentBall} modalCoordinates={modalCoordinates} setShowColorMenu={setShowColorMenu} />}
    </>
  );
};

export default Canvas;
