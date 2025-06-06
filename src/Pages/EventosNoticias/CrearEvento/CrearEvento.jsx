import React, { useState, useRef } from 'react';
import './CrearEvento.css';

const CrearEvento = ({ onSubmissionSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    descripcion: '',
    enlace: '',
    imagen: null,
    imagenId: ''
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'imagen' && files && files[0]) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setShowPreview(true);
      setSelectedFileName(file.name);
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAcceptImage = () => {
    if (previewUrl) {
      const imagenId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setFormData(prevState => ({
        ...prevState,
        imagen: previewUrl,
        imagenId: imagenId
      }));
      setShowPreview(false);
    }
  };

  const handleCancelImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setShowPreview(false);
    setSelectedFileName('');
    setFormData(prevState => ({
      ...prevState,
      imagen: null,
      imagenId: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit reached');

    if (showPreview) {
      console.log("Please accept or cancel the image preview first.");
      alert("Por favor, acepta o cancela la vista previa de la imagen antes de enviar.");
      return;
    }
    
    if (!formData.imagen || !formData.imagenId) {
        alert("Por favor, selecciona y acepta una imagen.");
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('fecha', formData.fecha);
    formDataToSend.append('descripcion', formData.descripcion);
    
    if (formData.enlace) {
        formDataToSend.append('enlace', formData.enlace);
    }
    
    formDataToSend.append('imagen', formData.imagen.file); 
    formDataToSend.append('imagenId', formData.imagenId);

    console.log('Datos del evento a crear:', formData);
    
    try {
      const response = await fetch('http://localhost:5000/api/eventos', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Evento creado exitosamente:', result);
      alert('Evento creado exitosamente: ' + formData.titulo);
      
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }

      console.log('Clearing form');
      if (formData.imagen && formData.imagen.previewUrl) {
          URL.revokeObjectURL(formData.imagen.previewUrl);
      }

      setFormData({
        titulo: '',
        fecha: '',
        descripcion: '',
        enlace: '',
        imagen: null,
        imagenId: ''
      });
      setPreviewUrl(null);
      setShowPreview(false);
      setSelectedFileName('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error('Error al crear evento:', error);
      alert('Error al crear evento: ' + error.message);
    }
  };

  return (
    <div className="crear-evento-container">
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit} className="crear-evento-form">
        <div className="form-group">
          <label htmlFor="titulo">Título *:</label>
          <input 
            type="text" 
            id="titulo" 
            name="titulo" 
            value={formData.titulo} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha del Evento *:</label>
          <input 
            type="date" 
            id="fecha" 
            name="fecha" 
            value={formData.fecha} 
            onChange={handleChange} 
            required 
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción (opcional):</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="enlace">Enlace (opcional):</label>
          <input 
            type="url" 
            id="enlace" 
            name="enlace" 
            value={formData.enlace} 
            onChange={handleChange} 
            placeholder="https://ejemplo.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">Imagen *:</label>
          <input 
            ref={fileInputRef}
            type="file" 
            id="imagen" 
            name="imagen" 
            onChange={handleChange} 
            accept="image/*"
            required 
          />
          <div className="custom-file-input" onClick={() => fileInputRef.current.click()}>
            <span className="file-button-text">
              {selectedFileName ? "Archivo Seleccionado" : "Seleccionar archivo"}
            </span>
            {selectedFileName && (
              <span className="file-name-display">{selectedFileName}</span>
            )}
          </div>
          {formData.imagenId && !showPreview && (
            <small className="imagen-id">ID de la imagen: {formData.imagenId}</small>
          )}
          {showPreview && previewUrl && (
            <div className="imagen-preview-container">
              <div className="imagen-preview">
                <img src={previewUrl} alt="Vista previa" />
              </div>
              <div className="preview-buttons">
                <button type="button" onClick={handleAcceptImage} className="accept-button">
                  Aceptar
                </button>
                <button type="button" onClick={handleCancelImage} className="cancel-button">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="submit-button">Crear Evento</button>
      </form>
    </div>
  );
};

export default CrearEvento;
