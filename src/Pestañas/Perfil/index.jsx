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

const Perfil = () => {
  const [inventoryCount, setInventoryCount] = useState(0);

  useEffect(() => {
    const fetchInventoryCount = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://10.14.4.197:8001/api/inventory', {
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

  return (
    <div className="flex justify-center min-h-screen bg-[#222] pt-28 pb-32">
      <div className="w-full max-w-4xl mx-4">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
          <div className="h-32 bg-[#1a1a1a]"></div>
          
          <div className="px-8 pb-8 -mt-16">
            <ProfileHeader />
            
            <div className="grid grid-cols-2 gap-4 mb-8 mt-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">24</div>
                <div className="text-gray-400 text-sm">{t('profile.stats.trades')}</div>
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