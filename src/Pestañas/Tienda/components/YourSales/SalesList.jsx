function SalesList({ sales }) {
  if (!sales || sales.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No tienes ventas activas en este momento
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {sales.map((sale) => (
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
              <p className="text-gray-400">{sale.listedTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#ff6b00] text-xl font-bold">{sale.price}</span>
            <button 
              className="text-red-500 hover:text-red-400"
              onClick={() => sale.onDelete?.(sale.id)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SalesList;
