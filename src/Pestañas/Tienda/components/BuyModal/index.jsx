import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { marketService } from '../../hooks/marketService';

function BuyModal({ isOpen, onClose, item, onSuccess }) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !item) return null;

    const handleBuy = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            if (!item.id) {
                throw new Error('ID de item no válido');
            }

            const response = await marketService.buyItem(item.id);
            
            if (response.success) {
                onSuccess?.();
                onClose();
            } else {
                throw new Error(response.message || 'Error al comprar el item');
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || t('store.errors.buyError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-bold">{t('store.buyModal.title')}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <img 
                        src={`${process.env.PUBLIC_URL}${item.image_url}`}
                        alt={item.name}
                        className="w-32 h-32 object-contain"
                    />
                    <div>
                        <h3 className="text-white text-lg font-bold">{item.name}</h3>
                        <p className="text-gray-400">{t('store.buyModal.seller')}: {item.user}</p>
                        <p className="text-[#ff6b00] text-xl font-bold mt-2">${Number(item.price).toFixed(2)}</p>
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white"
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleBuy}
                        disabled={isLoading}
                        className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? t('common.loading') : t('store.buyModal.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BuyModal;
