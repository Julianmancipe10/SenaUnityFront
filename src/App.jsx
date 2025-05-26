import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Eventos from "./Pages/EventosNoticias/Eventos";
import FAQ from "./Pages/FAQ/FAQ";
import VerMasEvento from "./Pages/EventosNoticias/VerMas/VerMasEvento";
import VerMasNoticia from "./Pages/EventosNoticias/VerMas/VerMasNoticia";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Profile from "./Pages/Profile/Profile";
import Horario from "./Pages/Horarios/Horario";
import Register from "./components/Register/Register";
import AdminPanel from "./Pages/Admin/AdminPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PERMISOS } from "./constants/roles";



function App() {
  return (
    <Router>

    </Router>
  );
}

export default App;
