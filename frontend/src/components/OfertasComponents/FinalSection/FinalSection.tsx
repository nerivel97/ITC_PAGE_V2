import React from 'react';
import styles from './FinalSection.module.css';
import mascotaImage from './Mascota.png';

// Importa todas las imágenes con tipado
import admisionesImg from './Imagenes/admisiones.png';
import noticiasImg from './Imagenes/noticias.jpg';
import eventosImg from './Imagenes/eventos.jpg';
import calendarioImg from './Imagenes/calendario.jpeg';
import plataformasImg from './Imagenes/plataforma.png';
import quienesSomosImg from './Imagenes/quienes.jpg';

interface SliderItem {
  id: number;
  gradient: string;
  text1: string;
  image: string; // TypeScript infiere el tipo de las importaciones de imágenes
}

const FinalSection = () => {
  const sliderItems: SliderItem[] = [
    {
      id: 1,
      gradient: "linear-gradient(to right, #ff7e5f, #feb47b)",
      text1: "Quienes Somos",
      image: quienesSomosImg
    },
    {
      id: 2,
      gradient: "linear-gradient(to right, #6a11cb, #2575fc)",
      text1: "Admisiones",
      image: admisionesImg
    },
    {
      id: 3,
      gradient: "linear-gradient(to right, #00c6ff, #0072ff)",
      text1: "Noticias",
      image: noticiasImg
    },
    {
      id: 4,
      gradient: "linear-gradient(to right, #ff512f, #dd2476)",
      text1: "Eventos",
      image: eventosImg
    },
    {
      id: 5,
      gradient: "linear-gradient(to right, #ffb6c1, #ff69b4)",
      text1: "Calendario",
      image: calendarioImg
    },
    {
      id: 6,
      gradient: "linear-gradient(to right, #ff9a8b, #ffc3a0)",
      text1: "Plataformas",
      image: plataformasImg
    }
  ];

  return (
    <section className={styles.final}>
      <img 
        className={styles.mascota} 
        src={mascotaImage} 
        alt="Mascota del instituto" 
      />
      <div className={styles.slider}>
        <div className={styles.list}>
          {sliderItems.map((item) => (
            <div 
              key={item.id} 
              className={styles.item} 
              style={{ '--position': item.id } as React.CSSProperties} // Tipo para propiedades CSS personalizadas
            >
              <div 
                className={styles.card2} 
                style={{ background: item.gradient }}
              >
                <p>{item.text1}</p>
                <div className={styles.imageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.text1} 
                    className={styles.cardImage} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalSection;