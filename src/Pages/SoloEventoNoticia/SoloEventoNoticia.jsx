import React from 'react';
import EventosSlider from '../EventosNoticias/Eventos';
import NoticiasSlider from '../EventosNoticias/Noticias';
import { Header } from '../../Layouts/Header/Header';
import './SoloEventoNoticia.css';

const SoloEventoNoticia = () => (
  <>
    <Header />
    <div className="solo-card">
      <h2 className="section-title">Eventos y Noticias</h2>
      <EventosSlider />
      <NoticiasSlider />
    </div>
  </>
);

export default SoloEventoNoticia;