import React from 'react';

// Mock data para las ofertas
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
        image: "karambitdoppler.png"
      }
    ],
    yourItems: [
      {
        id: 301,
        name: "M4A4 | Howl",
        wear: "Minimal Wear",
        price: 1150.00,
        image: "m4howl.png"
      }
    ]
  },
  // Puedes añadir más ofertas aquí
];

const TradeOffers = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Ofertas Pendientes</h2>
        <button
          onClick={onBack}
          className="bg-[#2a2a2a] text-white px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-all flex items-center gap-2"
        >
          <i className="fas fa-arrow-left"></i>
          Volver a búsqueda
        </button>
      </div>
      
      <div className="space-y-4">
        {MOCK_OFFERS.map((offer) => {
          const theirTotal = offer.theirItems.reduce((sum, item) => sum + item.price, 0);
          const yourTotal = offer.yourItems.reduce((sum, item) => sum + item.price, 0);
          const difference = theirTotal - yourTotal;

          return (
            <div 
              key={offer.id}
              className="bg-[#1a1a1a] rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">
                    Oferta de {offer.from}
                  </h3>
                  <p className="text-gray-400">
                    {new Date(offer.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all">
                    Aceptar
                  </button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all">
                    Rechazar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Sus items:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {offer.theirItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-[#2a2a2a] aspect-[3/4] rounded-lg p-4 flex flex-col"
                      >
                        <div className="flex-1 flex items-center justify-center">
                          <img 
                            src={`/img/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-sm font-medium truncate">{item.name}</h5>
                          <p className="text-[#ff6b00] text-sm">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">Tus items:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {offer.yourItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-[#2a2a2a] aspect-[3/4] rounded-lg p-4 flex flex-col"
                      >
                        <div className="flex-1 flex items-center justify-center">
                          <img 
                            src={`/img/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h5 className="text-white text-sm font-medium truncate">{item.name}</h5>
                          <p className="text-[#ff6b00] text-sm">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-white">
                <p>Total de sus items: ${theirTotal.toFixed(2)}</p>
                <p>Total de tus items: ${yourTotal.toFixed(2)}</p>
                <p className={difference > 0 ? 'text-green-500' : 'text-red-500'}>
                  Diferencia: ${Math.abs(difference).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TradeOffers;