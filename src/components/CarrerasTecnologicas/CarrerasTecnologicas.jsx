import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Layouts/Header/Header';
import './CarrerasTecnologicas.css';

const CarrerasTecnologicas = () => {
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [carreras, setCarreras] = useState([
    {
      id: 1,
      titulo: 'COCINA',
      tipo: 'Carrera técnica',
      horas: 2200,
      descripcion: 'Recibe y maneja materias primas...',
      tituloObtener: 'TÉCNICO EN COCINA',
      visibleHasta: '2024-12-31' // Ejemplo de fecha para la carrera inicial
    }
  ]);

  const carrerasDisponibles = [
    { id: 1, titulo: 'COCINA', tipo: 'Carrera técnica' },
    { id: 2, titulo: 'Desarrollo de Software', tipo: 'Tecnólogo' },
    { id: 3, titulo: 'Electricidad Industrial', tipo: 'Técnico' },
    { id: 4, titulo: 'Gestión Administrativa', tipo: 'Técnico' }
  ];

  const [busqueda, setBusqueda] = useState('');

  const irACrearCarrera = () => {
    navigate('/crear-carrera');
  };

  const agregarCarrera = (carrera) => {
    const yaExiste = carreras.some(c => c.id === carrera.id);
    if (!yaExiste) {
      setCarreras([...carreras, {
        ...carrera, // Propaga las propiedades de la carrera seleccionada
        // Asegúrate de que las carreras agregadas tengan 'visibleHasta'
        // Si vienen de 'carrerasDisponibles' que no lo tienen, puedes poner un valor por defecto
        // o idealmente, las carreras creadas desde el formulario ya lo traerán.
        descripcion: carrera.descripcion || 'Descripción temporal',
        tituloObtener: carrera.tituloObtener || `TÍTULO EN ${carrera.titulo.toUpperCase()}`,
        horas: carrera.horas || 1800,
        visibleHasta: carrera.visibleHasta || null // O una fecha por defecto, o manejarlo si es null
      }]);
    }
  };

  const eliminarCarrera = (id) => {
    setCarreras(carreras.filter(c => c.id !== id));
  };

  const filtradas = carrerasDisponibles.filter(c =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estaAgregada = (id) => carreras.some(c => c.id === id);

  return (
    <div className="carreras-tecnologicas-page">
      <Header />
      <div className="carreras-tecnologicas-container">
        <div className="header-section">
          <h1>Carreras Tecnológicas</h1>
          <button onClick={() => setMostrarModal(true)} className="btn-crear">
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
                {carrera.visibleHasta && (
                  <div className="visible-hasta-info">
                    <p><strong>Visible hasta:</strong> {new Date(carrera.visibleHasta).toLocaleDateString()}</p>
                  </div>
                )}
                {/* Se elimina el botón de eliminar */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Buscar Carrera</h2>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <ul className="lista-carreras">
              {filtradas.map((carrera) => (
                <li key={carrera.id} className="modal-item">
                  <span>{carrera.titulo} - {carrera.tipo}</span>
                  {estaAgregada(carrera.id) ? (
                    <button onClick={() => eliminarCarrera(carrera.id)} className="btn-eliminar">
                      Eliminar
                    </button>
                  ) : (
                    <button onClick={() => agregarCarrera(carrera)} className="btn-agregar">
                      Agregar
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <button className="btn-ir-crear" onClick={irACrearCarrera}>
              Crear Nueva Carrera
            </button>
            <button className="btn-cerrar" onClick={() => setMostrarModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrerasTecnologicas;
