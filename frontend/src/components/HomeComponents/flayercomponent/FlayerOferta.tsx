import React from "react";
import styles from './Flayer.module.css';
import licenciaturaImg from "./FlayerImage/licenciatura.png";
import maestriaImg from "./FlayerImage/maestrias.jpg";
import doctoradoImg from "./FlayerImage/doctorado.png";

const FlayerOfertas: React.FC = () => {
  return (
    <div className={styles.fullWidthContainer}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Oferta educativa</h2>
        <p className={styles.description}>
          Tu futuro comienza aquí. Descubre nuestras carreras y encuentra tu pasión.
          <br />
          En el ITC contamos con carreras que están diseñadas para ser tu punto de partida de tus metas y tus logros.
        </p>
        
        <div className={styles.separator}></div>
        
        <div className={styles.gridContainer}>
          {/* Licenciatura */}
          <a href="/oferta-educativa" className={styles.gridCard}>
            <img src={licenciaturaImg} alt="Licenciatura" 
            title="Licenciatura ITC"
            className={styles.image} />
            <div className={styles.cardLabel}>Licenciatura</div>
          </a>
          
          {/* Maestría */}
          <a href="/oferta-educativa" className={styles.gridCard}>
            <img src={maestriaImg} alt="Maestría" 
            title="Maestria ITC"
            className={styles.image} />
            <div className={styles.cardLabel}>Maestría</div>
          </a>
          
          {/* Doctorado */}
          <a href="/oferta-educativa" className={styles.gridCard}>
            <img src={doctoradoImg} alt="Doctorado"
            title="Doctorado ITC"
            className={styles.image} />
            <div className={styles.cardLabel}>Doctorado</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FlayerOfertas;