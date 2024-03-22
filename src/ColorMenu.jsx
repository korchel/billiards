const ColorMenu = ({ball, modalCoordinates, setShowColorMenu}) => {
  const handleChange = (event) => {
    ball.color = event.target.value;
  };
  const { x, y } = modalCoordinates;
  return (
    <div className="color-menu" style={{ position: 'fixed', top: `${y}px`, left: `${x}px` }}>
      <div className="menu-header">
          <label htmlFor="color">Pick a color</label>
          <button onClick={()=> setShowColorMenu(false)}>&times;</button>
      </div>

      <input
        id="color"
        type="color"
        onChange={handleChange}
        value={ball.color}
      />
    </div>
  );
};

export default ColorMenu;