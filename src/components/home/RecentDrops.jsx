import React from 'react';

const RecentDrops = ({ onBoxClick }) => {
  // Datos de ejemplo para los últimos drops
  const drops = [
    {
      id: 1,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 2,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 3,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    },
    {
      id: 4,
      name: "AWP | Dragon Lore",
      price: "1,500.00",
      image: "/img/dragonlore.png"
    }
  ];

  return (
    <div className="drops-grid">
      {drops.map((drop) => (
        <div 
          key={drop.id} 
          className="drop-item"
          onClick={() => onBoxClick(drop)}
        >
          <div className="flex items-center bg-white bg-opacity-5 rounded-lg p-2 sm:p-3 hover:bg-opacity-10 transition-all duration-300">
            <img 
              src={drop.image} 
              alt={drop.name} 
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
            />
            <div className="ml-3 sm:ml-4 flex-1">
              <p className="text-white text-sm sm:text-base">{drop.name}</p>
              <p className="text-orange-500 text-xs sm:text-sm">${drop.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentDrops;
