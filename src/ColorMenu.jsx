const ColorMenu = ({ball, modalCoordinates, setShowColorMenu}) => {
  const handleChange = (event) => {
    ball.color = event.target.value;
  };
  const { x, y } = modalCoordinates;
  return (
    <div className="" style={{position: 'fixed', top: `${y}px`, left: `${x}px`}}>
      <input type="color" onChange={handleChange} />
      <button onClick={()=> setShowColorMenu(false)}></button>
    </div>
  );
};

export default ColorMenu;