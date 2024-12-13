import React from 'react';
import { useTranslation } from 'react-i18next';
import ProfileHeader from './components/ProfileHeader';
import ProfileOptions from './components/ProfileOptions';
import EditProfileModal from './components/EditProfileModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import { useProfile } from './hooks/useProfile';


const Perfil = () => {
  const { t } = useTranslation();
  const {
    isEditModalOpen,
    isPasswordModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleLogout,
    handleSaveProfile,
    handleChangePassword
  } = useProfile();

  return (
    <div className="flex justify-center min-h-screen bg-[#222] pt-28 pb-32">
      <div className="w-full max-w-4xl mx-4">
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#141414] rounded-2xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
          {/* Banner decorativo */}
          <div className="h-32 bg-[#1a1a1a]"></div>
          
          {/* Contenido principal */}
          <div className="px-8 pb-8 -mt-16">
            <ProfileHeader />
            
            {/* Estadísticas del usuario */}
            <div className="grid grid-cols-3 gap-4 mb-8 mt-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">24</div>
                <div className="text-gray-400 text-sm">{t('profile.stats.trades')}</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">156</div>
                <div className="text-gray-400 text-sm">{t('profile.stats.items')}</div>
              </div>
              <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] text-center">
                <div className="text-2xl font-bold text-[#ff6b00]">$2.5K</div>
                <div className="text-gray-400 text-sm">{t('profile.stats.value')}</div>
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
        onSave={handleSaveProfile}
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
