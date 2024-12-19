import React from 'react';

const PopularBoxes = ({ onBoxClick }) => {
  const boxes = [
    {
      id: 1,
      name: "Caja Premium",
      image: "/images/box1.png",
      price: 29.99
    },
    // ... tus otras cajas
  ];

  return (
    <div className="boxes-grid">
      {boxes.map((box) => (
        <div 
          key={box.id} 
          className="box-item"
          onClick={() => onBoxClick(box)}
        >
          {/* Mantén tu estructura actual de la caja */}
          <div className="box-image">
            <img src={box.image} alt={box.name} />
          </div>
          <div className="box-info">
            <h3>{box.name}</h3>
            <p>${box.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularBoxes;
