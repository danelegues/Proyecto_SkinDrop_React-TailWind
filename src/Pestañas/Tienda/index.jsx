import Navbar from '../../components/layout/Navbar'
import ProductCard from './components/ProductCard'
import { SKINS } from './constants/skins'
import './styles/shop.css'

function Shop() {
  return (
    <div className="shop-page">
      <main className="shop-content">
        {SKINS.map(skin => (
          <ProductCard 
            key={skin.id}
            name={skin.name}
            price={skin.price}
            image={skin.image}
            user={skin.user}
          />
        ))}
      </main>
    </div>
  )
}

export default Shop
