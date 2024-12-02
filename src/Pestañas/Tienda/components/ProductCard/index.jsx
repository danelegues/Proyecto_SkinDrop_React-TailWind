function ProductCard({ price, name, image, user }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="product-info">
        <span className="price">{price}€</span>
        <span className="name">{name}</span>
        <button className="buy-button">PUJAR</button>
      </div>
      <div className="user-info">
        <span className="user">{user}</span>
      </div>
    </div>
  )
}

export default ProductCard
