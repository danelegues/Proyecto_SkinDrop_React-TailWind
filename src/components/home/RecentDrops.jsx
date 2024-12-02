import React from 'react';

const RecentDrops = () => {
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
    <div className="bg-[#141414] rounded-lg p-4 sm:p-6">
      <p className="text-white text-lg sm:text-xl mb-3 sm:mb-4">Últimos Drops</p>
      <div className="space-y-3 sm:space-y-4">
        {drops.map((drop) => (
          <DropItem key={drop.id} drop={drop} />
        ))}
      </div>
    </div>
  );
};

const DropItem = ({ drop }) => {
  return (
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
  );
};

export default RecentDrops;
