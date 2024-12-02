import { Header } from '../../components/Header'
import ProductCard from './components/ProductCard'
import { SKINS } from './constants/skins'
import './styles/shop.css'

function Shop() {
  return (
    <div className="shop-page">
      <Header />
      
      <main className="shop-content">
        <div className="shop-subnav">
          <div className="left-section">
            <button className="sort-button">
              <span>ORDENAR POR PRECIO</span>
            </button>
            <div className="search-container">
              <input type="text" placeholder="BUSCAR MERCADO" />
            </div>
          </div>
          <div className="right-section">
            <button className="refresh-button">
              <span>↻</span>
            </button>
          </div>
        </div>

        <div className="products-grid">
          {SKINS.map(skin => (
            <ProductCard key={skin.id} {...skin} />
          ))}
        </div>

        <div className="pagination">
          <button className="prev">←</button>
          <span className="current-page">1</span>
          <button className="next">→</button>
        </div>
      </main>
    </div>
  )
}
