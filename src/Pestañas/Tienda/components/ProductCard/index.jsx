import { useTranslation } from 'react-i18next';
import React from 'react';

function ProductCard({ name = 'Sin nombre', price = 0, image = '/img/default.png', user = 'Desconocido' }) {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-lg overflow-hidden group border border-transparent hover:border-[#ff6b00]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6b00]/20">
      <div className="relative">
        <div className="bg-[#141414] p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
          <img 
            
            src={`${process.env.PUBLIC_URL}${image}`}
            alt={name}
            className="max-w-full max-h-full object-contain group-hover:scale-110 group-hover:rotate-1"
            style={{ maxHeight: '180px', width: 'auto' }}
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl text-white truncate">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-green-500 font-bold">${Number(price).toFixed(2)}</span>
          <span className="text-gray-400 text-sm">{user}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCard);
