import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BoxPopup from '../BoxPopup/BoxPopup';

const MainContent = () => {
  const { t } = useTranslation();
  const [selectedBox, setSelectedBox] = useState(null);

  const boxes = [
    {
      id: 1,
      name: t('home.popularBoxes.boxNames.premium'),
      price: 4.99,
      image: "/img/CAJA 4_preview_rev_1.png"
    },
    {
      id: 2,
      name: t('home.popularBoxes.boxNames.premium'),
      price: 4.99,
      image: "/img/descarga (3)-fotor-bg-remover-202410031336.png"
    },
    {
      id: 3,
      name: t('home.popularBoxes.boxNames.premium'),
      price: 4.99,
      image: "/img/descarga-fotor-bg-remover-2024100313334.png"
    }
  ];

  const BoxGrid = ({ title }) => (
    <>
      <div className="col-span-full flex items-center justify-center my-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
        <h2 className="text-orange-500 text-2xl uppercase font-bold mx-5">
          {title}
        </h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div 
            key={box.id} 
            className="bg-[#1a1a1a] rounded-lg p-4 group cursor-pointer"
            onClick={() => setSelectedBox(box)}
          >
            <div className="overflow-hidden">
              <img 
                src={box.image} 
                alt={box.name} 
                className="w-full h-48 object-contain transform transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            <div className="text-center">
              <h3 className="text-white text-xl mb-2">{box.name}</h3>
              <p className="text-orange-500 text-2xl font-bold">{box.price}€</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="flex-1 min-h-0 px-4 lg:px-6">
      <BoxGrid title={t('home.popularBoxes.title')} />
      <BoxGrid title={t('home.popularBoxes.bestSellers')} />
      
      {selectedBox && (
        <BoxPopup 
          boxData={selectedBox} 
          onClose={() => setSelectedBox(null)}
        />
      )}
    </div>
  );
};

export default MainContent;
