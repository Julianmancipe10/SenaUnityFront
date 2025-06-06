import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header';
import './CrearCarrera.css';

const CrearCarrera = () => {
  const [carrera, setCarrera] = useState({
    titulo: '',
    tipo: '',
    horas: '',
    descripcion: '',
    tituloObtener: '',
    visibleHasta: '' // Nuevo estado para la fecha de fin de visibilidad
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarrera(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validar que la fecha no sea en el pasado (opcional, pero recomendado)
    if (carrera.visibleHasta && new Date(carrera.visibleHasta) < new Date().setHours(0,0,0,0)) {
      setMessage({ type: 'error', text: 'La fecha de fin de visibilidad no puede ser en el pasado.' });
      setLoading(false);
      return;
    }

    try {
      console.log('Nueva carrera:', carrera);
      setMessage({ type: 'success', text: '¡Carrera creada exitosamente!' });
      setCarrera({ 
        titulo: '',
        tipo: '',
        horas: '',
        descripcion: '',
        tituloObtener: '',
        visibleHasta: '' // Limpiar también el nuevo campo
      });
    } catch (error) {
      console.error('Error al crear la carrera:', error);
      setMessage({ type: 'error', text: 'Error al crear la carrera. Inténtalo de nuevo.' });
    }
    setLoading(false);
  };

  return (
    <div className="crear-carrera-page">
      <Header />
      <div className="crear-carrera-container">
        <h2>Crear Nueva Carrera Técnica</h2>
        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit} className="crear-carrera-form">
          <div className="form-group">
            <label htmlFor="titulo">Título de la Carrera:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={carrera.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Carrera:</label>
             <select
                id="tipo"
                name="tipo"
                value={carrera.tipo}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Técnico">Técnico</option>
                <option value="Tecnólogo">Tecnólogo</option>
              </select>
          </div>

          <div className="form-group">
            <label htmlFor="horas">Duración (horas):</label>
            <input
              type="number"
              id="horas"
              name="horas"
              value={carrera.horas}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={carrera.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tituloObtener">Título a Obtener:</label>
            <input
              type="text"
              id="tituloObtener"
              name="tituloObtener"
              value={carrera.tituloObtener}
              onChange={handleChange}
              required
            />
          </div>

          {/* Nuevo campo para la fecha de fin de visibilidad */}
          <div className="form-group">
            <label htmlFor="visibleHasta">Visible Hasta:</label>
            <input
              type="date"
              id="visibleHasta"
              name="visibleHasta"
              value={carrera.visibleHasta}
              onChange={handleChange}
              // Puedes hacerlo opcional o requerido según tu necesidad
              // required 
            />
          </div>

          <button type="submit" className="btn-crear" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Carrera'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCarrera;