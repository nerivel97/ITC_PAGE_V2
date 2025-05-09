import React from 'react';
import styles from './estilo.module.css';

// Importa tus imágenes
import carreraImg from './imagesCards/carrera.jpg';
import posgradoImg from './imagesCards/posgrado.jpg';
import actividadImg from './imagesCards/actividad.jpg';
import estudianteImg from './imagesCards/estudiante.jpg';
import egresadoImg from './imagesCards/egresado.jpg';

type CardKey = 'carrera' | 'posgrado' | 'actividad' | 'estudiante' | 'egresado';

interface Card {
  id: CardKey;
  title: string;
  number: string;
  description: string;
}

interface CardsProps {
  cards: Card[];
}

const imageMap: Record<CardKey, string> = {
  carrera: carreraImg,
  posgrado: posgradoImg,
  actividad: actividadImg,
  estudiante: estudianteImg,
  egresado: egresadoImg
};

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Orgullosamente Tucanes  </h2>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.cardsContainer}>
          {cards.map(card => (
            <div key={card.id} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardImageContainer}>
                  <img src={imageMap[card.id]} alt={card.title} className={styles.cardImage} />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardNumber}>{card.number}</p>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;