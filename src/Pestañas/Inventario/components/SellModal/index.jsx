import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SellModal = ({ isOpen, onClose, onSell, item }) => {
    const { t } = useTranslation();
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await onSell(parseFloat(price));
            onClose();
        } catch (error) {
            setError(error.message || t('inventory.errors.sellError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-6 w-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-bold">{t('inventory.sellModal.title')}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2">
                            {t('inventory.sellModal.price')}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full bg-[#2a2a2a] text-white px-4 py-2 rounded-lg pr-8"
                                placeholder="0.00"
                                required
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">€</span>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-400 hover:text-white"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !price}
                            className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t('common.loading') : t('inventory.sellModal.confirm')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellModal;