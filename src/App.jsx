import { useEffect } from 'react';
import './App.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfileUser from './Pages/CrearPerfil/ProfileUser';
import Login from './components/Login/Login';
import Register from './components/Register/Register'; // Ajustá la ruta si tu carpeta es diferente
import Horario from './Pages/Horarios/Horario';
import Contacto from './Pages/Contacto/Contacto';
import VerMasEvento from './Pages/EventosNoticias/VerMas/VerMasEvento';
import VerMasNoticia from './Pages/EventosNoticias/VerMas/VerMasNoticia';
import SoloEventoNoticia from "./Pages/SoloEventoNoticia/SoloEventoNoticia"; // Ajusta el import según el nombre real

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/horarios" element={<Horario />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/evento/:id" element={<VerMasEvento />} />
          <Route path="/noticia/:id" element={<VerMasNoticia />} />
          <Route path="/SoloEventoNoticia" element={<SoloEventoNoticia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
