import React from "react";
import { Header } from "../../Layouts/Header/Header";
import Slider from "../EventosNoticias/Eventos";
import Noticias from "../EventosNoticias/Noticias";
import Programas from "../../components/Programas/Programas";
import InstrucFuncionarios from "../../Layouts/InstrucFuncionarios/InstrucFuncionarios";
import NuestrasSedes from "../../Layouts/NuestrasSedes/NuestrasSedes";
import imgUsuario from '../../assets/images/imgUsuario.png';
import "../Home/Home.css";
import { Link } from 'react-router-dom';
import Horario from "../Horarios/Horario";

export const Home = () => {
  return (
    <div className="main-container">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <Header />
      
      <div className="top-section">
        <h1 className="h1Bienvenidos">BIENVENIDOS</h1>
        <Link to="/LoginPage">
          <button className="button-ingresar">
            <div className="ingresar-wrapper">
              <img src={imgUsuario} alt="Usuario" />
              <span className="ingresar-text">ingresar</span>
            </div>
          </button>
        </Link>
      </div>
      
      <div className="home-container">
        <div className="text-container">
          <div className='divh1TextHome'>
            <h1>
              No te pierdas los <span className="spanTxt">Eventos</span> y
              <span className='spanTxt'> Novedades</span> de tu <span className="spanTxt">SENA</span> más cercano, Infórmate, participa y aprovecha todas las oportunidades.
              Descubre <span className='spanTxt'> Talleres </span>, <span className='spanTxt'>Cursos</span> y mucho más para potenciar tu crecimiento personal y profesional.
            </h1>
          </div>
        </div>
        
        <div className="comp-card">
          <Slider />
          <Noticias />
        </div>
      </div>
      
      <Programas />
      <InstrucFuncionarios />
      <NuestrasSedes />
    </div>
  );
};
