import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    navigate('/');
  };

  const handleSaveProfile = (data) => {
    // Aquí iría la lógica para guardar el perfil
    console.log('Saving profile:', data);
    handleCloseEditModal();
  };

  const handleChangePassword = (data) => {
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Changing password:', data);
    handleClosePasswordModal();
  };

  return {
    isEditModalOpen,
    isPasswordModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleLogout,
    handleSaveProfile,
    handleChangePassword
  };
};
