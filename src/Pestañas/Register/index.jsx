import React, { useState } from 'react';
import axios from 'axios';

function Register() {
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
      newErrors.username = 'El nombre de usuario es requerido';
    }
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword
        });

        localStorage.setItem('token', response.data.token);
        console.log('Registro exitoso', response.data);
        // Aquí puedes añadir redirección o mensaje de éxito
        
      } catch (error) {
        if (error.response) {
          const serverErrors = error.response.data.errors;
          setErrors(serverErrors);
        } else {
          setErrors({ general: 'Error al conectar con el servidor' });
        }
        console.error('Error en el registro:', error);
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
            Crear nueva cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Únete a la comunidad de SkinDrop
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Nombre de usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Tu nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-500 text-white rounded-lg bg-[#444] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="tu@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
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
                Repetir Contraseña
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
              Registrarse
            </button>
          </div>
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;