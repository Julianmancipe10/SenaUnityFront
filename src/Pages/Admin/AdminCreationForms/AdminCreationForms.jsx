import React, { useState } from 'react';
import CrearEvento from '../../EventosNoticias/CrearEvento/CrearEvento';
import CrearNoticia from '../../EventosNoticias/CrearNoticia/CrearNoticia';
import './AdminCreationForms.css';

const AdminCreationForms = () => {
  const [formType, setFormType] = useState('evento'); // Estado para controlar qué formulario mostrar

  return (
    <div className="admin-creation-forms-container">
      <h1>Crear Contenido</h1>
      <div className="form-switcher">
        <button 
          className={`switcher-button ${formType === 'evento' ? 'active' : ''}`}
          onClick={() => setFormType('evento')}
        >
          Crear Evento
        </button>
        <button 
          className={`switcher-button ${formType === 'noticia' ? 'active' : ''}`}
          onClick={() => setFormType('noticia')}
        >
          Crear Noticia
        </button>
      </div>

      <div className="form-content">
        {formType === 'evento' ? <CrearEvento /> : <CrearNoticia />}
      </div>
    </div>
  );
};

export default AdminCreationForms; 