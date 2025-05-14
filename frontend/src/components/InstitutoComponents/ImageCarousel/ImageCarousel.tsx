import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

interface ImageItem {
  src: string;
  alt?: string;
}

interface ImageCarouselProps {
  images?: ImageItem[];
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images = [],
  interval = 5000,
}) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // Autoplay
  useEffect(() => {
    if (total < 2) return;

    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, interval);

    return () => clearInterval(timer);
  }, [total, interval]);

  if (total === 0) return null;

  return (
    <div className="mini-carousel" role="region" aria-label="Carrusel de imágenes">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt || `Imagen ${i + 1}`}
          className={`mini-carousel-image${i === current ? ' active' : ''}`}
        />
      ))}

      {total > 1 && (
        <div className="mini-carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`mini-dot${i === current ? ' active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
