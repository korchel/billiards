import React from 'react';

import Canvas from "./components/Canvas.tsx";

const App = () => {
  return (
    <Canvas height={window.innerHeight} width={window.innerWidth} />
  );
};

export default App;
