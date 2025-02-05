import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SellModal from '../SellModal';
import { marketService } from '../../../Tienda/hooks/marketService';

const InventoryItem = ({ item, onStatusChange }) => {
    const { t } = useTranslation();
    const [showSellModal, setShowSellModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(item.status);
    
    // Desestructuramos el item que viene del backend
    const { item: itemDetails, wear, status } = item;
    // Verificamos que itemDetails exista y tenga las propiedades necesarias
    const { name, image, price } = itemDetails || {};

    const getImageUrl = (imageUrl) => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }
        return `${process.env.PUBLIC_URL}/${imageUrl}`;
    };
   
    const getWearColor = (wear) => {
        const colors = {
            'Factory New': 'text-blue-400',
            'Minimal Wear': 'text-purple-400',
            'Field-Tested': 'text-yellow-400',
            'Well-Worn': 'text-orange-400',
            'Battle-Scarred': 'text-red-400'
        };
        return colors[wear] || 'text-gray-400';
    };

    const getStatusText = (status) => {
        switch(status) {
            case 'on_sale':
                return t('store.sales.onSale');
            case 'locked':
                return t('inventory.status.locked');
            default:
                return t('store.sales.putOnSale');
        }
    };

    const handleSellClick = () => {
        setShowSellModal(true);
    };

    const handleSellConfirm = (price) => {
        onStatusChange?.(item.id, 'on_sale');
        setShowSellModal(false);
    };

    const handleButtonClick = () => {
        if (item.status === 'on_sale') {
            handleRemoveFromMarket();
        } else {
            setShowSellModal(true);
        }
    };

    const handleRemoveFromMarket = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await marketService.removeFromMarket(item.id);
            if (response.success) {
                // Actualizar estado inmediatamente
                onStatusChange(item.id, 'available');
            }
        } catch (error) {
            console.error('Error removing item from market:', error);
            setError(error.message || t('inventory.errors.removeFromMarketError'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSell = async (price) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await marketService.addToMarket(item.id, price);
            if (response.success) {
                // Actualizar estado inmediatamente
                onStatusChange(item.id, 'on_sale');
                setShowSellModal(false);
            }
        } catch (error) {
            console.error('Error selling item:', error);
            setError(error.message || t('inventory.errors.sellError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-lg overflow-hidden group border border-transparent hover:border-[#ff6b00]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6b00]/20">
                <div className="relative">
                    <div className="bg-[#141414] p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
                        {item.image ? (
                            <img 
                                src={getImageUrl(item.image)}
                                alt={name || 'Item image'}
                                className="max-w-full max-h-full object-contain group-hover:scale-110 group-hover:rotate-1"
                                style={{ maxHeight: '180px', width: 'auto' }}
                                onError={(e) => {
                                    console.error('Error loading image:', item.image);
                                    e.target.src = `${process.env.PUBLIC_URL}/img/default.png`;
                                }}
                            />
                        ) : (
                            <div className="text-gray-500">No image available</div>
                        )}
                    </div>
                    {currentStatus === 'on_sale' && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                            {t('inventory.status.onSale')}
                        </span>
                    )}
                </div>
                <div className="p-5">
                    <div className="flex flex-col items-start justify-between mb-1">
                        <h3 className="text-xl  text-white truncate flex-1" title={item.name}>{item.name}</h3>
                        
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`text-sm ${getWearColor(wear)} font-medium`}>{wear}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-green-500 font-bold text-sm ml-2">{Number(item.price).toFixed(2)}€</span>
                    </div>
                    <button 
                        className={`w-full py-2.5 rounded-lg font-medium
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            ${item.status === 'locked' 
                                ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                                : item.status === 'on_sale'
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-gradient-to-r from-[#ff6b00] to-[#ff8533] text-white hover:shadow-lg hover:shadow-[#ff6b00]/25 hover:scale-[1.02] active:scale-95'}`}
                        disabled={item.status === 'locked' || isLoading}
                        onClick={handleButtonClick}
                    >
                        {isLoading 
                            ? t('common.loading')
                            : item.status === 'on_sale' 
                                ? t('inventory.item.removeFromMarket')
                                : t('inventory.item.sell')
                        }
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2 px-2">{error}</p>
                    )}
                </div>
            </div>

            {showSellModal && (
                <SellModal
                    isOpen={showSellModal}
                    onClose={() => setShowSellModal(false)}
                    onSell={handleSell}
                    item={item}
                />
            )}
        </>
    );
};

export default InventoryItem;