// src/components/OfertasComponents/SeccionProgramas/DegreesSection.tsx
import styles from './DegreesSection.module.css';
import DegreeCard from './DegreeCard';
import { licenciaturas, maestrias, doctorados } from '../../../data/CarrerasData';

const DegreesSection = () => {
  return (
    <>
      <h2 className={styles.descripcion}>
      Estudia ingenierías, licenciaturas y posgrados en el TecNM Cancún. 
      Programas acreditados con becas, prácticas profesionales y alta empleabilidad.
      </h2>
      
      {/* Sección de Licenciaturas */}
      <section className={styles.degreesContainer}>
        <h2 className={styles.sectionTitle}>Licenciaturas</h2>
        <div className={styles.cardsContainer}>
          {licenciaturas.map(({ id, title, description, bgColor }) => (
            <DegreeCard 
              key={id}
              title={title}
              description={description}
              bgColor={bgColor}
            />
          ))}
        </div>
      </section>

      {/* Sección combinada Doctorados y Maestrias */}
      <section className={styles.combinedContainer}>
        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Maestrias</h2>
          <div className={styles.cardsContainer}>
            {maestrias.map(({ id, title, description, bgColor }) => (
              <DegreeCard 
                key={id}
                title={title}
                description={description}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>

        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Doctorados</h2>
          <div className={styles.cardsContainer}>
            {doctorados.map(({ id, title, description, bgColor }) => (
              <DegreeCard 
                key={id}
                title={title}
                description={description}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DegreesSection;