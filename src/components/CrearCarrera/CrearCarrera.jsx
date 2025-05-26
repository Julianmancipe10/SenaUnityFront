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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarrera(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar la carrera
    console.log('Nueva carrera:', carrera);
    // Limpia el formulario
    setCarrera({
      titulo: '',
      tipo: '',
      horas: '',
      descripcion: '',
      tituloObtener: ''
    });
  };

  return (
    <div className="crear-carrera-page">
      <Header />
      <div className="crear-carrera-container">
        <h2>Crear Nueva Carrera Técnica</h2>
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
            <input
              type="text"
              id="tipo"
              name="tipo"
              value={carrera.tipo}
              onChange={handleChange}
              required
            />
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

          <button type="submit" className="btn-crear">Crear Carrera</button>
        </form>
      </div>
    </div>
  );
};

export default CrearCarrera;