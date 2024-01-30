// components/ColorPicker.js
import React from 'react';

const ColorPicker = ({ onSelectColor } : {onSelectColor : any}) => {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  return (
    <div>
      <p>Select background color:</p>
      <div>
        {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, width: '30px', height: '30px', marginRight: '5px' }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
