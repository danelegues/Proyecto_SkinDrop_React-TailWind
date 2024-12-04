import ProductCard from '../ProductCard';

function ProductGrid({ skins = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 lg:gap-6 w-full">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded overflow-hidden flex flex-col">
            {/* Área de la imagen */}
            <div className="relative">
              <div className="absolute top-2 left-2 w-16 h-6 bg-gray-700 rounded animate-pulse" />
              <div className="bg-[#1a1a1a] p-2 sm:p-4 aspect-[4/3] flex items-center justify-center">
                <div className="w-full h-full bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            
            {/* Área del nombre y botón */}
            <div className="flex-grow p-2 sm:p-3 flex flex-col bg-[#1a1a1a] gap-2">
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="flex-grow" />
              <div className="h-8 bg-gray-700 rounded animate-pulse" />
            </div>
            
            {/* Área del usuario */}
            <div className="border-t border-gray-700 bg-[#1a1a1a] p-1 sm:p-2 flex items-center justify-center">
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!skins || skins.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No se encontraron skins con los filtros actuales
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 lg:gap-6 w-full">
      {skins.map(skin => (
        <ProductCard
          key={skin.id}
          name={skin.name}
          price={skin.price}
          image={skin.image}
          user={skin.user}
        />
      ))}
    </div>
  );
}

export default ProductGrid;

