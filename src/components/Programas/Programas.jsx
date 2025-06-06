import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Programas.css";
import imgOportunidades from "../../assets/images/fondoProgramas.png";

const Programas = () => {
  const navigate = useNavigate();
  const descripcion = "Un mundo de oportunidades te espera";
  const [hoveredOption, setHoveredOption] = useState(null);

  const opciones = [
    {
      id: 1,
      imagen: "/imagenes/carreras-presenciales.png",
      alt: "Carreras presenciales",
      texto: "Carreras Tecnologas",
      ruta: "/carreras-tecnologicas"
    },
    {
      id: 2,
      imagen: "/imagenes/carreras-cortas.png",
      alt: "Carreras cortas",
      texto: "Carreras Cortas"
    },
   
  ];

  const handleMouseEnter = (id) => {
    setHoveredOption(id);
  };

  const handleMouseLeave = () => {
    setHoveredOption(null);
  };

  const handleClick = (ruta) => {
    navigate(ruta);
  };

  return (
    <section className="oportunidades-section">
      <hr className="divider" />
      <div className="oportunidades-container">
        <h1 className="titulo-oportunidades">Programas de Formación</h1>
        <p className="descripcion-oportunidades">{descripcion}</p>
        <img src={imgOportunidades} alt="Oportunidades" className="oportunidades-img" />
        <div className="opciones-container">
          {opciones.map((opcion) => (
            <div
              key={opcion.id}
              className={`opcion-base ${hoveredOption === opcion.id ? 'opcion-hover' : ''}`}
              onMouseEnter={() => handleMouseEnter(opcion.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(opcion.ruta)}
              style={{ cursor: 'pointer' }}
            >
              <img src={opcion.imagen} alt={opcion.alt} />
              <p className={hoveredOption === opcion.id ? 'texto-hover' : ''}>
                <strong>{opcion.texto}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr className="divider bottom-divider" />
    </section>
  );
};

export default Programas;