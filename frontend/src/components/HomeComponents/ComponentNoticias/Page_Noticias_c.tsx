import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaSync } from 'react-icons/fa';
import styles from './Page_Noticias_c.module.css';
import { getNoticiaById } from '../../../admin/services/noticias.service';
import { INoticia } from '../../../admin/interfaces/noticia.interface';

const Page_Noticias_c = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [noticia, setNoticia] = useState<INoticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const cargarNoticia = async () => {
      try {
        if (!id) throw new Error('ID de noticia no proporcionado');
        const data = await getNoticiaById(parseInt(id));
        setNoticia(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la noticia');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarNoticia();
  }, [id]);

  const handleGoBack = () => {
    if (location.state?.fromHome) {
      navigate('/', { 
        state: { scrollToNews: true },
        replace: true
      });
    } else {
      navigate('/', { 
        state: { scrollToNews: true },
        replace: true 
      });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/noticia-default.jpg';
    target.alt = 'Imagen no disponible';
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
        <p>Cargando noticia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>¡Ups! Algo salió mal</h3>
        <p>{error}</p>
        <button 
          className={styles.errorButton}
          onClick={() => window.location.reload()}
        >
          <FaSync /> Reintentar
        </button>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className={styles.emptyContainer}>
        <h3>Noticia no encontrada</h3>
        <p>La noticia solicitada no existe o fue eliminada</p>
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
        <div className={styles.newsBanner}>
          <img 
            src={noticia.imagen || '/noticia-default.jpg'} 
            alt={noticia.nombre_noticia}
            className={styles.bannerImage}
            onError={handleImageError}
          />
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{noticia.nombre_noticia}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className={styles.contentWrapper}>
        <div className={styles.noticiaContainer}>
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
                  <FaCalendarAlt /> Información Adicional
                </h2>
                <div className={styles.dateInfo}>
                  <div className={styles.dateItem}>
                    <strong>Autor de la publicación:</strong>
                    <span>{noticia.autor}</span>
                  </div>
                  <div className={styles.dateItem}>
                    <strong>Fecha de publicación:</strong>
                    <span>{formatDate(noticia.fecha_publicacion)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Descripción del Evento</h2>
              <div className={styles.descriptionContent}>
                {noticia.descripcion.split('\n').map((paragraph, index) => (
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

export default Page_Noticias_c;