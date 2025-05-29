import { Helmet } from 'react-helmet';
import styles from '../components/Residencia/Residencia.module.css';

import {
  ResidenciaBanner,
  ResidenciaDocumentation,
  ResidenciaFooter,
  ResidenciaInformation,
  ResidenciaRequirements,
  ResidenciaSlider,
} from '../components/Residencia';

export default function Residencia() {
  return (
    <div className={styles.residencia}>
      <Helmet>
        <title>Residencia Profesional</title>
        <meta
          name='description'
          content='Información sobre la Residencia Profesional en el Instituto Tecnológico de Cancún.'
        />
      </Helmet>

      <ResidenciaBanner />

      <ResidenciaInformation />

      <ResidenciaSlider />

      <ResidenciaRequirements />

      <ResidenciaFooter />

      <ResidenciaDocumentation />

      <br />
    </div>
  );
}
