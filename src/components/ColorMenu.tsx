import React, { type FC, type ChangeEventHandler, type Dispatch, type SetStateAction } from 'react';
import type Ball from '../Ball';

interface IColorMenuProps {
  ball: Ball | null,
  modalCoordinates: {
    x: number;
    y: number;
  },
  setShowColorMenu: Dispatch<SetStateAction<boolean>>,
}

const ColorMenu: FC<IColorMenuProps> = ({ ball, modalCoordinates, setShowColorMenu }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (ball) ball.color = event.target.value;
  };
  const { x, y } = modalCoordinates;
  return (
    <div className="color-menu" style={{ position: 'fixed', top: `${y}px`, left: `${x}px` }}>
      <div className="menu-header">
        <label htmlFor="color">Pick a color</label>
        <button onClick={() => { setShowColorMenu(false); }}>&times;</button>
      </div>

      <input
        id="color"
        type="color"
        onChange={handleChange}
        value={ball?.color}
      />
    </div>
  );
};

export default ColorMenu;
