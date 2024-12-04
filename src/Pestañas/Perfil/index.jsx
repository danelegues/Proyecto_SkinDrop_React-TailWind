// Pestañas/Perfil/index.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] mt-16">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-lg mx-4">
        {/* Cabecera del perfil */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-[#2a2a2a] rounded-full flex items-center justify-center">
            <i className="fas fa-user text-4xl text-gray-400"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Usuario123</h1>
            <p className="text-gray-400">Miembro desde 2024</p>
          </div>
        </div>

        {/* Opciones del perfil */}
        <div className="space-y-4">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-4 rounded-lg text-left flex items-center gap-3 transition-colors"
          >
            <i className="fas fa-user-edit text-[#ff6b00]"></i>
            Editar Perfil
          </button>

          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-4 rounded-lg text-left flex items-center gap-3 transition-colors"
          >
            <i className="fas fa-key text-[#ff6b00]"></i>
            Cambiar Contraseña
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white p-4 rounded-lg text-left flex items-center gap-3 transition-colors"
          >
            <i className="fas fa-sign-out-alt text-[#ff6b00]"></i>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Modal para Editar Perfil */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md mx-4 relative">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-white text-xl font-bold mb-4">Editar Perfil</h2>
            <input type="text" placeholder="Nuevo nombre de usuario" className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded" />
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="w-full bg-[#ff6b00] text-white p-2 rounded-lg hover:bg-[#ff8533] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}

      {/* Modal para Cambiar Contraseña */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md mx-4 relative">
            <button 
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-white text-xl font-bold mb-4">Cambiar Contraseña</h2>
            <input type="password" placeholder="Contraseña actual" className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded" />
            <input type="password" placeholder="Nueva contraseña" className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded" />
            <input type="password" placeholder="Confirmar nueva contraseña" className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded" />
            <button 
              onClick={() => setIsPasswordModalOpen(false)}
              className="w-full bg-[#ff6b00] text-white p-2 rounded-lg hover:bg-[#ff8533] transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;