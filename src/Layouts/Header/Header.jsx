import React from 'react'
import imgLogo from '../../assets/images/Logo_SenaUnity.png'
import imgLogoSenaGreen from '../../assets/images/logo-sena-green.png'
import '../Header/Header.css'
import { NavLink } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { PERMISOS } from '../../constants/roles';

export const Header = () => {
  const { hasPermission } = usePermissions();
  const canAccessAdmin = hasPermission(PERMISOS.VER_USUARIO) || 
                        hasPermission(PERMISOS.VER_PERMISOS) || 
                        hasPermission(PERMISOS.VER_ROLES);

  return ( 
    <div>
        <header className='DivHeader'>
            <h1 className='DivHeader-h1'>
              Sena<span className='text-primary'>Unity</span>
            </h1>
            <img className='LogoSena' 
                 src={imgLogoSenaGreen} 
                 alt="LogoSena" />
            <div className="logo-container">
                <div className="centro-comercio-text">
                    Centro de Comercio y Turismo<br />
                    Regional Quindío
                </div>
            </div>

            <nav className='HeaderNav'>
                <ul>
                    <li>
                    <NavLink to="/" end 
                             className={({isActive}) => 
                               `HeaderNavLink ${isActive ? "active" : ""}`
                             }>
                      Inicio
                    </NavLink>
                    <NavLink to="/contacto" end 
                             className={({isActive}) => 
                               `HeaderNavLink ${isActive ? "active" : ""}`
                             }>
                      Contacto
                    </NavLink>
                    <NavLink to="/horarios" end 
                             className={({isActive}) => 
                               `HeaderNavLink ${isActive ? "active" : ""}`
                             }>
                      Horarios
                    </NavLink>
                    <NavLink to="/eventos" end 
                             className={({isActive}) => 
                               `HeaderNavLink ${isActive ? "active" : ""}`
                             }>
                      Eventos y Noticias
                    </NavLink>
                    <NavLink to="/admin/crear" end 
                             className={({isActive}) => 
                               `HeaderNavLink ${isActive ? "active" : ""}`
                             }>
                      Crear Información
                    </NavLink>
                    {canAccessAdmin && (
                      <NavLink 
                        to="/admin" 
                        end 
                        className={({isActive}) => 
                          `HeaderNavLink ${isActive ? "active" : ""}`
                        }>
                        Administración
                      </NavLink>
                    )}
                    </li>
                </ul>
            </nav>
            <img className='imgSenaUnity' 
                 src={imgLogo} 
                 alt="SenaUnity" />
        </header>
    </div>
  )
};

export default Header;