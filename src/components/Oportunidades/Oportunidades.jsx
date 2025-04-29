import React from "react";
import "./Oportunidades.css";
import imgOportunidades from "../../assets/images/oportunidades.jpg";

const Oportunidades = () => {
  const titulo = "Un mundo de oportunidades te espera";
  
  return (
    <section className="oportunidades-section">
      <hr className="divider" />
      <div className="oportunidades-container">

        <h2 className="titulo-oportunidades">
          {titulo.split('').map((letra, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {letra}
            </span>
          ))}
        </h2>
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
