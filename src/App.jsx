import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Eventos from "./Pages/EventosNoticias/Eventos";
import FAQ from "./Pages/FAQ/FAQ";
import VerMasEvento from "./Pages/EventosNoticias/VerMas/VerMasEvento";
import VerMasNoticia from "./Pages/EventosNoticias/VerMas/VerMasNoticia";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Profile from "./Pages/Profile/Profile";
import Horario from "./Pages/Horarios/Horario";

// ...otros imports que tengas

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/horarios" element={<Horario />} />
          <Route path="/evento/:id" element={<VerMasEvento />} />
          <Route path="/noticia/:id" element={<VerMasNoticia />} />
          {/* Puedes agregar más rutas aquí si las tienes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
