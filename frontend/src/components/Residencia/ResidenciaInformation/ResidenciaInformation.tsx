import styles from './ResidenciaInformation.module.css';

export function ResidenciaInformation() {
  const keypoints = [
    {
      key: 'Valor curricular',
      value: '10 créditos',
    },
    {
      key: 'Duración',
      value: 'De cuatro a seis meses',
    },
    {
      key: 'Horas totales por proyecto',
      value: '500 horas',
    },
    {
      key: 'Número de veces que se puede cursar',
      value: 'Única ocasión',
    },
    {
      key: 'Seguro facultativo',
      value: 'Debe ser vigente',
    },
  ];

  return (
    <section className={styles.residenciaInformation}>
      <div className={styles.residenciaInformation__information}>
        <p className={styles.residenciaInformation__informationParagraph}>
          La <span>residencia profesional</span> es una estrategia educativa de
          carácter curricular que permite al estudiante emprender un proyecto
          teórico-práctico, analítico, reflexivo, crítico y profesional con el
          propósito de resolver un problema específico de la realidad social y
          productiva, para fortalecer y aplicar sus competencias profesionales.
        </p>
        <p className={styles.residenciaInformation__informationParagraph}>
          <span className={styles.residenciaInformation__informationBold}>
            Objetivos
          </span>
          aplicar conocimientos adquiridos, desarrollar habilidades
          profesionales y contribuir a la solución de problemas reales en el
          ámbito laboral.
        </p>
        <p className={styles.residenciaInformation__informationParagraph}>
          <span className={styles.residenciaInformation__informationBold}>
            Modalidades
          </span>
          individual, grupal o interdisciplinaria dependiendo de los requisitos
          del proyecto.
        </p>
      </div>

      <section className={styles.residenciaInformation__keypoints}>
        <h2 className={styles.residenciaInformation__keypointsHeading}>
          Puntos importantes
        </h2>

        <div className={styles.residenciaInformation__keypointsTable}>
          <ul className={styles.residenciaInformation__keypointsTableList}>
            {keypoints.map((keypoint) => (
              <li
                key={keypoint.key}
                className={styles.residenciaInformation__keypointsTableRow}
              >
                <span
                  className={styles.residenciaInformation__keypointsTableRowKey}
                >
                  {keypoint.key}
                </span>
                <span
                  className={
                    styles.residenciaInformation__keypointsTableRowValue
                  }
                >
                  {keypoint.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
