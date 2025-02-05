import ProductCard from '../ProductCard';

function ProductGrid({ skins = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 lg:gap-6 w-full">
      {skins.map((listing, index) => {
        return (
          <ProductCard
            key={listing.id || index}
            price={listing.price}
            name={listing.name}
            image={listing.image_url}
            user={listing.username}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
