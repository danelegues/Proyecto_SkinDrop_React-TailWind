import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SalesList from './SalesList';
import NewSaleModal from './NewSaleModal';

function YourSales() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const activeSales = [
    {
      id: 1,
      name: 'Karambit | Blue Gem',
      imageUrl: '/img/karambitbluegem.png',
      price: '1.5M€',
      listedTime: t('store.sales.listedTime', { time: '2 días' }),
      onDelete: (id) => console.log('Eliminar venta:', id)
    }
  ];

  const salesHistory = [
    {
      id: 2,
      name: 'AK-47 | Vulcan',
      imageUrl: '/img/ak47vulcan.png',
      price: '250€',
      soldTime: t('store.sales.soldTime', { time: '5 días' }),
      soldTo: 'user8374'
    }
  ];

  return (
    <div className="mt-8">
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('active')}
              className={`text-lg font-bold ${
                activeTab === 'active' 
                  ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('store.sales.activeSales')}
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`text-lg font-bold ${
                activeTab === 'history' 
                  ? 'text-[#ff6b00] border-b-2 border-[#ff6b00]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('store.sales.salesHistory')}
            </button>
          </div>
          {activeTab === 'active' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#ff6b00] text-white px-6 py-2 rounded-lg hover:bg-[#ff8533]"
            >
              {t('store.sales.newSale')}
            </button>
          )}
        </div>

        {activeTab === 'active' ? (
          <SalesList sales={activeSales} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {salesHistory.map(sale => (
              <div 
                key={sale.id}
                className="bg-[#2a2a2a] rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={sale.imageUrl} 
                    alt={sale.name} 
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="text-white font-bold">{sale.name}</h3>
                    <p className="text-gray-400">{sale.soldTime}</p>
                    <p className="text-gray-400">{t('store.sales.soldTo')} {sale.soldTo}</p>
                  </div>
                </div>
                <span className="text-green-500 text-xl font-bold">{sale.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <NewSaleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log('Nueva venta:', data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default YourSales;
