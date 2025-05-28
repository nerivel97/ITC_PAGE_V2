import Button from '../components/Button/Button';
import Calendario from '../assets/Fotos/Calendario.png';
import styles from './calendario.module.css';

export default function CalendarioEscolar() {
  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Calendario Escolar 2025</h1>

      <img
        src={Calendario}
        alt="Calendario escolar 2025 UNAM"
        className={styles.imagen}
      />

      <a href={Calendario} download="calendario2025.png" className={styles.boton}>
        <Button label="Descargar Imagen" />
      </a>
    </div>
  );
  
}

