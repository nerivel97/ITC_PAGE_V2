// components/Carousel/Carousel.tsx
import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

interface CarouselImage {
  id: number;
  image: string;
  alt: string;
}

interface CarouselProps {
  images: CarouselImage[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.carouselContainer}>
      <h1 className={styles.mainTitle}>Instituto Tecnológico de Cancún transformando el futuro</h1>
      <div className={styles.carousel}>
        {images.map((image, index) => {
          let slideClass = '';
          if (index === currentSlide) {
            slideClass = styles.active;
          } else if (
            index === currentSlide - 1 || 
            (currentSlide === 0 && index === images.length - 1)
          ) {
            slideClass = styles.prev;
          } else {
            slideClass = styles.next;
          }
          
          return (
            <div 
              key={image.id}
              className={`${styles.carouselSlide} ${slideClass}`}
            >
              <img 
                src={image.image} 
                alt={image.alt} 
                className={styles.carouselImage}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.carouselDots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselDot} ${index === currentSlide ? styles.activeDot : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;