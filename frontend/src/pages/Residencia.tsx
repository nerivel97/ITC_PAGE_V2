import {
  ResidenciaBanner,
  ResidenciaFooter,
  ResidenciaInformation,
  ResidenciaRequirements,
} from '../components/Residencia';
import styles from '../components/Residencia/Residencia.module.css';

export default function Residencia() {
  return (
    <div className={styles.residencia}>
      <ResidenciaBanner />

      <ResidenciaInformation />

      <ResidenciaRequirements />

      <ResidenciaFooter />

      <br />
    </div>
  );
}
