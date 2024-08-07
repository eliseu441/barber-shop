import { useState } from 'preact/hooks';
import { Route, Routes, HashRouter } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Barber from './pages/Barbearia/homeBarber/Barber';
import Calendario from './pages/CalendarioBarbearia/Calendario';

function App() {
  return (
    <div className="container">
      <h1>Hello, Preact!</h1>
    </div>
  );
}

export default App;