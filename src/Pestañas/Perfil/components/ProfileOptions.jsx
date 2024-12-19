import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileOptions = ({ onEditClick, onPasswordClick, onLogoutClick }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <button 
        onClick={onEditClick}
        className="profile-button"
      >
        <i className="fas fa-user-edit"></i>
        {t('profile.options.editProfile')}
      </button>
        <br />
      <button 
        onClick={onPasswordClick}
        className="profile-button"
      >
        <i className="fas fa-key"></i>
        {t('profile.options.changePassword')}
      </button>
    <br />
      <button 
        onClick={onLogoutClick}
        className="profile-button"
      >
        <i className="fas fa-sign-out-alt"></i>
        {t('profile.options.logout')}
      </button>
    </div>
  );
};

export default ProfileOptions;
