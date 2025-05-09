import React from "react";
import styles from './Flayer.module.css';
import leftImg from "./FlayerImage/licenciatura.jpg";
import topRightImg from "./FlayerImage/maestria.jpg";
import bottomRightImg from "./FlayerImage/doctorado.jpg";

const FlayerOfertas: React.FC = () => {
  return (
    <div className={styles.fullWidthContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Oferta educativa</h1>
        <p className={styles.description}>
          Tu futuro comienza aquí. Descubre nuestras carreras y encuentra tu pasión.
        <br></br>
          En el ITC contamos con carreras que están diseñadas para ser tu punto de partida de tus metas y tus logros.
        </p>
        
       
        
        <div className={styles.separator}></div>
        
        <div className={styles.gridLayout}>
          {/* Columna izquierda (Licenciatura) */}
          <a href="/oferta-educativa" className={styles.leftColumn}>
            <img src={leftImg} alt="Licenciatura" className={styles.image} />
            <div className={styles.label}>Licenciatura</div>
          </a>
          
          {/* Columna derecha */}
          <div className={styles.rightColumn}>
            {/* Fila superior (Maestría) */}
            <a href="/oferta-educativa" className={styles.rightCard}>
              <img src={topRightImg} alt="Maestría" className={styles.rightImage} />
              <div className={styles.rightLabel}>Maestría</div>
            </a>
            
            {/* Fila inferior (Doctorado) */}
            <a href="/oferta-educativa" className={styles.rightCard}>
              <img src={bottomRightImg} alt="Doctorado" className={styles.rightImage} />
              <div className={styles.rightLabel}>Doctorado</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlayerOfertas;