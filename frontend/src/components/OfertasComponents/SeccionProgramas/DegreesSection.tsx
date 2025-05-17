import { useEffect, useState } from 'react';
import styles from './DegreesSection.module.css';
import DegreeCard from './DegreeCard';
import { IOferta} from '../../../admin/interfaces/oferta.interface';

const DegreesSection = () => {
  const [ofertas, setOfertas] = useState<IOferta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:4000/api/carreras');
        if (!response.ok) {
          throw new Error('Error al cargar las carreras');
        }
        const data: { data: IOferta[] } = await response.json();
        setOfertas(data.data);
      } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err.message);
            setError(err.message);
          } else {
            setError('Error desconocido');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchOfertas();
    }, []);

  // Filtrar por tipo
  const licenciaturas = ofertas.filter((o) => o.tipo === 'licenciatura');
  const maestrias = ofertas.filter((o) => o.tipo === 'maestria');
  const doctorados = ofertas.filter((o) => o.tipo === 'doctorado');

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
          {licenciaturas.map(({ id, titulo, descripcion, bgColor }) => (
            <DegreeCard 
              key={id}
              title={titulo}
              description={descripcion}
              bgColor={bgColor}
            />
          ))}
        </div>
      </section>

      {/* Sección combinada Doctorados y Maestrias */}
      <section className={styles.combinedContainer}>
        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Maestrías</h2>
          <div className={styles.cardsContainer}>
            {maestrias.map(({ id, titulo, descripcion, bgColor }) => (
              <DegreeCard 
                key={id}
                title={titulo}
                description={descripcion}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>

        <div className={styles.halfSection}>
          <h2 className={styles.sectionTitle}>Doctorados</h2>
          <div className={styles.cardsContainer}>
            {doctorados.map(({ id, titulo, descripcion, bgColor }) => (
              <DegreeCard 
                key={id}
                title={titulo}
                description={descripcion}
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
