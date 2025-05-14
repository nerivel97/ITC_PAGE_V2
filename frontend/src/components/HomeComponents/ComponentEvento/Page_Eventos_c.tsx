import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Page_Eventos_c.module.css';
import { getEventoById } from '../../../admin/services/eventos.service';
import { IEvento } from '../../../admin/interfaces/evento.interface';

const Page_Eventos_c = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [evento, setEvento] = useState<IEvento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formateador de fechas
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

  // Obtener evento por ID
  useEffect(() => {
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
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Volver a eventos
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
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Volver a eventos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.eventoContainer}>
      {/* Botón de regreso */}
      <button 
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Volver a eventos
      </button>

      {/* Encabezado con imagen */}
      <div className={styles.heroSection}>
        <img 
          src={evento.imagen || '/evento-default.jpg'} 
          alt={evento.nombre_evento}
          className={styles.heroImage}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/evento-default.jpg';
          }}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.eventTitle}>{evento.nombre_evento}</h1>
          <div className={styles.eventMeta}>
            <span className={styles.eventCategory}>{evento.categoria}</span>
            <span className={styles.eventStatus}>{evento.estado}</span>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className={styles.contentContainer}>
        {/* Sección de información */}
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
              {/* Aquí puedes agregar más información si necesitas */}
              Para más detalles sobre este evento, por favor contacta a los organizadores.
            </p>
          </div>
        </div>

        {/* Descripción completa */}
        <div className={styles.descriptionSection}>
          <h2 className={styles.sectionTitle}>Descripción del Evento</h2>
          <div className={styles.descriptionContent}>
            {evento.descripcion.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className={styles.actionsSection}>
          <button className={styles.primaryButton}>
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page_Eventos_c;