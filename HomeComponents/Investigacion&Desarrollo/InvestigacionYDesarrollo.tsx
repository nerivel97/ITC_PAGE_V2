import React from 'react';
import styles from './InvestigacionYDesarrollo.module.css';

export interface CardData {
  image: string;
  title: string;
  link: string; // Nueva propiedad para el enlace
}

export interface InvestigacionYDesarrolloProps {
  description: string;
  cards: CardData[];
}

const InvestigacionYDesarrollo: React.FC<InvestigacionYDesarrolloProps> = ({ description, cards }) => {
  return (
    <section className={styles.mainContainer}>
      <h2 className={styles.mainTitle}>Investigación y Desarrollo</h2>
      <p className={styles.mainDescription}>{description}</p>

      <div className={styles.cardsGrid}>
        {cards.map((card, idx) => (
          <a 
            href={card.link} 
            className={styles.cardLink} 
            key={idx}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className={styles.simpleCard}>
              <div className={styles.imageContainer}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.cardImage}
                  title={card.title}
                />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InvestigacionYDesarrollo;