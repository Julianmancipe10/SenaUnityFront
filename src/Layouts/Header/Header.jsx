import React from 'react'
import imgLogo from '../../assets/images/Logo_SenaUnity.png'
import imgLogoSena from '../../assets/images/LogoSena.png'
import imgLogoSenaGreen from '../../assets/images/Logo-Sena-Green.png'
import '../Header/Header.css'

export const Header = () => {
  return (
    <div>
        <header className='DivHeader'>

            
            <h1>Sena <span>Unity</span></h1>
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
                        <a href="">Inicio</a>
                        <a href="">contacto</a>
                        <a href="">Horarios</a>
                        <a href="">Eventos</a>
                    </li>
                </ul>
            </nav>
            <img className='imgSenaUnity' src={imgLogo} alt="SenaUnity" />
    
        </header>
    </div>
  )
}
