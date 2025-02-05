import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';

function ProductCard({ name = 'Sin nombre', price = 0, image = '/img/default.png', user = 'Desconocido' }) {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    // Aquí iría la lógica de compra
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-lg overflow-hidden group border border-transparent hover:border-[#ff6b00]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6b00]/20 cursor-pointer"
      >
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
            <span className="text-green-500 font-bold">{Number(price).toFixed(2)}€</span>
            <span className="text-gray-400 text-sm">{user}</span>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-xl max-w-md w-full mx-4 overflow-hidden animate-fadeIn">
            <div className="relative bg-[#141414] p-6">
              <img 
                src={`${process.env.PUBLIC_URL}${image}`}
                alt={name}
                className="max-w-full h-auto mx-auto object-contain"
                style={{ maxHeight: '200px' }}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-white p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl text-white font-bold mb-2">{name}</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-500 text-2xl font-bold">${Number(price).toFixed(2)}</span>
                <span className="text-gray-400">{t('Vendedor')}: {user}</span>
              </div>
              
              <div className="bg-[#0f0f0f] p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 text-gray-300 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('Entrega instantánea')}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>{t('Transacción segura')}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {t('Cancelar')}
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 bg-[#ff6b00] text-white rounded-lg hover:bg-[#ff8533] transition-colors"
                >
                  {t('Comprar ahora')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(ProductCard);
