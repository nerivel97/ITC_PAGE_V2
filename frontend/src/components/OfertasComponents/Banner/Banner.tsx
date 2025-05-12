import styles from './Banner.module.css';
import bannerImage from './baner.png'; // Asegúrate de tener la imagen en la carpeta

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <img
        className={styles.banner}
        src={bannerImage}
        alt="Estudiantes del TecNM Cancún en laboratorios y aulas"
        title='Banner Oferta Educativa'
      />
      <div className={styles.bannerText}>
        <h1>Transforma Tu Futuro en el TecNM Cancún</h1>
      </div>
    </div>
  );
};

export default Banner;