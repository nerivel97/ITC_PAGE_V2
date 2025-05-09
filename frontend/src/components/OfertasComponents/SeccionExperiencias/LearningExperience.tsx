import React from 'react';
import styles from './LearningExperience.module.css';

const LearningExperience: React.FC = () => {
  return (
    <section className={styles.learningExperience}>
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h1 className={styles.mainTitle}>Descubre una experiencia única de aprendizaje</h1>
          <blockquote className={styles.inspirationalQuote}>
            "Nunca consideres el estudio como una obligación, sino como una oportunidad para penetrar en el bello y maravilloso mundo del saber"
            <cite className={styles.quoteAuthor}>Albert Einstein</cite>
          </blockquote>
        </div>
        
        <div className={styles.videoContainer}>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/VIDEO_ID" 
            title="Video institucional" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;