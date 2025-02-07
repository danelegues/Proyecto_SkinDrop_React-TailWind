import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BoxPopup from './BoxPopup.jsx';
import LeftPanel from './LeftPanel'; 
import RightPanel from './RightPanel'; 
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import API_URL from '../../config/config.js'; 

const MainContent = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedBox, setSelectedBox] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [formData, setFormData] = useState({ name: '', image_url: '', price: '', items: [] });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [filters, setFilters] = useState({ boxName: '', priceRange: { min: '', max: '' } });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4x4 grid

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/items`);
        const uniqueItems = response.data.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.name === item.name
          ))
        );
        setItems(uniqueItems);
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

  useEffect(() => {
    if (filters) {
      const filtered = boxes.filter(box => {
        const nameMatch = filters.boxName 
          ? box.name.toLowerCase().includes(filters.boxName.toLowerCase())
          : true;

        const price = parseFloat(box.price);
        const minPrice = filters.priceRange.min ? parseFloat(filters.priceRange.min) : 0;
        const maxPrice = filters.priceRange.max ? parseFloat(filters.priceRange.max) : Infinity;
        
        const priceMatch = filters.priceRange.max
          ? price >= minPrice && price <= maxPrice
          : price >= minPrice;

        return nameMatch && priceMatch;
      });

      setFilteredBoxes(filtered);
    } else {
      setFilteredBoxes(boxes);
    }
  }, [filters, boxes]);

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
    
    if (formData.items.length < 16) {
      newErrors.items = 'Debe seleccionar al menos 16 ítems';
    } else if (formData.items.length > 16) {
      newErrors.items = 'No puede seleccionar más de 16 ítems';
    }
    
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
        console.error('Error adding box:', error.response ? error.response.data : error.message);
        setErrors({ general: 'Hubo un error al añadir la caja. Por favor, inténtalo de nuevo.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleDeleteBox = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/crates/${id}`);
      setBoxes(boxes.filter(box => box.id !== id));
    } catch (error) {
      console.error('Error deleting box:', error.response ? error.response.data : error.message);
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const BoxGrid = ({ title }) => (
    <>
      <div className="col-span-full flex items-center justify-center my-8">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
        <h2 className="text-orange-500 text-2xl uppercase font-bold mx-5">
          {title}
        </h2>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-[200px] opacity-60"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBoxes.map((box) => (
          <div 
            key={box.id} 
            className="bg-[#1a1a1a] rounded-lg p-4 group cursor-pointer"
            onClick={() => setSelectedBox(box)}
          >
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
            {user && user.is_admin && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBox(box.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Eliminar Caja
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const ItemGrid = () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getCurrentPageItems().map(item => (
          <div key={item.id} className="p-4 border border-gray-300 rounded shadow-lg flex flex-col">
            {/* Contenedor de la imagen */}
            <div className="w-full flex justify-center">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-auto h-24 max-h-24 object-contain rounded-md"
              />
            </div>
    
            {/* Contenedor del contenido */}
            <div className="mt-2 flex flex-col gap-1 flex-grow justify-between h-full">
              <div>
                <h3 className="text-lg text-orange-500">{item.name}</h3>
                <p>{item.price}€</p>
                <p>{item.rarity}</p>
                <p>{item.category}</p>
                <p>{item.wear}</p>
              </div>
    
              {/* Contenedor del botón */}
              <button
                type="button"
                onClick={() => handleItemSelect(item.id)}
                className={`p-2 mt-2 rounded transition-all duration-300 ${
                  formData.items.includes(item.id)
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {formData.items.includes(item.id) ? "Deseleccionar Ítem" : "Seleccionar Ítem"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700"
        >
          Anterior
        </button>
        <span className="flex items-center">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-700"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
  
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      <div className="w-full lg:w-1/4 p-4">
      <LeftPanel setFilters={setFilters} />
      </div>
      <div className="w-full lg:w-2/4 p-4">
        <BoxGrid title={t('home.popularBoxes.title')} />
        {/* AdminPanel*/}
        {user && user.is_admin && (
          <div className="mt-8">
          <h2 className="text-xl">Añadir Caja</h2>
          
          
          
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
                  placeholder="Nombre de la Caja"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
        
              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-300">
                  URL de la Imagen
                </label>
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="URL de la Imagen"
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
                <p className="text-sm text-gray-300 mt-2">
                  Ítems seleccionados: <span className="text-orange-500 font-bold">{formData.items.length}</span>/16
                </p>
                {/* ItemGrid aquí */}
                <ItemGrid />
                {errors.items && <p className="text-red-500 text-xs mt-1">{errors.items}</p>}
              </div>
            </div>
        
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                Añadir Caja
              </button>
            </div>
            {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          </form>
        </div>
        
        )}
      </div>
      <div className="w-full lg:w-1/4 p-4">
        <RightPanel />
      </div>
      {selectedBox && (
        <BoxPopup 
          boxData={selectedBox} 
          onClose={() => setSelectedBox(null)}
        />
      )}
    </div>
  );
};

export default MainContent;
