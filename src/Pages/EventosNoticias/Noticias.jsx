import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

import "./Noticias.css"; // Cambiado para usar su propio archivo CSS
// Restore static image imports
import noticia1 from "../../assets/images/slider1.jpg"; // Temporalmente usamos las mismas imágenes
import noticia2 from "../../assets/images/slider2.jpg"; // Puedes cambiarlas por imágenes específicas de noticias
import noticia3 from "../../assets/images/slider3.jpg";

// Restore static cards data
const initialNews = [
  {
    id: 'static-n1',
    image: noticia1,
    badge: "Titulo",
    title: "Pequeña descrpcion de la noticia",
    description: "",
    imagenUrl: noticia1, 
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n2',
    image: noticia2,
    badge: "Titulo",
    title: "Pequeña descrpcion de la segunda noticia",
    description: "",
    imagenUrl: noticia2,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n3',
    image: noticia3,
    badge: "Titulo",
    title: "Pequeña descrpcion de la tercera noticia y así sucesivamente",
    description: "",
    imagenUrl: noticia3,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n4',
    image: noticia1, // Using existing image for simplicity
    badge: "Titulo 4",
    title: "Pequeña descrpcion de la cuarta noticia",
    description: "",
    imagenUrl: noticia1,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n5',
    image: noticia2, // Using existing image for simplicity
    badge: "Titulo 5",
    title: "Pequeña descrpcion de la quinta noticia",
    description: "",
    imagenUrl: noticia2,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n6',
    image: noticia3, // Using existing image for simplicity
    badge: "Titulo 6",
    title: "Pequeña descrpcion de la sexta noticia",
    description: "",
    imagenUrl: noticia3,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n7',
    image: noticia1, // Using existing image for simplicity
    badge: "Titulo 7",
    title: "Pequeña descrpcion de la septima noticia",
    description: "",
    imagenUrl: noticia1,
    fecha: "",
    enlace: null,
    contenido: "",
  },
  {
    id: 'static-n8',
    image: noticia2, // Using existing image for simplicity
    badge: "Titulo 8",
    title: "Pequeña descrpcion de la octava noticia",
    description: "",
    imagenUrl: noticia2,
    fecha: "",
    enlace: null,
    contenido: "",
  }
];

const Noticias = () => {
  const [noticias, setNoticias] = useState(initialNews); // Initialize state with static news
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [activeDot, setActiveDot] = useState(0);
  const cardsContainerRef = useRef(null);

  // Precargar todas las imágenes antes de mostrarlas
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/noticias'); // Fetch news from backend
        if (!response.ok) {
           // If backend is not available or returns error, just use static data and stop loading.
           console.error(`Error fetching noticias: ${response.status}`);
           setLoading(false);
           return;
        }
        const data = await response.json();
        // Combine static data with fetched data
        // Filter fetched data to avoid adding items with the same ID as static ones
         // Assuming backend IDs are numbers and static IDs are strings starting with 'static-n'
        setNoticias(prevNoticias => {
          const uniqueFetchedData = data.filter(fetchedItem => 
            !initialNews.some(initialItem => 
               // Handle potential differences in ID types (string vs number)
              typeof initialItem.id === typeof fetchedItem.id 
              && initialItem.id === fetchedItem.id
            )
          );
          return [...prevNoticias, ...uniqueFetchedData];
        }); 
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching noticias:', error);
        setLoading(false); // Set loading to false even on error
      }
    };
    
    fetchNoticias();
  }, []); // Empty dependency array means this effect runs once on mount

  const scroll = (direction) => {
    if (cardsContainerRef.current) {
      const scrollAmount = 320; // Ajusta según el ancho de la card
      cardsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

  return (
    <>
      <div className="white-separator"></div>
    <div className="slider-container">
      <button className="slider-arrow left" onClick={() => scroll('left')}>
        <svg viewBox="0 0 48 48">
          <polyline points="30,12 18,24 30,36" stroke="#BFFF71" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
      <h2 className="section-title">Últimas Noticias</h2>
      {loading && noticias.length === initialNews.length ? (
        <div className="slider-loading">Cargando noticias...</div>
      ) : noticias && noticias.length > 0 ? (
        <div className="cards-container" ref={cardsContainerRef}>
          {noticias.map((noticia) => {
             // Assuming your backend returns objects with id, titulo, fecha, descripcion, imagenUrl, enlace
             // Fallback to local image if imagenUrl is not provided (for static data)
             const id = noticia.id;
             const imageUrl = noticia.imagenUrl || noticia.image;
             const cardTitle = noticia.fecha || noticia.badge;
             const cardDescription = noticia.titulo || noticia.title || noticia.contenido; // Use contenido as fallback for description
             const enlace = noticia.enlace;

              // Determine the key - use the provided id, ensuring uniqueness if necessary
              // Using the original ID if available, otherwise generating one for static items
              const itemKey = id ? 
                              (typeof id === 'string' && id.startsWith('static-n') ? id : `dynamic-${id}`)
                              : `static-temp-n-${Math.random().toString(36).substr(2, 9)}`; // Fallback for static if ID is missing/not string

             return (
               <div className="card" key={itemKey}>
                 <div className="card-image-container">
                   <img 
                     src={imageUrl} // Use imagenUrl from backend data
                     alt={cardDescription} // Use description
                     className="card-image"
                   />
                 </div>
                 <div className="card-content">
                     <span className="card-title">{cardTitle}</span> {/* Using date or badge */}
                     <h3 className="card-description">{cardDescription}</h3> {/* Using title or description/contenido */}
                   {/* Adjust Link to point to news details page if available */}
                   {/* <Link to={`/noticia/${noticia.id}`} className="card-link"> */}
                    {/* Or if there's an external link */}
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
                    ) : (id && typeof id === 'string' && id.startsWith('static-n')) ? (
                          // Assuming static links are handled by /noticia/ver/:id route
                          // Ensure your backend-fetched items do NOT start with 'static-n'
                          <Link to={`/noticia/ver/${id.replace('static-n','')}`} className="card-link">
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
           })}
        </div>
      ) : ( // This case handles when there are no news items at all (static or fetched)
        <div className="slider-loading">No hay noticias disponibles.</div>
      )}
      <button className="slider-arrow right" onClick={() => scroll('right')}>
        <svg viewBox="0 0 48 48">
          <polyline points="18,12 30,24 18,36" stroke="#BFFF71" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>
      <div className="pagination-dots">
        {noticias.length > 0 && (
          <>
            <span className={`dot ${activeDot === Math.max(0, activeDot - 1) ? 'active' : ''}`} />
            <span className={`dot ${activeDot === activeDot ? 'active' : ''}`} />
            <span className={`dot ${activeDot === Math.min(noticias.length - 1, activeDot + 1) ? 'active' : ''}`} />
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Noticias;
