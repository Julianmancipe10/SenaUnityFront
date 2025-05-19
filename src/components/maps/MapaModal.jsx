import React from 'react';
import './MapaModal.css';

const MapaModal = ({ show, onClose, mapaUrl }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <iframe
          title="Mapa"
          src={mapaUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

/* comentario para hacer commit */

export default MapaModal;
