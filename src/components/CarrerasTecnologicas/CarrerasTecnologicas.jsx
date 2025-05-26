import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Layouts/Header/Header';
import './CarrerasTecnologicas.css';

const CarrerasTecnologicas = () => {
  const navigate = useNavigate();
  const [carreras] = useState([
    {
      id: 1,
      titulo: 'COCINA',
      tipo: 'Carrera técnica',
      horas: 2200,
      descripcion: 'Recibe y maneja materias primas para la elaboración de alimentos con estándares de calidad, apoya servicios de alimentación bajo los parámetros de la seguridad alimentaria.',
      tituloObtener: 'TÉCNICO EN COCINA'
    }
  ]);

  const irACrearCarrera = () => {
    navigate('/crear-carrera');
  };

  return (
    <div className="carreras-tecnologicas-page">
      <Header />
      <div className="carreras-tecnologicas-container">
        <div className="header-section">
          <h1>Carreras Tecnológicas</h1>
          <button onClick={irACrearCarrera} className="btn-crear">
            Agregar Carrera
          </button>
        </div>

        <div className="carreras-grid">
          {carreras.map((carrera) => (
            <div key={carrera.id} className="carrera-card">
              <div className="carrera-header">
                <h3>{carrera.titulo}</h3>
                <span className="tipo-badge">{carrera.tipo}</span>
              </div>
              <div className="carrera-content">
                <div className="duracion-info">
                  <span className="horas-numero">{carrera.horas}</span>
                  <span className="horas-texto">Horas</span>
                  <span className="duracion-label">DURACIÓN</span>
                </div>
                <p className="descripcion">{carrera.descripcion}</p>
                <div className="titulo-obtener">
                  <h4>TÍTULO A OBTENER:</h4>
                  <p>{carrera.tituloObtener}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarrerasTecnologicas;
