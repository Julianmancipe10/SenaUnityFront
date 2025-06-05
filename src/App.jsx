import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layouts/Header/Header"; // <- asegúrate de importar el Header
import Home from "./Pages/Home/Home";
import Eventos from "./Pages/EventosNoticias/Eventos";
import FAQ from "./Pages/FAQ/FAQ";
import VerMasEvento from "./Pages/EventosNoticias/VerMas/VerMasEvento";
import VerMasNoticia from "./Pages/EventosNoticias/VerMas/VerMasNoticia";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Profile from "./Pages/Profile/Profile";
import Horario from "./Pages/Horarios/Horario";
import ProfileUser from './Pages/CrearPerfil/ProfileUser';
import Login from './components/Login/Login';
import Register from "./components/Register/Register";
import AdminPanel from "./Pages/Admin/AdminPanel";
import CarrerasTecnologicas from "./components/CarrerasTecnologicas/CarrerasTecnologicas";
import CrearCarrera from "./components/CrearCarrera/CrearCarrera";
import CrearEvento from "./Pages/EventosNoticias/CrearEvento/CrearEvento";
import AdminCreationForms from "./Pages/Admin/AdminCreationForms/AdminCreationForms";
import Contacto from './Pages/Contacto/Contacto';
import SoloEventoNoticia from "./Pages/SoloEventoNoticia/SoloEventoNoticia";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { PERMISOS } from "./constants/roles";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/contacto" element={<FAQ />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/horarios" element={<Horario />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/eventos/ver/:id" element={<VerMasEvento />} />
        <Route path="/noticias/ver/:id" element={<VerMasNoticia />} />
        <Route path="/SoloEventoNoticia" element={<SoloEventoNoticia />} />
        <Route path="/carreras-tecnologicas" element={<CarrerasTecnologicas />} />
        <Route path="/crear-carrera" element={<CrearCarrera />} />
        <Route path="/admin/crear" element={<AdminCreationForms />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              requiredPermissions={[
                PERMISOS.VER_USUARIO,
                PERMISOS.VER_PERMISOS,
                PERMISOS.VER_ROLES
              ]}
            >
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
