import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSync } from 'react-icons/fa';
import styles from './Eventos.module.css';
import { getEventos } from '../../../core/services/eventos.service';
import { IEvento } from '../../../core/interfaces/evento.interface';

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Obtener eventos
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventosData = await getEventos();
        
        // Filtra solo eventos activos si es necesario
        const eventosActivos = eventosData.filter(evento => evento.estado === 'Activo');
        
        setEventos(eventosActivos);
        setError(null);
      } catch (err) {
        setError('No pudimos cargar los eventos. Por favor verifica tu conexión e intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Navegación del carrusel
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1 <= eventos.length - cardsToShow ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : eventos.length - cardsToShow));
  };

  // Estado de carga mejorado
  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Cargando eventos...</p>
    </div>
  );

  // Estado de error mejorado
  if (error) return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <svg className={styles.errorIllustration} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#e5e5fc"/>
          <path d="M100,30 L105,140 L95,140 Z" fill="#000f92"/>
          <circle cx="100" cy="170" r="10" fill="#000f92"/>
        </svg>
        <h3 className={styles.errorTitle}>¡Ups! Algo salió mal</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.errorButton}
          onClick={() => window.location.reload()}
        >
          <FaSync className={styles.refreshIcon} /> Reintentar
        </button>
      </div>
    </div>
  );

  // Estado vacío mejorado
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
              <div key={evento.id_evento} className={styles.card}>
                <div className={styles.imagePlaceholder}>
                  <img 
                    src={evento.imagen || '/evento-placeholder.jpg'} 
                    alt={evento.nombre_evento} 
                    className={styles.imagenEvento}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/evento-fallback.jpg';
                    }}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.title}>{evento.nombre_evento}</h3>
                  <p className={styles.desc}>
                    {evento.descripcion.substring(0, 100)}{evento.descripcion.length > 100 && '...'}
                  </p>

                  <div className={styles.detailsFooter}>
                    <div className={styles.fechasContainer}>
                      <span className={styles.fecha}>
                        <strong>Inicio:</strong> {formatDate(evento.fecha_inicio)}
                      </span>
                      <span className={styles.fecha}>
                        <strong>Fin:</strong> {formatDate(evento.fecha_final)}
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