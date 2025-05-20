import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="/default-avatar.png" alt="Avatar" />
          </div>
          <div className="profile-details">
            <div className="detail-group">
              <label>Nombre:</label>
              <input type="text" placeholder="Tu nombre" />
            </div>
            <div className="detail-group">
              <label>Apellido:</label>
              <input type="text" placeholder="Tu apellido" />
            </div>
            <div className="detail-group">
              <label>Correo:</label>
              <input type="email" placeholder="Tu correo" />
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="save-button">Guardar Cambios</button>
          <button className="cancel-button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 