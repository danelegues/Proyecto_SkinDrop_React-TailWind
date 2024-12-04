import ProductCard from '../ProductCard';

function ProductGrid({ skins }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 w-full">
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

