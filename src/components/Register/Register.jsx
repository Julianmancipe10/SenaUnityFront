import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../Layouts/Header/Header';
import { registerUser } from '../../services/auth';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <Header />
      <div className="register-form-container">
        <h2>Crear cuenta</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
