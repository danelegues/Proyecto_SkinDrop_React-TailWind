import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones del frontend
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setError(t('profile.passwordModal.errors.allRequired'));
      return;
    }

    if (passwords.new.length < 6) {
      setError(t('profile.passwordModal.errors.tooShort'));
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setError(t('profile.passwordModal.errors.noMatch'));
      return;
    }

    try {
      await onSave({
        current_password: passwords.current,
        password: passwords.new,
        password_confirmation: passwords.confirm
      });
      
      setPasswords({ current: '', new: '', confirm: '' });
      setError('');
    } catch (error) {
      // Usar la clave de traducción que viene del backend
      setError(t(error.message));
    }
  };

  const handleChange = (field) => (e) => {
    setError(''); // Limpiar error cuando el usuario empieza a escribir
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <h2 className="text-white text-xl font-bold mb-4">
          {t('profile.passwordModal.title')}
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded">
              {error}
            </div>
          )}
          
          <input 
            type="password"
            value={passwords.current}
            onChange={handleChange('current')}
            placeholder={t('profile.passwordModal.currentPassword')}
            className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded border border-gray-600 focus:border-[#ff6b00] focus:outline-none"
          />
          
          <input 
            type="password"
            value={passwords.new}
            onChange={handleChange('new')}
            placeholder={t('profile.passwordModal.newPassword')}
            className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded border border-gray-600 focus:border-[#ff6b00] focus:outline-none"
          />
          
          <input 
            type="password"
            value={passwords.confirm}
            onChange={handleChange('confirm')}
            placeholder={t('profile.passwordModal.confirmPassword')}
            className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded border border-gray-600 focus:border-[#ff6b00] focus:outline-none"
          />
          
          <div className="flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#ff6b00] text-white p-2 rounded-lg hover:bg-[#ff8533] transition-colors"
            >
              {t('profile.passwordModal.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
