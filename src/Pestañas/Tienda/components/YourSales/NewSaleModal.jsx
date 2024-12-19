import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function NewSaleModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [price, setPrice] = useState('');
  const [selectedSkin, setSelectedSkin] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">{t('store.sales.newSale')}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label={t('store.sales.close')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">{t('store.sales.selectSkin')}</label>
            <select 
              value={selectedSkin}
              onChange={(e) => setSelectedSkin(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
            >
              <option value="">{t('store.sales.chooseSkin')}</option>
              {/* Aquí irían las opciones de skins disponibles */}
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">{t('store.sales.price')}</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('store.sales.enterPrice')}
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              {t('store.sales.cancel')}
            </button>
            <button
              onClick={() => {
                onSubmit({ skinId: selectedSkin, price });
                onClose();
              }}
              disabled={!selectedSkin || !price}
              className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('store.sales.putOnSale')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSaleModal;