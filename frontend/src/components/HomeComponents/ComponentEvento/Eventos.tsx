import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Eventos.module.css';
import { fetchEventos } from '../../../admin/services/eventos.service';
import { IEvento } from '../../../admin/interfaces/evento.interface';

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<IEvento[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardsToShow = 3;
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
        setError(err.message || 'Error al cargar eventos');
      } finally {
        setLoading(false);
      }
    };

    loadEventos();
  }, []);

  // Manejo de errores de imagen
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('fallback')) {
      target.src = '/evento-fallback.jpg';
    }
  };

  // Navegación del carrusel
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1 <= eventos.length - cardsToShow ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 >= 0 ? prev - 1 : eventos.length - cardsToShow));
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando eventos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3 className={styles.errorTitle}>¡Ups! Algo salió mal</h3>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.errorButton}
          onClick={() => window.location.reload()}
        >
          Recargar página
        </button>
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No hay eventos activos</h3>
        <p>Actualmente no hay eventos programados. Vuelve a revisar más tarde.</p>
      </div>
    );
  }

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
                      onClick={() => navigate(`/eventos/${evento.id_evento}`)}
                    >
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