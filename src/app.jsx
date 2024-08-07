import { useState } from 'preact/hooks';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Barber from './pages/Barbearia/homeBarber/Barber';
import Calendario from './pages/CalendarioBarbearia/Calendario';
import './scss/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
  );
}

export default App;