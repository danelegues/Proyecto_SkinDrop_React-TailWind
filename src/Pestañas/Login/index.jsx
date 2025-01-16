import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('authRL.login.errors.emailRequired');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = t('authRL.login.errors.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('authRL.login.errors.passwordRequired');
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://10.14.4.197:8001/api/login', {
          email: formData.email,
          password: formData.password,
        });

        if (response.data && response.data.token) {
          login(response.data.token, { ...response.data.user, is_admin: response.data.is_admin });
          navigate('/');
        } else {
          setErrors({ general: t('authRL.login.errors.invalidResponse') });
        }
        
      } catch (error) {
        console.error('Error completo:', error);
        
        if (error.response && error.response.data) {
          // Si el servidor devuelve errores específicos
          if (error.response.data.errors) {
            setErrors(error.response.data.errors);
          } else if (error.response.data.message) {
            // Si el servidor devuelve un mensaje de error general
            setErrors({ general: error.response.data.message });
          } else {
            setErrors({ general: t('authRL.login.errors.loginError') });
          }
        } else if (error.message) {
          // Si hay un error de red o de otro tipo
          setErrors({ general: error.message });
        } else {
          setErrors({ general: t('authRL.login.errors.serverError') });
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
          {t('authRL.login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
          {t('authRL.login.subtitle')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              {t('authRL.login.email')}
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
              {t('authRL.login.password')}
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
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              {t('authRL.login.title')}
            </button>
          </div>
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
        </form>

        <div className="flex flex-col space-y-4 mt-6">
          <div className="text-center text-sm">
            <span className="text-gray-400">{t('authRL.login.noAccount')} </span>
            <Link to="/registro" className="text-orange-500 hover:text-orange-400 font-medium">
            {t('authRL.login.registerLink')}
            </Link>
          </div>
          <Link 
            to="/" 
            className="text-center text-gray-400 hover:text-white text-sm transition-colors duration-200"
          >
            {t('authRL.login.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;