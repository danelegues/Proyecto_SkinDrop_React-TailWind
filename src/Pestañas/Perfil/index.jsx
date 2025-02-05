import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileHeader from './components/ProfileHeader';
import ProfileOptions from './components/ProfileOptions';
import EditProfileModal from './components/EditProfileModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import { useProfile } from './hooks/useProfile';
import { useAuth } from '../../components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../config/config.js'; 

const Perfil = () => {
  const [inventoryCount, setInventoryCount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const isAdmin = user && user.is_admin;

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  useEffect(() => {
    const fetchInventoryCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/inventory`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        if (response.data && Array.isArray(response.data.data)) {
          setInventoryCount(response.data.data.length);
        } else {
          console.error('Formato de respuesta inválido:', response.data);
          setInventoryCount(0);
        }
      } catch (error) {
        console.error('Error al obtener el inventario:', error);
        setInventoryCount(0);
      }
    };

    fetchInventoryCount();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });
        setBalance(response.data.user.balance);
      } catch (error) {
        console.error('Error al obtener el balance:', error);
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isAdmin) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json'
            }
          });
          console.log('Usuarios obtenidos:', response.data);
          setUsers(response.data);
        } catch (error) {
          console.error('Error al obtener la lista de usuarios:', error);
        }
      }
    };

    fetchUsers();
  }, [isAdmin]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    profileData,
    isEditModalOpen,
    isPasswordModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleUpdateProfile,
    handleChangePassword
  } = useProfile();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAlta = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/users/${userId}/alta`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, is_active: true } : user));
    } catch (error) {
      console.error('Error al dar de alta al usuario:', error);
    }
  };

  const handleBaja = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/users/${userId}/baja`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, is_active: false } : user));
    } catch (error) {
      console.error('Error al dar de baja al usuario:', error);
    }
  };

  const handleModificacion = async (userId) => {
    const newUsername = prompt("Introduce el nuevo nombre de usuario:");
    if (newUsername) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`${API_URL}/api/users/${userId}/modificar`, { username: newUsername }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error al modificar al usuario:', error);
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center min-h-screen bg-[#222] pt-28 pb-32">
      <div className="w-full max-w-4xl mx-4">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a] mb-4">
          <div className="h-32 bg-[#1a1a1a]"></div>
          
          <div className="px-8 pb-8 -mt-16">
            <ProfileHeader />
            <div className="grid grid-cols-2 gap-4 mb-8 mt-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">
                  {formatBalance(balance)} <i className="fa-solid fa-euro-sign text-orange-500 text-xl opacity-100"></i>
                </div>
                <div className="text-gray-400 text-sm">{t('balance.title')}</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">{inventoryCount}</div>
                <div className="text-gray-400 text-sm">{t('profile.stats.items')}</div>
              </div>
            </div>
            <ProfileOptions 
              onEditClick={handleOpenEditModal}
              onPasswordClick={handleOpenPasswordModal}
              onLogoutClick={handleLogout}
            />
          </div>
        </div>

        <div className="h-4"></div>

        {isAdmin && (
          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
            <div className="px-8 pb-8">
              <h2 className="text-white text-2xl mb-4 mt-4">Lista de Usuarios</h2>
              
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 rounded border border-gray-600 w-full text-black"
              />

              <ul>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <li key={user.id} className="flex justify-between items-center p-4 border-b border-gray-600">
                      <span className="text-gray-400">{user.username}</span>
                      <div className="flex space-x-4">
                        {user.is_active ? (
                          <>
                            <button 
                              onClick={() => handleBaja(user.id)} 
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Baja
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleAlta(user.id)} 
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Alta
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No hay usuarios disponibles.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={(data) => {
          console.log('Llamando a handleUpdateProfile desde el modal con:', data);
          return handleUpdateProfile(data);
        }}
        currentUsername={profileData?.username}
      />

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        onSave={handleChangePassword}
      />
    </div>
  );
};

export default Perfil;