import React, { useState, useRef } from 'react';
import './CrearEvento.css';

const CrearEvento = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit reached');
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('fecha', formData.fecha);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('enlace', formData.enlace);
    formDataToSend.append('imagen', formData.imagen);
    formDataToSend.append('imagenId', formData.imagenId);

    console.log('Datos del evento a crear:', formData);
    alert('Evento creado (simulado): ' + formData.titulo);
    
    console.log('Clearing form');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
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
