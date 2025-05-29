import React from 'react';
import styles from './Somos.module.css';

interface QuienesSomosProps {
  titulo: string;
  descripcion?: string;
  botonTexto?: string;
  imagenUrl?: string;
  onButtonClick?: () => void; // Nueva prop para manejar el clic del botón
}

const Somos: React.FC<QuienesSomosProps> = ({ 
  titulo, 
  descripcion, 
  botonTexto, 
  imagenUrl,
  onButtonClick // Añadimos la nueva prop
}) => {
  return (
    <div className={styles.somosContainer}>
      <div className={styles.tituloContainer}>
        <h1 className={styles.somosTitle}>{titulo}</h1>
      </div>

      {(descripcion || botonTexto || imagenUrl) && (
        <div className={`${styles.mainContent} `}>
          {imagenUrl && (
            <div className={styles.imagenContainer}>
              <img src={imagenUrl} 
              alt="Tucan TECNM"
              title="Tucan sociedad de alumnos TECNM" 
              className={styles.somosImage} />
            </div>
          )}

          {(descripcion || botonTexto) && (
            <div className={styles.textoContainer}>
              {descripcion && <p className={styles.somosText}>{descripcion}</p>}
              {botonTexto && (
                <button 
                  className={styles.somosButton}
                  onClick={onButtonClick} // Usamos la nueva prop aquí
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