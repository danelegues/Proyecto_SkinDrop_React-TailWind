import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marketService } from '../../../Tienda/hooks/marketService';

const SellModal = ({ isOpen, onClose, item }) => {
    const { t } = useTranslation();
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!price || isNaN(price) || price <= 0) {
            setError(t('inventory.sell.invalidPrice'));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await marketService.putItemOnSale(item.id, parseFloat(price));
            onClose();
            // Opcional: Actualizar el estado del item localmente
            if (item.onStatusChange) {
                item.onStatusChange('on_sale');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al poner el item en venta');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-96">
                <h2 className="text-xl text-white mb-4">{t('inventory.sell.title')}</h2>
                
                <div className="mb-4">
                    <div className="flex items-center justify-center mb-4">
                        <img 
                            src={`img/${item.image}`}
                            alt={item.name}
                            className="max-h-32 object-contain"
                        />
                    </div>
                    <p className="text-white text-center mb-2">{item.name}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2">
                            {t('store.sales.price')}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder={t('store.sales.enterPrice')}
                            className="w-full bg-[#2a2a2a] text-white p-2 rounded"
                            disabled={isLoading}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            disabled={isLoading}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white rounded hover:opacity-90"
                            disabled={isLoading}
                        >
                            {isLoading ? '...' : t('store.sales.putOnSale')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellModal;