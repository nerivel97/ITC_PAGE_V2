import styles from './ResidenciaRequirements.module.css';

export function ResidenciaRequirements() {
  return (
    <section className={styles.requirements}>
      <h2 className={styles.requirements__heading}>
        Requisitos para cursar Residencia Profesional
      </h2>

      <section className={styles.requirementsSection}>
        <ul className={styles.requirementsSection__list}>
          <li className={styles.requirementsSection__listItem}>
            Tener acreditado el Servicio Social.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Acreditación de las actividades complementarias.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Haber aprobado al menos el 80% de créditos del plan de estudios.
          </li>
          <li className={styles.requirementsSection__listItem}>
            No contar con asignaturas en curso especial.
          </li>
        </ul>
      </section>

      <section className={styles.requirementsSection}>
        <h3 className={styles.requirementsSection__heading}>
          Documentación Requerida
        </h3>

        <ul className={styles.requirementsSection__list}>
          <li className={styles.requirementsSection__listItem}>
            Carta de Presentación
          </li>
          <li className={styles.requirementsSection__listItem}>
            Documento que describe el proyecto a realizar.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Formatos específicos proporcionados por la institución para el
            registro y seguimiento del proyecto.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Reportes periódicos y finales del proyecto.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Evaluaciones realizadas por los asesores internos y externos.
          </li>
        </ul>
      </section>

      <section className={styles.requirementsSection}>
        <h3 className={styles.requirementsSection__heading}>
          Proceso para Realizar la Residencia Profesional
        </h3>

        <ol className={styles.requirementsSection__list}>
          <li className={styles.requirementsSection__listItem}>
            Selección del Proyecto
          </li>
          <li className={styles.requirementsSection__listItem}>
            Aprobación del Proyecto: El proyecto debe ser revisado y aprobado
            por la academia de cada carrera y autorizado por el jefe del
            Departamento Académico.
          </li>
          <li className={styles.requirementsSection__listItem}>
            Registro del Anteproyecto
          </li>
          <li className={styles.requirementsSection__listItem}>
            Desarrollo del Proyecto
          </li>
          <li className={styles.requirementsSection__listItem}>
            Entrega de Reportes
          </li>
          <li className={styles.requirementsSection__listItem}>
            El proyecto será evaluado por los asesores y se determinará si se
            cumplen los objetivos establecidos
          </li>
        </ol>
      </section>
    </section>
  );
}
