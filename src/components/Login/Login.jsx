import React, { useState } from "react";
import "../Login/Login.css";
import { Header } from '../../Layouts/Header/Header';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({
        username: formData.username,
        password: formData.password
      });

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="divmayor">
      <div className="HeaderDiseñoRegistro">
        <Header />
      </div>

      <div className="divPrincipal">
        {/* Sección de Bienvenida */}
        <div className="bienvenida">
          <h1 className="txt-Bienvenido">BIENVENIDO</h1>
          <p className="parrafoBienvenido">
            Llega al SENA, la mejor plataforma de información
          </p>
          <button className="btn-leer">Leer más</button>
        </div>

        {/* Sección del Formulario */}
        <div className="Registro">
          <h2 className="txt-registrarse">Inicia sesión</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="mi-formulario">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />

            <button type="submit" className="btn-IniciarSesion">
              Iniciar sesión
            </button>

            <p className="register-text">
              ¿No tienes cuenta?{" "}
              <Link to="/register" style={{ color: "blue" }}>
                Registrarse
              </Link>
            </p>
          </form>

          {/* Redes Sociales */}
          <div className="redes">
            <span>f</span> <span>G+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
