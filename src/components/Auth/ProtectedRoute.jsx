import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import AuthPopup from './AuthPopup';

const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      setShowPopup(true);
    }
  }, [isAuth]);

  const handleClose = () => {
    setShowPopup(false);
    navigate('/');
  };

  return (
    <>
      {!isAuth && showPopup && (
        <AuthPopup onClose={handleClose} />
      )}
    </>
  );
};

export default ProtectedRoute;