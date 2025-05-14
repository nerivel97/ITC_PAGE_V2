import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Eventos.module.css';

// Definimos la interfaz para los items de evento
export interface EventoItem {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionCompleta: string;
  videoUrl: string;
  enlace: string;
  fechaInicio: string;
  fechaFin: string;
}

// Definimos las props del componente
interface EventosProps {
  eventos: EventoItem[];
}

const Eventos: React.FC<EventosProps> = ({ eventos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3; // Número de tarjetas visibles

  // Formateador de fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Navegación del carrusel
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1 <= eventos.length - cardsToShow ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : eventos.length - cardsToShow));
  };

  // Estado vacío
  if (eventos.length === 0) return (
    <div className={styles.emptyState}>
      <svg className={styles.emptyIllustration} viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="#000f92"/>
        <path d="M70,70 L130,130 M70,130 L130,70" stroke="#000f92" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <h3>No hay eventos activos</h3>
      <p>Actualmente no hay eventos programados. Vuelve a revisar más tarde.</p>
    </div>
  );

  return (
    <section className={styles.eventosSection}>
      <div className={styles.carouselContainer}>
        <button 
          className={styles.navButton} 
          onClick={prevSlide}
          aria-label="Eventos anteriores"
          disabled={eventos.length <= cardsToShow}
        >
          <FaChevronLeft className={styles.navIcon} />
        </button>

        <div className={styles.carouselTrack}>
          <div
            className={styles.carouselCards}
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              width: `${(eventos.length * 100 / cardsToShow)}%`
            }}
          >
            {eventos.map((evento) => (
              <div key={evento.id} className={styles.card}>
                <div className={styles.imagePlaceholder}>
                  <video 
                    src={evento.videoUrl} 
                    autoPlay
                    loop
                    muted
                    className={styles.imagenEvento}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{evento.titulo}</h3>
                  <p className={styles.desc}>
                    {evento.descripcion.substring(0, 100)}{evento.descripcion.length > 100 && '...'}
                  </p>

                  <div className={styles.detailsFooter}>
                    <div className={styles.fechasContainer}>
                      <span className={styles.fecha}>
                        <strong>Inicio:</strong> {formatDate(evento.fechaInicio)}
                      </span>
                      <span className={styles.fecha}>
                        <strong>Fin:</strong> {formatDate(evento.fechaFin)}
                      </span>
                    </div>
                    <button className={styles.buttonhover}>
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.navButton} 
          onClick={nextSlide}
          aria-label="Siguientes eventos"
          disabled={eventos.length <= cardsToShow}
        >
          <FaChevronRight className={styles.navIcon} />
        </button>
      </div>

      {/* Indicadores de paginación */}
      {eventos.length > cardsToShow && (
        <div className={styles.dotsContainer}>
          {Array.from({ length: Math.max(eventos.length - cardsToShow + 1, 1) }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Eventos;