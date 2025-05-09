import styles from './Banner.module.css';
import bannerImage from './baner.png'; // Asegúrate de tener la imagen en la carpeta

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <img
        className={styles.banner}
        src={bannerImage}
        alt="Banner del Tecnológico Nacional de México"
      />
      <div className={styles.bannerText}>
        <h1>Sé parte del Tecnológico Nacional de México</h1>
      </div>
    </div>
  );
};

export default Banner;