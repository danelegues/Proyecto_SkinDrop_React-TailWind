import React from 'react';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../hooks/useProfile';

const ProfileHeader = () => {
  const { t } = useTranslation();
  const { profileData, loading, error } = useProfile();
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  // Formatear la fecha de manera segura
  const formatMemberSince = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).getFullYear();
    } catch (e) {
      console.error('Error formateando fecha:', e);
      return 'N/A';
    }
  };
  
  return (
    <div className="flex items-center gap-6">
      <div className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] bg-[#2a2a2a] flex items-center justify-center shadow-xl relative">
        <i className="fas fa-user text-5xl text-gray-400"></i>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {profileData?.username || 'Usuario'}
        </h1>
        <p className="text-gray-400 mb-2">
          {t('profile.memberSince', { 
            year: formatMemberSince(profileData?.member_since)
          })}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;