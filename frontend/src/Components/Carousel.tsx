import React from 'react';
import sla from '../../SLA.jpg';


const Carousel: React.FC = () => {
  return (
    <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={sla} className="d-block w-100 h-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={sla} className="d-block w-100 h-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={sla} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
