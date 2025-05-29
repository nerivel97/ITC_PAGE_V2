import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaSync } from 'react-icons/fa';
import styles from './Eventos.module.css';
import { fetchEventos } from '../../../admin/services/eventos.service';
import { IEvento } from '../../../admin/interfaces/evento.interface';

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Formateador de fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Efecto para responsive
  useEffect(() => {
    const updateCardsToShow = () => {
      if (!carouselRef.current) return;
      
      const containerWidth = carouselRef.current.offsetWidth;
      if (containerWidth < 768) {
        setCardsToShow(1);
      } else if (containerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
      setCurrentIndex(0);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Obtener eventos
  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);
        const eventosData = await fetchEventos();
        
        const eventosActivos = eventosData
          .filter(evento => evento.estado.toLowerCase() === 'activo')
          .sort((a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime());
        
        setEventos(eventosActivos);
        setError(null);
      } catch (err: any) {
        console.error('Error loading events:', err);
        setError('Error al cargar eventos');
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, []);

  // Navegar al detalle del evento
  const navigateToEvento = (id_evento: number) => {
    navigate(`/eventos/${id_evento}`, {
      state: { fromHome: window.location.pathname === '/' }
    });
  };

  // Manejo de errores de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('fallback')) {
      target.src = '/evento-fallback.jpg';
    }
  };

  // Navegación del carrusel
  const nextSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.ceil(eventos.length / cardsToShow) - 1;
      return prev < maxIndex ? prev + 1 : 0;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.ceil(eventos.length / cardsToShow) - 1;
      return prev > 0 ? prev - 1 : maxIndex;
    });
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
          <path d="M100,30 L105,140 L95,140 Z" fill="#4f72e6"/>
          <circle cx="100" cy="170" r="10" fill="#4f72e6"/>
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
        <circle cx="100" cy="100" r="90" fill="#ffffff"/>
        <path d="M70,70 L130,130 M70,130 L130,70" stroke="#000f92" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <h3>No hay eventos activos</h3>
      <p>Actualmente no hay eventos programados. Vuelve a revisar más tarde.</p>
    </div>
  );

  return (
    <section id="eventos-section" className={styles.eventosSection}>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer} ref={carouselRef}>
          <div className={styles.carouselTrack}>
            <div
              className={styles.carouselCards}
              style={{ 
                transform: cardsToShow === 1 
                  ? `translateX(-${currentIndex * 100}%)`
                  : `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
                gridTemplateColumns: `repeat(${eventos.length}, ${
                  cardsToShow === 1 ? '100%' : 
                  cardsToShow === 2 ? 'calc(50% - 10px)' : 
                  'calc(33.333% - 13.333px)'
                })`
              }}
            >
              {eventos.map((evento) => (
                <div key={evento.id_evento} className={styles.card}>
                  <div className={styles.imagePlaceholder}>
                    <img 
                      src={evento.imagen || '/evento-placeholder.jpg'} 
                      alt={evento.nombre_evento} 
                      className={styles.imagenEvento}
                      onError={handleImageError}
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
                      <button 
                        className={styles.buttonhover}
                        onClick={() => navigateToEvento(evento.id_evento!)}
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.navigationControls}>
          <button 
            className={styles.navButton} 
            onClick={prevSlide}
            aria-label="Eventos anteriores"
            disabled={eventos.length <= cardsToShow}
          >
            <FaChevronLeft className={styles.navIcon} />
            <span className={styles.navText}>Anterior</span>
          </button>

          {eventos.length > cardsToShow && (
            <div className={styles.dotsContainer}>
              {Array.from({ length: Math.ceil(eventos.length / cardsToShow) }).map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === currentIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          <button 
            className={styles.navButton} 
            onClick={nextSlide}
            aria-label="Siguientes eventos"
            disabled={eventos.length <= cardsToShow}
          >
            <span className={styles.navText}>Siguiente</span>
            <FaChevronRight className={styles.navIcon} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Eventos;