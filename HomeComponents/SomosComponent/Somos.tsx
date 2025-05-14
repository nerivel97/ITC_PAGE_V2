import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Somos.module.css';

interface QuienesSomosProps {
  titulo: string;
  descripcion?: string;
  botonTexto?: string;
  botonRuta?: string; // Nueva prop para la ruta
  imagenUrl?: string;
  orientacion?: 'izquierda' | 'derecha';
}

const Somos: React.FC<QuienesSomosProps> = ({ 
  titulo, 
  descripcion, 
  botonTexto, 
  botonRuta,
  imagenUrl, 
  orientacion = 'izquierda'
}) => {
  const navigate = useNavigate();

  const handleBotonClick = () => {
    if (!botonRuta) return;
    
    // Verificar si es una URL externa
    if (/^(http|https):\/\//.test(botonRuta)) {
      window.open(botonRuta, '_blank', 'noopener,noreferrer');
    } else {
      navigate(botonRuta); // Navegación interna
    }
  };

  return (
    <div className={styles.somosContainer}>
      <div className={styles.tituloContainer}>
        <h2 className={styles.somosTitle}>{titulo}</h2>
      </div>

      {(descripcion || botonTexto || imagenUrl) && (
        <div className={`${styles.mainContent} ${orientacion === 'derecha' ? styles.reverseLayout : ''}`}>
          {imagenUrl && (
            <div className={styles.imagenContainer}>
              <img src={imagenUrl} alt="Imagen representativa" className={styles.somosImage} />
            </div>
          )}

          {(descripcion || botonTexto) && (
            <div className={styles.textoContainer}>
              {descripcion && <p className={styles.somosText}>{descripcion}</p>}
              
              {botonTexto && botonRuta && (
                <button 
                  className={styles.somosButton}
                  onClick={handleBotonClick}
                  role="link"
                >
                  {botonTexto}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Somos;