function ShopNav({ currentTab, onTabChange }) {
  return (
    <nav className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-4 mb-8 mt-8">
      <div 
        className={`bg-[#1a1a1a] p-4 sm:p-6 rounded-lg flex items-center cursor-pointer min-h-[80px] ${
          currentTab === 'market' ? 'border-2 border-[#ff6b00]' : 'hover:bg-[#2a2a2a]'
        }`}
        onClick={() => onTabChange('market')}
      >
        <div className="flex flex-col flex-1 items-center">
          <span className="text-white text-sm sm:text-base">MERCADO</span>
          <span className="text-[#ff6b00] text-lg sm:text-2xl font-bold">ONLINE</span>
        </div>
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
        </svg>
      </div>

      <div 
        className={`bg-[#1a1a1a] p-4 sm:p-6 rounded-lg flex items-center cursor-pointer min-h-[80px] ${
          currentTab === 'skindrop' ? 'border-2 border-[#ff6b00]' : 'hover:bg-[#2a2a2a]'
        }`}
        onClick={() => onTabChange('skindrop')}
      >
        <div className="flex flex-col flex-1 items-center">
          <span className="text-white text-sm sm:text-base">MERCADO</span>
          <span className="text-[#ff6b00] text-lg sm:text-2xl font-bold">SkinDrop</span>
        </div>
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/>
        </svg>
      </div>

      <div 
        className={`bg-[#1a1a1a] p-4 sm:p-6 rounded-lg flex items-center cursor-pointer min-h-[80px] ${
          currentTab === 'sales' ? 'border-2 border-[#ff6b00]' : 'hover:bg-[#2a2a2a]'
        }`}
        onClick={() => onTabChange('sales')}
      >
        <div className="flex flex-col flex-1 items-center">
          <span className="text-white text-sm sm:text-base">TUS</span>
          <span className="text-[#ff6b00] text-lg sm:text-2xl font-bold">VENTAS</span>
        </div>
        <div className="bg-[#2a2a2a] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
          <span className="text-white text-base sm:text-lg">1</span>
        </div>
      </div>
    </nav>
  );
}

export default ShopNav;
