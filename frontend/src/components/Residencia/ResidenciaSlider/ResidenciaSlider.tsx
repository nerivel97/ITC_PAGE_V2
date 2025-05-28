// spell-checker:disable
import airsaLogo from '../../../assets/images/residencia/airsa_mep_logo.png';
import amicLogo from '../../../assets/images/residencia/asociación_mexicana_de_la_industria_de_la_construcción_logo.png';
import cecyteLogo from '../../../assets/images/residencia/colegio_de_estudios_científicos_y_tecnológicos_de_quintana_roo_logo.png';
import juarezLogo from '../../../assets/images/residencia/juarez_asociados_consultores_logo.png';
import secontrolLogo from '../../../assets/images/residencia/secontrol_automatización_logo.png';
// spell-checker:enable

import styles from './ResidenciaSlider.module.css';

interface ResidenciaSliderImage {
  url: string;
  title: string;
  alt: string;
}

export function ResidenciaSlider() {
  // spell-checker:disable
  const images: ResidenciaSliderImage[] = [
    {
      url: amicLogo,
      title: 'Asociación Mexicana de la Industria de la Construcción',
      alt: 'Asociación conformada por empresarios, fundada en el año 2007 como una Asociación Civil, entre los miembros se encuentran constructores, proveedores y prestadores de servicios, todos dedicados a las diversas ramas y especialidades dentro de la Industria de la Construcción.',
    },
    {
      url: secontrolLogo,
      title: 'SEcontrol automatización',
      alt: 'Empresa desarrollada de tecnología para control y automatización de sistemas industriales, hoteleros y habitacionales.',
    },
    {
      url: juarezLogo,
      title: 'Juarez & Asociados Consultores',
      alt: 'Empresa de consultoría empresarial que ofrece una amplia gama de servicios a sus clientes, incluyendo consultoría contable, tributaria, financiera, laboral y de gestión, desarrollo empresarial, capacitaciones y cursos de especialización, y asesoría en trabajos de investigación.',
    },
    {
      url: cecyteLogo,
      title:
        'Colegio de Estudios Científicos y Tecnológicos del Estado de Quintana Roo',
      alt: 'Es un sistema educativo público que ofrece bachillerato tecnológico en la entidad. Los CECyTE son planteles que imparten bachillerato tecnológico, brindando una formación tanto general como técnica, que permite a los egresados obtener un título profesional además del bachillerato.',
    },
    {
      url: airsaLogo,
      title: 'AIRSA MEP',
      alt: 'Es una empresa experta en Aires acondicionados, fundada en el año de 1970, con domilicio en la ciudad de Mérida, Yuc. ha logrado consolidarse y mantenerse como líder en e  ramo de instalacion, venta y reparacion  de Aires acondicioado y ventilacion, siendo reconocida su penetración y prestigio en la región Sureste de la República Mexicana.',
    },
  ];
  // spell-checker:enable

  return (
    <div className={styles.slider}>
      <div className={styles.slider__track}>
        {images.map((image, index) => (
          <img
            key={index}
            className={styles.slider__image}
            src={image.url}
            alt={image.alt}
            title={image.title}
          />
        ))}
      </div>
      <div className={styles.slider__track}>
        {images.map((image, index) => (
          <img
            key={index}
            className={styles.slider__image}
            src={image.url}
            alt={image.alt}
            title={image.title}
          />
        ))}
      </div>
    </div>
  );
}
