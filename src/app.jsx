import { HashRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Barber from './pages/Barbearia/homeBarber/Barber';
import Calendario from './pages/CalendarioBarbearia/Calendario';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scss/styles.scss';

function App() {
  return (
    <div className="container">
    <h1>Hello, Preact!</h1>
  </div>
  );
}

export default App;