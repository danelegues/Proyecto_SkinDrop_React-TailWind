import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { skinDropMarketService } from '../../hooks/skinDropMarketService';

function SkinDropBuyModal({ isOpen, onClose, item, onSuccess }) {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !item) return null;

    const handleBuy = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            console.log('Iniciando compra en SkinDrop Market:', item);

            if (!item.id) {
                throw new Error('ID de item no válido');
            }

            const response = await skinDropMarketService.purchaseItem(item.id);
            
            console.log('Respuesta de compra SkinDrop Market:', response);
            
            if (response.success) {
                console.log('Compra exitosa en SkinDrop Market');
                onSuccess?.();
                onClose();
            } else {
                throw new Error(response.message || 'Error al comprar el item');
            }
        } catch (error) {
            console.error('Error en la compra SkinDrop Market:', error);
            setError(error.message || t('store.errors.buyError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-bold">
                        {t('store.skinDropBuyModal.title')}
                    </h2>
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
                        src={item.image_url}
                        alt={item.name}
                        className="w-32 h-32 object-contain"
                    />
                    <div>
                        <h3 className="text-white text-lg font-bold">{item.name}</h3>
                        <p className="text-gray-400">{t('store.skinDropBuyModal.official')}</p>
                        <p className="text-[#ff6b00] text-xl font-bold mt-2">
                            {Number(item.price).toFixed(2)}€
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        disabled={isLoading}
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleBuy}
                        disabled={isLoading}
                        className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {t('common.processing')}
                            </span>
                        ) : t('store.skinDropBuyModal.confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SkinDropBuyModal;
