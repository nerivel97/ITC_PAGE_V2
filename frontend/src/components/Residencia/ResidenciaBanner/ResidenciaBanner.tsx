import imageBanner from '../../../assets/images/residencia/residencia-profesional-banner.jpg';
import styles from './ResidenciaBanner.module.css';

export function ResidenciaBanner() {
  return (
    <div className={styles.residenciaBanner}>
      <h1 className={styles.residenciaBanner__title}>Residencia Profesional</h1>

      <div className={styles.residenciaBanner__gradient}></div>

      <img
        className={styles.residenciaBanner__image}
        src={imageBanner}
        alt=''
        title='Residencia Profesional'
      />
    </div>
  );
}
