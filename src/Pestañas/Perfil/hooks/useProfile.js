import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://10.14.4.197:8001';

export const useProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleUpdateProfile = async (newData) => {
    try {
      const response = await axios.put(`${API_URL}/api/profile/update`, newData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfileData(response.data.user);
      handleCloseEditModal();
      window.location.reload(); // Recargar la página después de actualizar
    } catch (error) {
      setError('Error al actualizar el perfil');
      throw error;
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/api/profile/password`, passwordData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      handleClosePasswordModal();
      window.location.reload();
    } catch (error) {
      let translationKey = 'profile.passwordModal.errors.updateFailed';
      
      // Mapear mensajes de error del backend a claves de traducción
      if (error.response?.data?.errors?.password) {
        const backendError = error.response.data.errors.password[0];
        
        // Mapear cada mensaje de error a su clave de traducción correspondiente
        switch (backendError) {
          case 'The password field must contain at least one uppercase and one lowercase letter.':
            translationKey = 'profile.passwordModal.errors.needsUpperLower';
            break;
          case 'The current password is incorrect.':
            translationKey = 'profile.passwordModal.errors.currentPasswordWrong';
            break;
          case 'The password must be at least 8 characters.':
            translationKey = 'profile.passwordModal.errors.tooShort';
            break;
          case 'The password confirmation does not match.':
            translationKey = 'profile.passwordModal.errors.noMatch';
            break;
          default:
            translationKey = 'profile.passwordModal.errors.updateFailed';
        }
      }
      
      throw new Error(translationKey);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfileData(response.data.user);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el perfil');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return {
    profileData,
    loading,
    error,
    isEditModalOpen,
    isPasswordModalOpen,
    handleCloseEditModal,
    handleOpenEditModal,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleUpdateProfile,
    handleChangePassword
  };
};