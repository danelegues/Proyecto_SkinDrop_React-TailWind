import ProductCard from '../ProductCard';

function ProductGrid({ skins = [] }) {
  console.log('Skins en ProductGrid:', skins); // Debug

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 lg:gap-6 w-full">
      {skins.map((skin, index) => (
        <ProductCard
          key={skin.id || `skin-${index}`}
          price={skin.price}
          name={skin.name || 'Sin nombre'} // Valor por defecto
          image={skin.image_url || skin.image} // Intentar ambas propiedades
          user={skin.user || 'danel'} // Usar el nombre de usuario que vemos en la consola
        />
      ))}
    </div>
  );
}

export default ProductGrid;
