import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComponent = ({ images }) => {
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
              style={{ maxWidth: '600px', maxHeight: '500px' }}
            />
          </div>
        ))}
      </Carousel>
      <button onClick={handlePrev}>Anterior</button>
      <button onClick={handleNext}>Siguiente</button>
    </div>
  );
};

export default CarouselComponent;