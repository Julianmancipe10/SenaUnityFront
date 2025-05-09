import React, { useState } from 'react';
import { Header } from '../../Layouts/Header/Header';
import './Eventos.css';

const Eventos = () => {
  const [activeTab, setActiveTab] = useState('eventos');
  const [eventos] = useState([
    {
      id: 1,
      titulo: "Feria de Emprendimiento SENA",
      fecha: "2024-02-15",
      descripcion: "Únete a la feria de emprendimiento donde los aprendices mostrarán sus proyectos innovadores.",
      lugar: "Centro de Comercio y Turismo"
    },
    {
      id: 2,
      titulo: "Seminario de Tecnología",
      fecha: "2024-02-20",
      descripcion: "Actualízate con las últimas tendencias en desarrollo de software y tecnologías emergentes.",
      lugar: "Auditorio Principal"
    }
  ]);

  const [noticias] = useState([
    {
      id: 1,
      titulo: "Nuevos programas de formación",
      fecha: "2024-02-10",
      contenido: "El SENA anuncia nuevos programas de formación en áreas de tecnología y desarrollo sostenible.",
      imagen: "url-imagen"
    },
    {
      id: 2,
      titulo: "Reconocimiento Internacional",
      fecha: "2024-02-05",
      contenido: "Aprendices del SENA ganan competencia internacional de robótica.",
      imagen: "url-imagen"
    }
  ]);

  return (
    <div className="eventos-container">
      <Header />
      <main className="eventos-main">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'eventos' ? 'active' : ''}`}
            onClick={() => setActiveTab('eventos')}
          >
            Eventos
          </button>
          <button 
            className={`tab ${activeTab === 'noticias' ? 'active' : ''}`}
            onClick={() => setActiveTab('noticias')}
          >
            Noticias
          </button>
        </div>

        <div className="content">
          {activeTab === 'eventos' ? (
            <div className="eventos-grid">
              {eventos.map(evento => (
                <div key={evento.id} className="evento-card">
                  <h3>{evento.titulo}</h3>
                  <p className="fecha">{evento.fecha}</p>
                  <p className="descripcion">{evento.descripcion}</p>
                  <p className="lugar">{evento.lugar}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="noticias-grid">
              {noticias.map(noticia => (
                <div key={noticia.id} className="noticia-card">
                  <h3>{noticia.titulo}</h3>
                  <p className="fecha">{noticia.fecha}</p>
                  <p className="contenido">{noticia.contenido}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Eventos;