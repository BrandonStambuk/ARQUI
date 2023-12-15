import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ images, imageStyle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div style={{ marginTop: '35px' }}>
      <Carousel showThumbs={false} selectedItem={currentIndex}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              style={{
                width: '200px', // Ancho personalizado o 100% por defecto
                height:'200px', // Alto personalizado o 100% por defecto
                objectFit: 'cover',
                ...imageStyle, // Cualquier estilo adicional proporcionado
              }}
            />
          </div>
        ))}
      </Carousel>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="btn btn-primary" onClick={handlePrev}>
          Anterior
        </button>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;
