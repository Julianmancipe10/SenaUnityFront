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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
