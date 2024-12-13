import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditProfileModal = ({ isOpen, onClose, onSave }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username });
    setUsername('');
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
          {t('profile.editModal.title')}
        </h2>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t('profile.editModal.username')}
            className="w-full p-2 mb-4 bg-[#2a2a2a] text-white rounded"
          />
          
          <button 
            type="submit"
            className="w-full bg-[#ff6b00] text-white p-2 rounded-lg hover:bg-[#ff8533] transition-colors"
          >
            {t('profile.editModal.save')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
