import React from 'react'
import imgLogo from '../../assets/images/Logo_SenaUnity.png'
import imgLogoSenaGreen from '../../assets/images/Logo-Sena-Green.png'
import '../Header/Header.css'
import { Link } from 'react-router-dom';


export const Header = () => {
  return ( 
    <div>
        <header className='DivHeader'>

            
            <h1>Sena<span>Unity</span></h1>
            <img className='LogoSena' src={imgLogoSenaGreen} alt="LogoSena" />
            <div className="logo-container">
                
                <div className="centro-comercio-text">
                    Centro de Comercio y Turismo<br />
                    Regional Quindío
                </div>
            </div>
           


            <nav>
                <ul>
                    <li className='iten'>
                    <Link to="/">Inicio</Link>
                    <Link to="/contacto">Contacto</Link> {/* ← Si tienes esta ruta */}
                    <Link to="/horarios">Horarios</Link> {/* ← Este es el que importa ahora */}
                    <Link to="/eventos">Eventos y Noticias</Link> {/* ← Si tienes esta ruta */}
                    </li>
                </ul>
            </nav>
            <img className='imgSenaUnity' src={imgLogo} alt="SenaUnity" />
    
        </header>
    </div>
  )
}
