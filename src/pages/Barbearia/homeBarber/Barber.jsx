import { h } from 'preact';
import { useState } from 'preact/hooks';

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
        { id: 4, name: 'Massagem Capilar', description: 'Massagem relaxante no couro cabeludo', price: 'R$ 40', details: 'Duração de 30 minutos.' },
        { id: 5, name: 'Tratamento Capilar', description: 'Tratamento completo para os cabelos', price: 'R$ 100', details: 'Inclui hidratação e reconstrução.' }
    ]);

    return (
        <div className="pagina-servicos col-sm-12">
            <div className="bg-dark text-white text-center py-5 slider-container">
                <h4>Serviços Mais Vendidos</h4>
                <div id="carouselTopServices" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {topServices.map((service, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={service.id}>
                                <div className="d-flex justify-content-center align-items-center carousel-item-container">
                                    <div className="row">
                                        <div className="d-flex justify-content-start">
                                            <div className="col-12 d-flex justify-content-center row">
                                                <img src={`/images/barbearia/${service.carouselName}`} className="img-slider-barber d-flex col-12 justify-content-center" alt={service.name} />
                                                <div className=" col-sm-12 d-flex justify-content-center">
                                                    <div className="carousel-caption col-sm-3">
                                                        <h3>{service.name}</h3>
                                                        <p>{service.description}</p>
                                                        <h3 className="price"><strong>{service.price}</strong></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselTopServices" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselTopServices" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="container mt-5">
                <h4 className="text-center mb-4">Todos os Serviços</h4>
                <div className="row">
                    {services.map(service => (
                        <div className="col-md-4 mb-4" key={service.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{service.name}</h5>
                                    <p className="card-text">{service.description}</p>
                                    <p className="card-text"><strong>Preço: {service.price}</strong></p>
                                    <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${service.id}`} aria-expanded="false" aria-controls={`collapse${service.id}`}>
                                        Ver Detalhes
                                    </button>
                                    <div className="collapse m-2" id={`collapse${service.id}`}>
                                        <div className="card card-body">
                                            <p className="card-text"><small className="text-muted">{service.details}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Barber;