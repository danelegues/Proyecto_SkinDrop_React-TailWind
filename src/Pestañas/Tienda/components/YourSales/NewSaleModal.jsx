import { useState } from 'react';

function NewSaleModal({ isOpen, onClose, onSubmit }) {
  const [price, setPrice] = useState('');
  const [selectedSkin, setSelectedSkin] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Nueva Venta</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Selecciona el skin</label>
            <select 
              value={selectedSkin}
              onChange={(e) => setSelectedSkin(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
            >
              <option value="">Seleccionar skin...</option>
              <option value="1">Karambit | Blue Gem</option>
              <option value="2">AK-47 | Vulcan</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Precio (€)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Introduce el precio"
              className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onSubmit({ skinId: selectedSkin, price });
                onClose();
              }}
              disabled={!selectedSkin || !price}
              className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Poner a la venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSaleModal;