import { useState } from 'preact/hooks';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Barber from './pages/Barbearia/homeBarber/Barber';
import Calendario from './pages/CalendarioBarbearia/Calendario';
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