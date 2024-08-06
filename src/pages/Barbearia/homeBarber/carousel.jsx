import { h } from 'preact';

const Carousel = ({ topServices }) => (
  <div className="slider-container text-center">
    <h4 className="carousel-title">Serviços Mais Vendidos</h4>
    <div id="carouselTopServices" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {topServices.map((service, index) => (
          <CarouselItem key={service.id} service={service} isActive={index === 0} />
        ))}
      </div>
      <button className="carousel-control-prev d-flex align-items-end" type="button" data-bs-target="#carouselTopServices" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next d-flex align-items-end" type="button" data-bs-target="#carouselTopServices" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
);

const CarouselItem = ({ service, isActive }) => (
  <div className={`carousel-item ${isActive ? 'active' : ''}`}>
    <div className="carousel-item-container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="d-flex justify-content-center">
          <div style={{maxWidth:'800px'}}className="col-12 d-flex justify-content-center text-center row">
            <img src={`/images/barbearia/${service.carouselName}`} className="img-slider-barber col-12" alt={service.name} />
            <div className="col-sm-12 d-flex justify-content-center">
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
);

export default Carousel;