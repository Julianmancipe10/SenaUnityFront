import React from "react";
import { useState, useEffect } from "react";

import "./Noticias.css"; // Cambiado para usar su propio archivo CSS
import noticia1 from "../../assets/images/slider1.jpg"; // Temporalmente usamos las mismas imágenes
import noticia2 from "../../assets/images/slider2.jpg"; // Puedes cambiarlas por imágenes específicas de noticias
import noticia3 from "../../assets/images/slider3.jpg";

const cards = [
  {
    id: 1,
    image: noticia1,
    badge: "Noticias",
    title: "Nuevos cursos disponibles en el área de tecnología",
    description: ""
  },
  {
    id: 2,
    image: noticia2,
    badge: "Eventos",
    title: "Próxima jornada de inscripciones para programas técnicos",
    description: ""
  },
  {
    id: 3,
    image: noticia3,
    badge: "Informativo",
    title: "Convenios con empresas para prácticas profesionales",
    description: ""
  }
];

const Noticias = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Precargar todas las imágenes antes de mostrarlas
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagePromises = cards.map((card) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = card.image;
            img.onload = resolve;
            img.onerror = reject;
          });
        });
        
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        // En caso de error, igualmente mostramos lo que podamos
        setImagesLoaded(true);
      }
    };
    
    loadImages();
  }, []);

  return (
    <div className="slider-container">
      <h2 className="section-title">Últimas Noticias</h2>
      {imagesLoaded ? (
        <div className="cards-container">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <div className="card-image-container">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <span className="card-badge">{card.badge}</span>
                <h3 className="card-title">{card.title}</h3>
                <a href="#" className="card-link">
                  Ver más
                  <span className="card-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 8l4 4-4 4"></path>
                      <path d="M8 12h8"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="slider-loading">Cargando noticias...</div>
      )}
    </div>
  );
};

export default Noticias;
