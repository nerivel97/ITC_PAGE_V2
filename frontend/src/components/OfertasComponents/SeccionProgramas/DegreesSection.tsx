import { useEffect, useState } from 'react';
import styles from './DegreesSection.module.css';
import DegreeCard from './DegreeCard';
import { ICarrera } from '../../../admin/interfaces/oferta.interface';
import { message } from 'antd';

const DegreesSection = () => {
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchCarreras = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8000/api/carreras');
      if (!response.ok) {
        throw new Error('Error al cargar las carreras');
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Error desconocido al cargar carreras');
      }

      setCarreras(json.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
        message.error(err.message);
      } else {
        const errorMessage = 'Error desconocido al cargar carreras';
        setError(errorMessage);
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchCarreras();
}, []);


  // Filtrar por tipo
  const licenciaturas = carreras.filter((c) => c.tipo === 'licenciatura');
  const maestrias = carreras.filter((c) => c.tipo === 'maestria');
  const doctorados = carreras.filter((c) => c.tipo === 'doctorado');

  if (loading) return <p>Cargando programas...</p>;
  if (error) return <p>Error: {error}</p>;

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
          {licenciaturas.map(({title, description, bg_color, url_slug }) => (
            <DegreeCard 
              key={url_slug}
              title={title}
              description={description || ''}
              bgColor={bg_color || '#3366ff'}
              url_slug={url_slug}
            />
          ))}
        </div>
      </section>

      {/* Sección combinada Doctorados y Maestrias */}
      <section className={styles.combinedContainer}>
        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Maestrías</h2>
          <div className={styles.cardsContainer}>
            {maestrias.map(({title, description, bg_color, url_slug }) => (
              <DegreeCard 
                key={url_slug}
                title={title}
                description={description || ''}
                bgColor={bg_color || '#3366ff'}
                url_slug={url_slug}
              />
            ))}
          </div>
        </div>

        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Doctorados</h2>
          <div className={styles.cardsContainer}>
            {doctorados.map(({title, description, bg_color, url_slug }) => (
              <DegreeCard 
                key={url_slug}
                title={title}
                description={description || ''}
                bgColor={bg_color || '#3366ff'}
                url_slug={url_slug}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DegreesSection;
