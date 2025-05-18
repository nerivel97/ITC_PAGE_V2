import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Page_Noticias_c.module.css';
import { getNoticiaById } from '../../../admin/services/noticias.service';
import { INoticia } from '../../../admin/interfaces/noticia.interface';
import { FaSync} from 'react-icons/fa';

const Page_Noticias_c = () => {
  const { id } = useParams<{ id: string }>();
  const [noticia, setNoticia] = useState<INoticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const cargarNoticia = async () => {
      try {
        if (!id) {
          throw new Error('ID de noticia no proporcionado');
        }
        
        const data = await getNoticiaById(parseInt(id));
        setNoticia(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la noticia');
        setLoading(false);
        console.error(err);
      }
    };

    cargarNoticia();
  }, [id]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/800x400?text=Imagen+no+disponible';
    target.alt = 'Imagen no disponible';
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('es-MX', options);
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return dateString;
    }
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
  }

  if (!noticia) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIllustration} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#f5f5f5"/>
          <path d="M70,70 L130,130 M70,130 L130,70" stroke="#ccc" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <h3>Noticia no encontrada</h3>
        <p>La noticia que buscas no existe o ha sido eliminada.</p>
      </div>
    );
  }

  return (
    <div className={styles.noticiaContainer}>
      <h1 className={styles.titulo}>{noticia.nombre_noticia}</h1>
      <div className={styles.meta}>
        <span className={styles.fechaPublicacion}>{formatDate(noticia.fecha_publicacion)}</span>
      </div>

      {noticia.imagen && (
        <div className={styles.imageSection}>
          <img 
            src={noticia.imagen} 
            alt="Imagen de la noticia" 
            onError={handleImageError}
            className={styles.noticiaImagen}
          />
        </div>
      )}

      <div className={styles.byline}>
        <span>Por: {noticia.autor}</span>
      </div>

      <div className={styles.contenido}>
        <p>{noticia.descripcion}</p>
      </div>
    </div>
  );
};

export default Page_Noticias_c;