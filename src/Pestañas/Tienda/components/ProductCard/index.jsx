function ProductCard({ name, price, image, user }) {
  return (
    <div className="product-card bg-gray-800 rounded overflow-hidden">
      <div className="relative">
        <span className="absolute top-2 left-2 text-green-500 font-bold text-lg z-10">
          {price}€
        </span>
        
        <div className="bg-gray-900 p-4">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-32 object-contain"
          />
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        <span className="text-white text-sm block">{name}</span>
        <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-1 px-4 rounded-full text-sm font-medium transition-colors">
          PUJAR
        </button>
      </div>
      
      <div className="border-t border-gray-700 p-2 flex items-center justify-center">
        <span className="text-gray-500 text-xs flex items-center">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          {user}
        </span>
      </div>
    </div>
  )
}

export default ProductCard
