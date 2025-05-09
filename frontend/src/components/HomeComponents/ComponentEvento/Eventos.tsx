import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
      } catch (err) {
        setError('Error al cargar eventos');
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

  // Estados de carga
  if (loading) return <div className={styles.loading}>Cargando eventos...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (eventos.length === 0) return <div className={styles.empty}>No hay eventos activos</div>;

  return (
    <section className={styles.eventosSection}>
      <div className={styles.carouselContainer}>
        <button 
          className={styles.navButton} 
          onClick={prevSlide}
          aria-label="Eventos anteriores"
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
                    src={evento.imagen} 
                    alt={evento.nombre_evento} 
                    className={styles.imagenEvento}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/imagen-fallback.jpg';
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
        >
          <FaChevronRight className={styles.navIcon} />
        </button>
      </div>

      {/* Indicadores de paginación */}
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
    </section>
  );
};

export default Eventos;