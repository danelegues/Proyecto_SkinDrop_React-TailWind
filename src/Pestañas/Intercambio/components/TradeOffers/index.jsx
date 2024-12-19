import React from 'react';
import { useTranslation } from 'react-i18next';

const MOCK_OFFERS = [
  {
    id: 1,
    from: "trader2",
    timestamp: "2024-03-14T15:30:00",
    status: "pending",
    theirItems: [
      {
        id: 201,
        name: "Karambit | Doppler",
        wear: "Factory New",
        price: 1200.00,
        image: "karambitbluegem.png"
      }
    ],
    yourItems: [
      {
        id: 301,
        name: "M4A4 | Howl",
        wear: "Minimal Wear",
        price: 1150.00,
        image: "m4a4.png"
      }
    ]
  }
];

const TradeOffers = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-48">
      <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 text-center  rounded-md mb-8">
        {t('trade.tradeOffers.title')}
      </h2>
      
      <div className="space-y-4 sm:space-y-6">
        {MOCK_OFFERS.map((offer) => {
          const theirTotal = offer.theirItems.reduce((sum, item) => sum + item.price, 0);
          const yourTotal = offer.yourItems.reduce((sum, item) => sum + item.price, 0);
          const difference = theirTotal - yourTotal;

          return (
            <div 
              key={offer.id}
              className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {t('trade.tradeOffers.offer.from')} {offer.from}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {new Date(offer.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('trade.tradeOffers.offer.theirItems')}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {offer.theirItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-[#2a2a2a] aspect-[3/4] rounded-lg p-2 sm:p-4 flex flex-col transition-transform transform hover:scale-105"
                      >
                        <div className="flex-1 flex items-center justify-center">
                          <img 
                            src={`/img/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-xs sm:text-sm font-medium truncate">{item.name}</h5>
                          <p className="text-[#ff6b00] text-xs sm:text-sm">{item.price.toFixed(2)}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {t('trade.tradeOffers.offer.yourItems')}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {offer.yourItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-[#2a2a2a] aspect-[3/4] rounded-lg p-2 sm:p-4 flex flex-col transition-transform transform hover:scale-105"
                      >
                        <div className="flex-1 flex items-center justify-center">
                          <img 
                            src={`/img/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-xs sm:text-sm font-medium truncate">{item.name}</h5>
                          <p className="text-[#ff6b00] text-xs sm:text-sm">{item.price.toFixed(2)}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-white text-sm sm:text-base text-center">
                <p>{t('trade.tradeOffers.offer.totalTheirs')} {theirTotal.toFixed(2)}€</p>
                <p>{t('trade.tradeOffers.offer.totalYours')} {yourTotal.toFixed(2)}€</p>
                <p className={difference > 0 ? 'text-green-500' : 'text-red-500'}>
                  {t('trade.tradeOffers.offer.difference')} {Math.abs(difference).toFixed(2)}€
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <button className="flex-1 sm:flex-none bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-green-700 transition-all shadow-md mr-2">
                  {t('trade.tradeOffers.offer.accept')}
                </button>
                <button className="flex-1 sm:flex-none bg-red-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-red-700 transition-all shadow-md">
                  {t('trade.tradeOffers.offer.reject')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="bg-[#2a2a2a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#3a3a3a] transition-all flex items-center gap-2 text-sm sm:text-base shadow-md"
        >
          <i className="fas fa-arrow-left"></i>
          {t('trade.tradeOffers.backToSearch')}
        </button>
      </div>
    </div>
  );
};

export default TradeOffers;