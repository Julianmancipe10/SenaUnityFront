import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header';
import '../CrearPerfil/ProfileUser.css';
import { useNavigate } from 'react-router-dom';
import { getAuthHeader } from '../../services/auth';

const ProfileUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    avatar_url: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es muy pesada. Por favor usa una menor a 2 MB");
        return;
      }

      // Convertir la imagen a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          avatar_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      const data = await response.json();
      console.log('Perfil actualizado:', data);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='fondo-Profile'>
      <Header />

      <div className="divPrincipal">
        <div className='profile-image'>
          {formData.avatar_url ? (
            <img src={formData.avatar_url} alt="perfil" />
          ) : (
            <div className='placeholder'>Agregar foto</div>
          )}
          <label className="boton-cargarimagen">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            Seleccionar imagen
          </label>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder='Escribe una breve descripción sobre ti...'
            className='profile-description'
          ></textarea>
        </div>

        <form onSubmit={handleSubmit} className='profile-form'>
          <h2>Crear perfil</h2>

          {error && <div className="error-message">{error}</div>}

          <label>Nombre completo</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder='Nombre completo'
            required
          />

          <button type="submit" className="btn-guardar">
            Guardar perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUser;
