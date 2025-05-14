import React from 'react';
import styles from './Somos.module.css';

interface QuienesSomosProps {
  titulo: string;
  descripcion?: string;
  botonTexto?: string;
  imagenUrl?: string;
}

const Somos: React.FC<QuienesSomosProps> = ({ 
  titulo, 
  descripcion, 
  botonTexto, 
  imagenUrl, 
}) => {
  return (
    <div className={styles.somosContainer}>
      <div className={styles.tituloContainer}>
        <h2 className={styles.somosTitle}>{titulo}</h2>
      </div>

      {(descripcion || botonTexto || imagenUrl) && (
        <div className={`${styles.mainContent} `}>
          {imagenUrl && (
            <div className={styles.imagenContainer}>
              <img src={imagenUrl} alt="Imagen representativa" className={styles.somosImage} />
            </div>
          )}

          {(descripcion || botonTexto) && (
            <div className={styles.textoContainer}>
              {descripcion && <p className={styles.somosText}>{descripcion}</p>}
              {botonTexto && <button className={styles.somosButton}>{botonTexto}</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Somos;