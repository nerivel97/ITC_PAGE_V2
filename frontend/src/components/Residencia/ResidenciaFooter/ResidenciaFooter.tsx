import styles from './ResidenciaFooter.module.css';

export function ResidenciaFooter() {
  return (
    <footer className={styles.doubts}>
      <section className={styles.contact}>
        <h2 className={styles.contact__text}>Contáctenos</h2>
        <button className={styles.contact__email}>Correo</button>
      </section>

      <section className={styles.schedule}>
        <h2 className={styles.schedule__text}>Horario de atención</h2>
        <p className={styles.schedule__time}>9:00a.m - 4:00p.m</p>
      </section>
    </footer>
  );
}
