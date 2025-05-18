import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Page_Eventos_c.module.css';
import { getEventoById } from '../../../admin/services/eventos.service';
import { IEvento } from '../../../admin/interfaces/evento.interface';

const Page_Eventos_c = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [evento, setEvento] = useState<IEvento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const fetchEvento = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('ID de evento no proporcionado');
        
        const eventoData = await getEventoById(parseInt(id));
        setEvento(eventoData);
        setError(null);
      } catch (err: any) {
        console.error('Error al cargar el evento:', err);
        setError(err.message || 'Error al cargar los detalles del evento');
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  // Función mejorada para volver
  const handleGoBack = () => {
    if (location.state?.fromHome) {
      // Si venimos de Home, regresamos ahí y hacemos scroll
      navigate('/', { 
        state: { scrollToEvents: true },
        replace: true
      });
    } else {
      // Si venimos de la lista de eventos, regresamos ahí
      navigate('/', { 
        state: { scrollToEvents: true },
        replace: true });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando detalles del evento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>¡Ups! Algo salió mal</h3>
        <p>{error}</p>
        <button 
          className={styles.backButton}
          onClick={handleGoBack}
        >
          <FaArrowLeft /> Volver
        </button>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className={styles.emptyContainer}>
        <h3>Evento no encontrado</h3>
        <p>El evento solicitado no existe o fue eliminado</p>
        <button 
          className={styles.backButton}
          onClick={handleGoBack}
        >
          <FaArrowLeft /> Volver
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Banner */}
      <div className={styles.bannerContainer}>
        <div className={styles.eventBanner}>
          <img 
            src={evento.imagen || '/evento-default.jpg'} 
            alt={evento.nombre_evento}
            className={styles.bannerImage}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/evento-default.jpg';
            }}
          />
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{evento.nombre_evento}</h1>
              <div className={styles.bannerTags}>
                {evento.categoria && (
                  <span className={styles.bannerTag}>{evento.categoria}</span>
                )}
                {evento.estado && (
                  <span className={`${styles.bannerTag} ${styles[evento.estado.toLowerCase()]}`}>
                    {evento.estado}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className={styles.contentWrapper}>
        <div className={styles.eventoContainer}>
          <button 
            className={styles.backButton}
            onClick={handleGoBack}
          >
            <FaArrowLeft /> Volver
          </button>

          <div className={styles.contentContainer}>
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h2 className={styles.sectionTitle}>
                  <FaCalendarAlt /> Fechas del Evento
                </h2>
                <div className={styles.dateInfo}>
                  <div className={styles.dateItem}>
                    <strong>Inicio:</strong>
                    <span>{formatDate(evento.fecha_inicio)}</span>
                  </div>
                  <div className={styles.dateItem}>
                    <strong>Fin:</strong>
                    <span>{formatDate(evento.fecha_final)}</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h2 className={styles.sectionTitle}>
                  <FaMapMarkerAlt /> Información Adicional
                </h2>
                <p className={styles.locationText}>
                  {'Para más detalles sobre este evento, contacta a los organizadores.'}
                </p>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Descripción del Evento</h2>
              <div className={styles.descriptionContent}>
                {evento.descripcion.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page_Eventos_c;