import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InventoryHeader from '../../Pestañas/Inventario/components/InventoryHeader'; 
import InventoryGrid from '../../Pestañas/Inventario/components/InventoryGrid';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';

const AdminPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({ name: '', image_url: '', price: '', items: [] });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemSelect = (itemId) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: prevFormData.items.includes(itemId)
        ? prevFormData.items.filter((id) => id !== itemId)
        : [...prevFormData.items, itemId],
    }));
  };

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
    
    if (formData.items.length < 6) {
      newErrors.items = 'Debe seleccionar al menos 6 ítems';
    } else if (formData.items.length > 20) {
      newErrors.items = 'No puede seleccionar más de 20 ítems';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://10.14.4.197:8001/api/crates', {
          name: formData.name,
          image_url: formData.image_url,
          price: formData.price,
          items: formData.items,
        });

        setBoxes([...boxes, response.data.data]);
        setFormData({ name: '', image_url: '', price: '', items: [] });
      } catch (error) {
        console.error('Error adding box:', error);
        setErrors({ general: 'Hubo un error al añadir la caja. Por favor, inténtalo de nuevo.' });
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

  const ItemGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
      {items.map(item => (
        <div key={item.id} className="p-4 border border-gray-300 rounded">
          <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover mb-2" />
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p>{item.price}€</p>
          <p>{item.rarity}</p>
          <p>{item.category}</p>
          <p>{item.wear}</p>
          <button
            type="button"
            onClick={() => handleItemSelect(item.id)}
            className={`p-2 mt-2 rounded ${formData.items.includes(item.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {formData.items.includes(item.id) ? t('admin.deselectItemButton') : t('admin.selectItemButton')}
          </button>
        </div>
      ))}
    </div>
  );

  // Verificar si el usuario es administrador
  if (!user || !user.is_admin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-xl font-bold text-red-500">{t('admin.noAccess')}</h2>
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {t('admin.goBack')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
      <div className="flex flex-col gap-2 mb-8">
        <InventoryHeader totalItems={boxes.length} />
        <InventoryGrid items={boxes} />
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('admin.addBox')}</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre de la caja"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-300">
                  URL de la imagen
                </label>
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="URL de la imagen"
                  value={formData.image_url}
                  onChange={handleInputChange}
                />
                {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                  Precio
                </label>
                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Precio"
                  value={formData.price}
                  onChange={handleInputChange}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="items" className="block text-sm font-medium text-gray-300">
                  Ítems
                </label>
                <ItemGrid />
                {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                Añadir caja
              </button>
            </div>
            {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          </form>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('admin.manageBoxes')}</h2>
          <div className="flex flex-col gap-4 mt-4">
            {boxes.map(box => (
              <div key={box.id} className="flex justify-between items-center p-2 border border-gray-300 rounded">
                <span>{box.name}</span>
                <button
                  onClick={() => handleDeleteBox(box.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  {t('admin.deleteBoxButton')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;