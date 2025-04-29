import React from "react";
import { useState, useEffect } from "react";

import "./Slider.css";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";

const cards = [
  {
    id: 1,
    image: slider1,
    badge: "Marketer",
    title: "Lorem ipsum dolor sit explicabo adipisicing elit",
    description: ""
  },
  {
    id: 2,
    image: slider2,
    badge: "Gamer",
    title: "Lorem ipsum dolor sit explicabo adipisicing elit",
    description: ""
  },
  {
    id: 3,
    image: slider3,
    badge: "Editor",
    title: "Lorem ipsum dolor sit explicabo adipisicing elit",
    description: ""
  }
];

const Slider = () => {
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
      <h2 className="section-title">Eventos</h2>
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
        <div className="slider-loading">Cargando contenido...</div>
      )}
    </div>
  );
};

export default Slider;