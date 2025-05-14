import React from 'react'
import imgLogo from '../../assets/images/Logo_SenaUnity.png'
import imgLogoSenaGreen from '../../assets/images/Logo-Sena-Green.png'
import '../Header/Header.css'
import { NavLink } from 'react-router-dom';


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
                    <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""} style={{textAlign: 'left'}}>Inicio</NavLink>
                    <NavLink to="/contacto" end className={({isActive}) => isActive ? "active" : ""} style={{textAlign: 'left'}}>Contacto</NavLink>
                    <NavLink to="/horarios" end className={({isActive}) => isActive ? "active" : ""} style={{textAlign: 'left'}}>Horarios</NavLink>
                    <NavLink to="/eventos" end className={({isActive}) => isActive ? "active" : ""} style={{textAlign: 'left'}}>Eventos y Noticias</NavLink>
                    </li>
                </ul>
            </nav>
            <img className='imgSenaUnity' src={imgLogo} alt="SenaUnity" />
        </header>
    </div>
  )
}
