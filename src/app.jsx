import { HashRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Barber from './pages/Barbearia/homeBarber/Barber';
import Calendario from './pages/CalendarioBarbearia/Calendario';
import Redirect from './pages/Redirect/Redirect';
import Budget from './pages/Budget/Budget';
import Header from  './layout/Header2/index'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scss/styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <HashRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="/calendar" element={<Calendario />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </HashRouter>
  );
}

export default App;