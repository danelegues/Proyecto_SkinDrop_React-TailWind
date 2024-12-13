import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/BoxCard.css';
import { useTranslation } from 'react-i18next';

const BoxCard = ({ box, className = '' }) => {
  const { t } = useTranslation();

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all duration-300 ${className}`}>
      {/* Imagen y descuento */}
      <div className="relative">
        <img 
          src={box.image} 
          alt={box.name}
          className="w-full h-48 object-cover"
        />
        {box.discount && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            -{box.discount}%
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2">{box.name}</h3>
        
        {/* Precio y rating */}
        <div className="flex justify-between items-center mb-3">
          <div className="text-orange-500 font-bold">${box.price}</div>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-gray-300 text-sm">{box.rating}</span>
          </div>
        </div>

        {/* Contador de aperturas */}
        <div className="text-gray-400 text-sm">
          {new Intl.NumberFormat().format(box.openCount)} {t('home.popularBoxes.opened')}
        </div>
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
