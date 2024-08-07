import { HashRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './scss/styles.scss';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
      </Routes>
    </HashRouter>
  );
}

export default App;