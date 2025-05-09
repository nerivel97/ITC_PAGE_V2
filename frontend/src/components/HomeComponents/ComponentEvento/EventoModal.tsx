import React from 'react';
import styles from './Eventos.module.css';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  descripcionCompleta: string;
  videoUrl: string;
  enlace: string;
  fechaInicio: string;
  fechaFin: string;
}

interface EventoModalProps {
  evento: Evento | null;
  onClose: () => void;
}

const EventoModal: React.FC<EventoModalProps> = ({ evento, onClose }) => {
  if (!evento) return null;

  // Función para formatear fecha en formato legible (ej: "15 de Mayo, 2024")
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Función para formatear hora (ej: "09:00 AM")
  const formatTime = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    return new Date(dateString).toLocaleTimeString('es-ES', options);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
          &times;
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{evento.titulo}</h2>
        </div>

        <div className={styles.modalVideoContainer}>
          <video autoPlay loop muted playsInline>
            <source src={evento.videoUrl} type="video/webm" />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>

        <div className={styles.modalDatesContainer}>
          <div className={styles.dateBox}>
            <span className={styles.dateLabel}>Inicia:</span>
            <span className={styles.dateValue}>{formatDate(evento.fechaInicio)}</span>
            <span className={styles.timeValue}>{formatTime(evento.fechaInicio)}</span>
          </div>

          <div className={styles.dateBox}>
            <span className={styles.dateLabel}>Finaliza:</span>
            <span className={styles.dateValue}>{formatDate(evento.fechaFin)}</span>
            <span className={styles.timeValue}>{formatTime(evento.fechaFin)}</span>
          </div>
        </div>

        <div className={styles.modalBody}>
          <h3 className={styles.sectionTitle}>Detalles del Evento</h3>
          <p className={styles.modalDescription}>
            {evento.descripcionCompleta || evento.descripcion}
          </p>
        </div>

        <div className={styles.modalFooter}>
          <a 
            href={evento.enlace} 
            className={styles.modalButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Más información
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventoModal;