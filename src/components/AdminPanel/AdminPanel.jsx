import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InventoryGrid from '../../Pestañas/Inventario/components/InventoryGrid';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import API_URL from '../../config/config.js';

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
        const response = await axios.get(`${API_URL}/api/items`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchBoxes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/crates`);
        setBoxes(response.data.data);
      } catch (error) {
        console.error('Error fetching boxes:', error);
      }
    };

    fetchItems();
    fetchBoxes();
  }, []);

  const handleDeleteBox = async (boxId) => {
    try {
      await axios.delete(`${API_URL}/api/crates/${boxId}`);
      setBoxes(boxes.filter(box => box.id !== boxId));
    } catch (error) {
      console.error('Error deleting box:', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = t('admin.nameRequired');
    if (!formData.image_url) newErrors.image_url = t('admin.imageUrlRequired');
    if (!formData.price) newErrors.price = t('admin.priceRequired');
    else if (isNaN(formData.price) || formData.price <= 0) newErrors.price = t('admin.pricePositive');
    if (formData.items.length < 6) newErrors.items = t('admin.itemsMin');
    else if (formData.items.length > 20) newErrors.items = t('admin.itemsMax');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${API_URL}/api/crates`, {
          name: formData.name,
          image_url: formData.image_url,
          price: formData.price,
          items: formData.items,
        });
        setBoxes([...boxes, response.data.data]);
        setFormData({ name: '', image_url: '', price: '', items: [] });
      } catch (error) {
        console.error('Error adding box:', error);
        setErrors({ general: t('admin.addBoxError') });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-28">
      <div className="flex flex-col gap-2 mb-8">
        <InventoryGrid items={boxes} />
        {user.is_admin && (
          <div className="mt-8">
            <h2 className="text-xl font-bold">{t('admin.addBox')}</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    {t('admin.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder={t('admin.nameBox')}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-300">
                    {t('admin.imageURL')}
                  </label>
                  <input
                    id="image_url"
                    name="image_url"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder={t('admin.imageURL')}
                    value={formData.image_url}
                    onChange={handleInputChange}
                  />
                  {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                    {t('admin.price')}
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                    placeholder={t('admin.price')}
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="items" className="block text-sm font-medium text-gray-300">
                    {t('admin.items')}
                  </label>
                  {/* Aquí puedes agregar un componente para seleccionar los ítems */}
                  {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  {t('admin.addBox')}
                </button>
              </div>
              {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
            </form>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold">{t('admin.manageBoxes')}</h2>
          <div className="flex flex-col gap-4 mt-4">
            {boxes.map(box => (
              <div key={box.id} className="flex justify-between items-center p-2 border border-gray-300 rounded">
                <span>{box.name}</span>
                {user.is_admin && (
                  <button
                    onClick={() => handleDeleteBox(box.id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    {t('admin.deleteBoxButton')}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
