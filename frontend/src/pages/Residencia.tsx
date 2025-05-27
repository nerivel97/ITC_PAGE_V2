import {
  ResidenciaFooter,
  ResidenciaInformation,
  ResidenciaRequirements,
} from '../components/Residencia';
import styles from '../components/Residencia/Residencia.module.css';

export default function Residencia() {
  return (
    <div className={styles.residencia}>
      <h1 className={styles.residencia__title}>Residencia profesional</h1>

      <ResidenciaInformation />

      <ResidenciaRequirements />

      <ResidenciaFooter />

      <br />
    </div>
  );
}
