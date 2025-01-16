import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//import BoxPopup from '../BoxPopup/BoxPopup';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const MainContent = ({ filters }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({ name: '', image_url: '', price: '', items: [] });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://10.14.4.197:8001/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get('http://10.14.4.197:8001/api/crates');
        setBoxes(response.data.data);
      } catch (error) {
        console.error('Error fetching boxes:', error);
      }
    };

    fetchItems();
    fetchBoxes();
  }, []);

  useEffect(() => {
    if (filters) {
      const filtered = boxes.filter(box => {
        const nameMatch = filters.boxName 
          ? box.name.toLowerCase().includes(filters.boxName.toLowerCase())
          : true;
        
        const price = parseFloat(box.price);
        const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        const priceMatch = price >= minPrice && price <= maxPrice;

        return nameMatch && priceMatch;
      });

      setFilteredBoxes(filtered);
    }
  }, [filters, boxes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemSelect = (itemId) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.includes(itemId)
        ? prev.items.filter(id => id !== itemId)
        : [...prev.items, itemId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://10.14.4.197:8001/api/crates', formData);
        setBoxes([...boxes, response.data.data]);
        setFormData({ name: '', image_url: '', price: '', items: [] });
      } catch (error) {
        setErrors({ general: 'Error al añadir la caja' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDeleteBox = async (id) => {
    try {
      await axios.delete(`http://10.14.4.197:8001/api/crates/${id}`);
      setBoxes(boxes.filter(box => box.id !== id));
    } catch (error) {
      console.error('Error deleting box:', error);
    }
  };

  const handleLeftPanelFilterChange = (filters) => {
    const filtered = boxes.filter(box => {
      // Filtrar por nombre si hay un término de búsqueda
      const nameMatch = filters.boxName 
        ? box.name.toLowerCase().includes(filters.boxName.toLowerCase())
        : true;
      
      // Filtrar por rango de precio
      const price = parseFloat(box.price);
      const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
      const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
      const priceMatch = price >= minPrice && price <= maxPrice;

      return nameMatch && priceMatch;
    });

    setFilteredBoxes(filtered);
  };

  const BoxGrid = ({ title, boxes }) => (
    <>
      <div className="col-span-full flex items-center justify-center my-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
        <h2 className="text-orange-500 text-2xl uppercase font-bold mx-5">
          {title}
        </h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div key={box.id} className="bg-[#1a1a1a] rounded-lg p-4 group cursor-pointer">
            <div className="overflow-hidden">
              <img 
                src={box.image_url} 
                alt={box.name} 
                className="w-full h-48 object-contain transform transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            <div className="text-center">
              <h3 className="text-white text-xl mb-2">{box.name}</h3>
              <p className="text-orange-500 text-2xl font-bold">{box.price}€</p>
            </div>
            {user?.is_admin && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBox(box.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  {t('admin.deleteBoxButton')}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.image_url) {
      newErrors.image_url = 'La URL de la imagen es requerida';
    }
    
    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'El precio debe ser un número positivo';
    }
    
    return newErrors;
  };

  return (
    <div className="flex-1 min-h-0 px-4 lg:px-6">
      <BoxGrid 
        title={t('home.popularBoxes.title')} 
        boxes={filteredBoxes}
      />
      <BoxGrid 
        title={t('home.popularBoxes.bestSellers')} 
        boxes={filteredBoxes}
      />
      
      {user?.is_admin && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('admin.addBox')}</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">URL de la imagen</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700"
                />
                {errors.image_url && <p className="text-red-500 text-sm">{errors.image_url}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Items</label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {items.map(item => (
                    <div 
                      key={item.id}
                      className={`p-2 border rounded cursor-pointer ${
                        formData.items.includes(item.id) ? 'border-orange-500' : 'border-gray-600'
                      }`}
                      onClick={() => handleItemSelect(item.id)}
                    >
                      <img src={item.image_url} alt={item.name} className="w-full h-24 object-contain" />
                      <p className="text-sm text-center mt-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Añadir Caja
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MainContent;
