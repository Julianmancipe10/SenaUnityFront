import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header';
import './CrearCarrera.css';

const CrearCarrera = () => {
  const [carrera, setCarrera] = useState({
    titulo: '',
    tipo: '',
    horas: '',
    descripcion: '',
    tituloObtener: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // Para mensajes de éxito/error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarrera(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => { // Hacemos la función asíncrona si llamas a una API
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' }); // Limpiar mensajes previos

    // Simulación de llamada a API
    try {
      // Aquí iría tu lógica para guardar la carrera, por ejemplo, una llamada a fetch o axios
      // await api.crearCarrera(carrera);
      console.log('Nueva carrera:', carrera);
      setMessage({ type: 'success', text: '¡Carrera creada exitosamente!' });
      setCarrera({ // Limpia el formulario
        titulo: '',
        tipo: '',
        horas: '',
        descripcion: '',
        tituloObtener: ''
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

          <button type="submit" className="btn-crear" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Carrera'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearCarrera;