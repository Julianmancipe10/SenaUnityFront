import React, { useState } from 'react';
import CrearEvento from '../../EventosNoticias/CrearEvento/CrearEvento';
import CrearNoticia from '../../EventosNoticias/CrearNoticia/CrearNoticia';
import FAQChat from '../../../components/FAQChat.jsx';
import { useNavigate } from 'react-router-dom';
import './AdminCreationForms.css';

const AdminCreationForms = () => {
  const [formType, setFormType] = useState('evento'); // Estado para controlar qué formulario mostrar
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false); // New state to track submission success
  const navigate = useNavigate();

  // Function to call when submission is successful
  const handleSubmissionSuccess = () => {
    setSubmissionSuccessful(true);
    navigate('/SoloEventoNoticia');
  };

  return (
    <div className="admin-creation-forms-container">
      <h1>Crear Contenido</h1>
      {/* We always show the forms unless navigating away on success */}
      <>
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
          {formType === 'evento' ? 
            <CrearEvento onSubmissionSuccess={handleSubmissionSuccess} /> : 
            <CrearNoticia onSubmissionSuccess={handleSubmissionSuccess} />
          }
        </div>
      </>
    </div>
  );
};

export default AdminCreationForms; 