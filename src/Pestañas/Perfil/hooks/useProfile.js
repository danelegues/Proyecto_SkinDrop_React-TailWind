import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://10.14.4.197:8001';

export const useProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOpenPasswordModal = () => {
    // Implementar lógica para abrir modal de contraseña
  };

  const handleClosePasswordModal = () => {
    // Implementar lógica para cerrar modal de contraseña
  };

  const handleLogout = () => {
    // Implementar lógica de cierre de sesión
  };

  const handleChangePassword = () => {
    // Implementar lógica de cambio de contraseña
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
    } catch (error) {
      setError('Error al actualizar el perfil');
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
    handleCloseEditModal,
    handleOpenEditModal,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleLogout,
    handleChangePassword,
    handleUpdateProfile
  };
};