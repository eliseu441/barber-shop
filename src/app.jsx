import { useState } from 'preact/hooks';
import { Route, Routes, HashRouter } from 'react-router-dom';
import  Home from './pages/HomePage';
import './scss/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;