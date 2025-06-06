import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import "./Eventos.css";
// Restore static image imports
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";

// Restore static cards data
const initialEvents = [
  {
    id: 'static-1',
    image: slider1,
    badge: "Titulo",
    title: "Pequeña descrpcion del primer evento",
    description: "",
    imagenUrl: slider1, 
    fecha: "",
    enlace: null
  },
  {
    id: 'static-2',
    image: slider2,
    badge: "Titulo",
    title: "Pequeña descrpcion del segundo evento",
    description: "",
    imagenUrl: slider2,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-3',
    image: slider3,
    badge: "Titulo",
    title: "Pequeña descrpcion del tercer evento y así sucesivamente",
    description: "",
    imagenUrl: slider3,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-4',
    image: slider1, // Using existing image for simplicity
    badge: "Titulo 4",
    title: "Pequeña descrpcion del cuarto evento",
    description: "",
    imagenUrl: slider1,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-5',
    image: slider2, // Using existing image for simplicity
    badge: "Titulo 5",
    title: "Pequeña descrpcion del quinto evento",
    description: "",
    imagenUrl: slider2,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-6',
    image: slider3, // Using existing image for simplicity
    badge: "Titulo 6",
    title: "Pequeña descrpcion del sexto evento",
    description: "",
    imagenUrl: slider3,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-7',
    image: slider1, // Using existing image for simplicity
    badge: "Titulo 7",
    title: "Pequeña descrpcion del septimo evento",
    description: "",
    imagenUrl: slider1,
    fecha: "",
    enlace: null
  },
  {
    id: 'static-8',
    image: slider2, // Using existing image for simplicity
    badge: "Titulo 8",
    title: "Pequeña descrpcion del octavo evento",
    description: "",
    imagenUrl: slider2,
    fecha: "",
    enlace: null
  }
];

const Slider = () => {
  const [eventos, setEventos] = useState(initialEvents); // Initialize state with static events
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [activeDot, setActiveDot] = useState(0);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/eventos'); // Fetch events from backend
        if (!response.ok) {
          // If backend is not available or returns error, just use static data and stop loading.
          console.error(`Error fetching eventos: ${response.status}`);
          setLoading(false);
          return;
        }
        const data = await response.json();
        // Combine static data with fetched data
        // Filter fetched data to avoid adding items with the same ID as static ones
        // Assuming backend IDs are numbers and static IDs are strings starting with 'static-'
        setEventos(prevEvents => {
          const uniqueFetchedData = data.filter(fetchedItem => 
            !initialEvents.some(initialItem => 
              // Handle potential differences in ID types (string vs number)
              typeof initialItem.id === typeof fetchedItem.id 
              && initialItem.id === fetchedItem.id
            )
          );
          return [...prevEvents, ...uniqueFetchedData];
        }); 
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching eventos:', error);
        setLoading(false); // Set loading to false even on error
      }
    };
    
    fetchEventos();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 320; // Ancho aproximado de cada card
      const newActiveDot = Math.round(scrollLeft / cardWidth);
      setActiveDot(newActiveDot);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction) => {
    if (cardsContainerRef.current) {
      const scrollAmount = 320; // Ajusta según el ancho de la card
      cardsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-arrow left" onClick={() => scroll('left')}>
        <svg viewBox="0 0 48 48">
          <polyline points="30,12 18,24 30,36" stroke="#BFFF71" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
      <h2 className="section-title">Eventos</h2>
      {loading && eventos.length === 0 ? (
        <div className="slider-loading">Cargando eventos...</div>
      ) : eventos && eventos.length > 0 ? (
         <div className="cards-container" ref={cardsContainerRef}>
           {eventos.map((evento) => {
              // Determine which properties to use based on whether it's static or fetched data
              const id = evento.id;
              const imageUrl = evento.imagenUrl || evento.image;
              const cardTitle = evento.fecha || evento.badge;
              const cardDescription = evento.titulo || evento.title;
              const enlace = evento.enlace;

              // Determine the key - use the provided id, ensuring uniqueness if necessary
              // Using the original ID if available, otherwise generating one for static items
              const itemKey = id ? 
                              (typeof id === 'string' && id.startsWith('static-') ? id : `dynamic-${id}`)
                              : `static-temp-${Math.random().toString(36).substr(2, 9)}`; // Fallback for static if ID is missing/not string

              return (
                <div className="card" key={itemKey}>
                  <div className="card-image-container">
                    <img 
                      src={imageUrl} 
                      alt={cardDescription} 
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-title">{cardTitle}</span>
                    <h3 className="card-description">{cardDescription}</h3>
                    {/* Link logic: if backend provides enlace, use it. Otherwise, if it's one of the initial static items, use the react-router-dom Link. */}
                    {enlace ? (
                        <a href={enlace} target="_blank" rel="noopener noreferrer" className="card-link">
                           Ver más
                           <span className="card-button">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                               <circle cx="12" cy="12" r="10"></circle>
                               <path d="M12 8l4 4-4 4"></path>
                               <path d="M8 12h8"></path>
                             </svg>
                           </span>
                       </a>
                    ) : (id && typeof id === 'string' && id.startsWith('static-')) ? (
                         // Assuming static links are handled by /eventos/ver/:id route
                         // Ensure your backend-fetched items do NOT start with 'static-'
                          <Link to={`/eventos/ver/${id.replace('static-','')}`} className="card-link">
                            Ver más
                            <span className="card-button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8l4 4-4 4"></path>
                                <path d="M8 12h8"></path>
                              </svg>
                            </span>
                          </Link>
                     ) : (
                         <span className="card-link">No hay enlace disponible</span>
                     )}
                   </div>
                </div>
              );
             }
           )}
         </div>
       ) : ( // This case handles when there are no events at all (static or fetched)
         <div className="slider-loading">No hay eventos disponibles.</div>
       )}
        <button className="slider-arrow right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 48 48">
            <polyline points="18,12 30,24 18,36" stroke="#BFFF71" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
        <div className="pagination-dots">
          {eventos.length > 0 && (
            <>
              <span className={`dot ${activeDot === Math.max(0, activeDot - 1) ? 'active' : ''}`} />
              <span className={`dot ${activeDot === activeDot ? 'active' : ''}`} />
              <span className={`dot ${activeDot === Math.min(eventos.length - 1, activeDot + 1) ? 'active' : ''}`} />
            </>
          )}
        </div>
    </div>
  );
};

export default Slider;