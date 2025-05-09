import styles from './DegreesSection.module.css';
import DegreeCard from './DegreeCard';

interface DegreeProgram {
  id: number;
  title: string;
  description: string;
  bgClass: string;
}

const DegreesSection = () => {
  const licenciaturas: DegreeProgram[] = [
    {
      id: 1,
      title: "Ingeniería en Sistemas Computacionales",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-sistemas"
    },
    {
      id: 2,
      title: "Ingeniería Civil",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-civil"
    },
    {
      id: 3,
      title: "Licenciatura en Administracion",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-administracion"
    },
    {
      id: 4,
      title: "Contador Publico",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-contaduria"
    },
    {
      id: 5,
      title: "Ingeniería en Administracion",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-ing-admin"
    },
    {
      id: 6,
      title: "Ingenieria en Gestion Empresarial",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-gestion"
    },
    {
      id: 7,
      title: "Ingeniería Mecatronica",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-mecatronica"
    },
    {
      id: 8,
      title: "Ingenieria Electromecanica",
      description: "La carrera de Ingeniería en Gestión Empresarial de nuestro Instituto Tecnológico cuenta con la acreditación ante el Consejo de Acreditación de la Enseñanza de la Ingeniería, A. C., (CACEI)....",
      bgClass: "bg-electromecanica"
    },
    // ... resto de licenciaturas
  ];

  const maestrias: DegreeProgram[] = [
    {
      id: 1,
      title: "Maestria en Ciencias Ambientales",
      description: "El Tecnológico de Cancún, como un mecanismo para contribuir con la solución de problemas ambientales y sociales de la región...",
      bgClass: "bg-ambientales"
    },
    {
      id: 2,
      title: "Maestria en Administración en Negocios",
      description: "Programa diseñado para formar profesionales en el área de administración...",
      bgClass: "bg-negocios"
    },
    
    // ... resto de maestrías
  ];

  const doctorados: DegreeProgram[] = [
    {
      id: 1,
      title: "Doctorado en Ciencias Ambientales",
      description: "El Instituto Tecnológico de Chetumal y el Instituto Tecnológico de Cancún, como un mecanismo para contribuir con la solución de problemas ambientales...",
      bgClass: "bg-doc-ambientales"
    },
    // ... resto de doctorados
  ];

  return (
    <>
      <p className={styles.descripcion}>
          Explora nuestras Licenciaturas, Ingenierías, Maestrías y Doctorado
          diseñados para impulsar tu futuro profesional
      </p>
      
      {/* Sección de Licenciaturas */}
      <section className={styles.degreesContainer}>
        <h2 className={styles.sectionTitle}>Licenciaturas</h2>
        <div className={styles.cardsContainer}>
          {licenciaturas.map(licenciatura => (
            <DegreeCard 
              key={licenciatura.id}
              {...licenciatura} // Spread operator para pasar todas las props
            />
          ))}
        </div>
      </section>

      {/* Sección combinada Doctorados y Maestrias */}
      <section className={styles.combinedContainer}>
        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Maestrias</h2>
          <div className={styles.cardsContainer}>
            {maestrias.map(item => (
              <DegreeCard 
                key={item.id}
                {...item}
              />
            ))}
          </div>
        </div>

        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Doctorados</h2>
          <div className={styles.cardsContainer}>
            {doctorados.map(item => (
              <DegreeCard 
                key={item.id}
                {...item}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DegreesSection;