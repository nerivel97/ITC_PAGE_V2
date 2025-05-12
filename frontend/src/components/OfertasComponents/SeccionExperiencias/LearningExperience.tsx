import React from 'react';
import styles from './LearningExperience.module.css';

const LearningExperience: React.FC = () => {
  // Reemplaza VIDEO_ID con el ID de tu video de Facebook
  const facebookVideoId = '1019507276169933'; // Ejemplo: '10156049485696729'
  const facebookVideoUrl = `https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F${facebookVideoId}%2F&show_text=false&width=560`;

  return (
    <section className={styles.learningExperience}>
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.mainTitle}>Descubre una experiencia única de aprendizaje</h2>
          <blockquote className={styles.inspirationalQuote}>
            "Estudiante de Ingeniería Mecatrónica nos platica de su proyecto seleccionado para el Programa Internacional Air and Space Program (IASP) 2024 en la NASA, en Huntsville, Alabama."
            <cite className={styles.quoteAuthor}>Andrés Enrique Tec Osorio</cite>
          </blockquote>
        </div>
        
        <div className={styles.videoContainer}>
          <iframe 
            src={facebookVideoUrl}
            width="560" 
            height="314" 
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;