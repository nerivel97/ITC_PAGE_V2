import styles from './ResidenciaBanner.module.css';

export function ResidenciaBanner() {
  return (
    <div className={styles.residenciaBanner}>
      <h1 className={styles.residenciaBanner__title}>Residencia Profesional</h1>

      <div className={styles.residenciaBanner__gradient}></div>

      <img
        className={styles.residenciaBanner__image}
        src='https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt=''
        title='Residencia Profesional'
      />
    </div>
  );
}
