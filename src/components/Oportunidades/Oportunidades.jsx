import React, { useMemo } from "react";
import "./Oportunidades.css";
import imgOportunidades from "../../assets/images/oportunidades.jpg";

const Oportunidades = () => {
  const descripcion = "Un mundo de oportunidades te espera";
  
  // Memoiza el mapeo de letras para evitar cálculos en cada render
  const descripcionAnimada = useMemo(() =>
    descripcion.split('').map((letra, index) => (
      <span
        key={index}
        style={
          letra === ' '
            ? { animationDelay: `${index * 0.1}s`, margin: '0 4px' }
            : { animationDelay: `${index * 0.1}s` }
        }
      >
        {letra === ' ' ? '\u00A0' : letra}
      </span>
    ))
  , [descripcion]);

  return (
    <section className="oportunidades-section">
      <hr className="divider" />
      <div className="oportunidades-container">
        <h1 className="titulo-oportunidades">Programas de Formación</h1>
        <p className="descripcion-oportunidades">
          {descripcionAnimada}
        </p>
        <img src={imgOportunidades} alt="Oportunidades" className="oportunidades-img" />
        <div className="opciones-container">
          <div className="opcion">
            <img src="/imagenes/carreras-presenciales.png" alt="Carreras presenciales" />
            <p><strong>Carreras presenciales</strong></p>
          </div>
          <div className="opcion">
            <img src="/imagenes/carreras-cortas.png" alt="Carreras cortas" />
            <p><strong>Carreras cortas</strong></p>
          </div>
          <div className="opcion">
            <img src="/imagenes/cursos-ingles.png" alt="Cursos de inglés" />
            <p><strong>Cursos de inglés</strong></p>
          </div>
        </div>
      </div>
      <hr className="divider bottom-divider" />
    </section>
  );
};

export default Oportunidades;
