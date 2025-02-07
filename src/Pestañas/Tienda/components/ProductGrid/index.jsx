import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../ProductCard';
import BuyModal from '../BuyModal';

function ProductGrid({ skins, onRefresh }) {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!skins || skins.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                {t('store.noItems')}
            </div>
        );
    }

    const handleItemClick = (skin) => {
        setSelectedItem(skin);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const handlePurchaseSuccess = () => {
        // Recargar los items después de una compra exitosa
        onRefresh?.();
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                {skins.map((skin) => (
                    <div
                        key={skin.id}
                        className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-lg overflow-hidden cursor-pointer group border border-transparent hover:border-[#ff6b00]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6b00]/20 transition-all duration-300"
                        onClick={() => handleItemClick(skin)}
                    >
                        <div className="bg-[#141414] p-4 aspect-[4/3] flex items-center justify-center overflow-hidden">
                            <img
                                src={skin.image_url}
                                alt={skin.name}
                                className="max-w-full max-h-full object-contain group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300"
                                style={{ maxHeight: '180px', width: 'auto' }}
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-white text-sm font-medium truncate mb-2">
                                {skin.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400 font-medium truncate">
                                    {skin.username || t('store.unknownSeller')}
                                </span>
                                <span className="text-[#ff6b00] font-bold">
                                    {Number(skin.price).toFixed(2)}€
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <BuyModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                item={selectedItem}
                onSuccess={handlePurchaseSuccess}
            />
        </>
    );
}

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

export default ProductGrid;
