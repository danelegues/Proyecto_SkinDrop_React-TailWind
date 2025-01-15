import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AuthPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = () => {
    onClose();
    setTimeout(() => {
      navigate('/login');
    }, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* Overlay más oscuro */}
      <div className="absolute inset-0 bg-black/90" />
      
      {/* Contenedor del popup */}
      <div className="relative z-[10000] bg-[#222] rounded-xl shadow-xl p-8 max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center">
          <i className="fas fa-lock text-4xl text-orange-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-white mb-4">
            {t('auth.restrictedAccess')}
          </h2>
          <p className="text-gray-300 mb-6">
            {t('auth.loginRequired')}
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors duration-200"
            >
              {t('auth.login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
