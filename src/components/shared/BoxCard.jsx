import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/BoxCard.css';

const BoxCard = ({ box }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 w-full box-card-hover">
      {/* Imagen de la caja */}
      <div className="w-full h-48 flex items-center justify-center mt-4 box-image-container">
        <img 
          src={box.image} 
          alt={box.name} 
          className="h-full object-contain max-w-[180px] box-image"
          loading="lazy"
        />
      </div>

      {/* Información de la caja */}
      <div className="p-4 box-info">
        <div className="text-gray-400 text-sm sm:text-base">{box.name}</div>
        <h3 className="text-white text-lg font-bold">{box.price.toFixed(2)}€</h3>
      </div>
    </div>
  );
};

BoxCard.propTypes = {
  box: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

// Componente contenedor para la sección de cajas
export const BoxSection = ({ title, boxes, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Separador con título */}
      <div className="col-span-full flex items-center justify-center my-4 sm:my-6 title-separator">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[100px] opacity-60"></div>
        <h2 className="text-orange-500 text-xl uppercase font-bold mx-3 animate-glow">{title}</h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[100px] opacity-60"></div>
      </div>

      {/* Grid de cajas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {boxes.map((box) => (
          <BoxCard key={box.id} box={box} />
        ))}
      </div>
    </div>
  );
};

BoxSection.propTypes = {
  title: PropTypes.string.isRequired,
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired
};

// Ejemplo de uso:
export const BoxesContainer = () => {
  const popularBoxes = [
    {
      id: 1,
      name: 'Caja Premium',
      price: 4.99,
      image: '/img/CAJA 4_preview_rev_1.png'
    },
    {
      id: 2,
      name: 'Caja Premium',
      price: 4.99,
      image: '/img/descarga (3)-fotor-bg-remover-202410031336.png'
    },
    {
      id: 3,
      name: 'Caja Premium',
      price: 4.99,
      image: '/img/descarga-fotor-bg-remover-2024100313334.png'
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      <BoxSection 
        title="Cajas más vendidas" 
        boxes={popularBoxes} 
        className="animate-fade-in"
      />
    </div>
  );
};

export default BoxCard;
