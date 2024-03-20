const ColorMenu = ({ball, modalCoordinates, setCurrentBall}) => {
  const handleChange = (event) => {
    ball.color = event.target.value;
  };
  const { x, y } = modalCoordinates;
  return (
    <div className="" style={{position: 'fixed', top: `${y}px`, left: `${x}px`}}>
      <input type="color" onChange={handleChange} />
      <button onClick={()=> setCurrentBall(null)}></button>
    </div>
  );
};

export default ColorMenu;