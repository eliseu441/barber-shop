import { h } from 'preact';
import { useState } from 'preact/hooks';
import Carousel from './carousel';
import ServiceList from './serviceList';
import ServiceCard from './serviceCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Barber = () => {
  const [topServices] = useState([
    { id: 2, carouselName: 'carouselBarba.jpeg', name: 'Barba', description: 'Aparar e modelar a barba', price: 'R$ 30' },
    { id: 3, carouselName: 'carouselBarba.jpeg', name: 'Corte + Barba', description: 'Pacote completo de corte e barba', price: 'R$ 70' },
    { id: 4, carouselName: 'carouselBarba.jpeg', name: 'Corte + Barba', description: 'Pacote completo de corte e barba', price: 'R$ 70' },
    { id: 5, carouselName: 'carouselBarba.jpeg', name: 'Corte + Barba', description: 'Pacote completo de corte e barba', price: 'R$ 70' },
  ]);

  const [services] = useState([
    { id: 1, name: 'Corte de Cabelo', description: 'Corte de cabelo profissional', price: 'R$ 50', details: 'Inclui lavagem e secagem.' },
    { id: 2, name: 'Barba', description: 'Aparar e modelar a barba', price: 'R$ 30', details: 'Inclui hidratação da barba.' },
    { id: 3, name: 'Corte + Barba', description: 'Pacote completo de corte e barba', price: 'R$ 70', details: 'Pacote promocional.' },
    { id: 4, name: 'Descoloração capilar', description: 'Massagem relaxante no couro cabeludo', price: 'R$ 40', details: 'Duração de 30 minutos.' },
    { id: 5, name: 'Hidratação', description: 'Tratamento completo para os cabelos', price: 'R$ 100', details: 'Inclui hidratação e reconstrução.' }
  ]);

  return (
    <div className="pagina-servicos col-sm-12">
      <Carousel topServices={topServices} />
      <ServiceList services={services} />
    </div>
  );
};

export default Barber;