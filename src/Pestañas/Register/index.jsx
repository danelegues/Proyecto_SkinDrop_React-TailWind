import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_URL from '../../config/config.js'; 


function Register() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = t('authRL.register.errors.usernameRequired');
    }
    
    if (!formData.email) {
      newErrors.email = t('authRL.register.errors.emailRequired');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = t('authRL.register.errors.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('authRL.register.errors.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('authRL.register.errors.passwordLength');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('authRL.register.errors.passwordsNoMatch');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(`${API_URL}/api/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        });

        if (response.data) {
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          
          alert("¡Registro exitoso! Por favor, revisa tu email para verificar tu cuenta.");
          
          setTimeout(() => {
            navigate('/login');
          }, 1500);
        }
        
      } catch (error) {
        console.error('Error completo:', error);
        
        if (error.name === 'NetworkError' || error.message === 'Network Error') {
          setErrors({ 
            general: t('authRL.register.errors.networkError') 
          });
          
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          
        } else if (error.response) {
          if (error.response.status === 422) {
            const serverErrors = error.response.data.errors;
            const formattedErrors = {};
            
            Object.keys(serverErrors).forEach(key => {
              formattedErrors[key] = serverErrors[key][0];
            });
            
            setErrors(formattedErrors);
          } else {
            setErrors({ 
              general: t('authRL.register.errors.registerError')
            });
          }
        } else {
          setErrors({ 
            general: t('authRL.register.errors.connectionError')
          });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#333] p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {t('authRL.register.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
          {t('authRL.register.subtitle')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              {t('authRL.register.username')}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={t('authRL.register.usernamePlaceholder')}
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              {t('authRL.register.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder={t('authRL.register.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              {t('authRL.register.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              {t('authRL.register.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              {t('authRL.register.submitButton')}
            </button>
          </div>
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
        </form>

        <div className="flex flex-col space-y-4 mt-6">
          <div className="text-center text-sm">
            <span className="text-gray-400">{t('authRL.register.hasAccount')} </span>
            <Link to="/login" className="text-orange-500 hover:text-orange-400 font-medium">
            {t('authRL.register.loginLink')}
            </Link>
          </div>
          <Link 
            to="/" 
            className="text-center text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            {t('authRL.register.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;