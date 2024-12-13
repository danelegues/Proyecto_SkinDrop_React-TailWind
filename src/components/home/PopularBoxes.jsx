import { useTranslation } from 'react-i18next';
import BoxCard from '../shared/BoxCard';

const PopularBoxes = () => {
  const { t } = useTranslation();

  // Datos de ejemplo - Esto debería venir de tu API
  const popularBoxes = [
    {
      id: 1,
      name: t('home.popularBoxes.boxNames.premium'),
      price: 4.99,
      image: "/img/CAJA 4_preview_rev_1.png",
      discount: 15,
      rating: 4.5,
      openCount: 12500
    },
    {
      id: 2,
      name: t('home.popularBoxes.boxNames.premium'),
      price: 4.99,
      image: "/img/descarga (3)-fotor-bg-remover-202410031336.png",
      discount: 20,
      rating: 4.8,
      openCount: 8300
    },
    // Añade más cajas según necesites
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            {t('home.popularBoxes.title')}
          </h2>
          <button className="text-orange-500 hover:text-orange-400 transition-colors">
            {t('home.popularBoxes.viewAll')} →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBoxes.map((box) => (
            <BoxCard 
              key={box.id}
              box={box}
              className="transform hover:-translate-y-1 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBoxes;
