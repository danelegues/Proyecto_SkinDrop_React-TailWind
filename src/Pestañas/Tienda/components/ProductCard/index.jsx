import { useTranslation } from 'react-i18next';

function ProductCard({ name, price, image, user }) {
  const { t } = useTranslation();

  return (
    <div className="product-card bg-gray-800 rounded overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <span className="absolute top-2 left-2 text-green-500 font-bold text-sm sm:text-base lg:text-lg z-10">
          {price}€
        </span>
        
        <div className="bg-[#1a1a1a] p-2 sm:p-4 aspect-[4/3] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={image} 
              alt={name} 
              className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-110"
              style={{
                maxHeight: '120px',
                width: 'auto'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="flex-grow p-2 sm:p-3 flex flex-col bg-[#1a1a1a]">
        <span className="text-white text-xs sm:text-sm block mb-2 truncate" title={name}>
          {name}
        </span>
        <div className="flex-grow"></div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-1 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300">
          {t('store.product.bid')}
        </button>
      </div>
      
      <div className="border-t border-gray-700 bg-[#1a1a1a] p-1 sm:p-2 flex items-center justify-center">
        <span className="text-gray-500 text-xs flex items-center">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          <span className="truncate max-w-[80px] sm:max-w-[120px]">{user}</span>
        </span>
      </div>
    </div>
  );
}

export default ProductCard
