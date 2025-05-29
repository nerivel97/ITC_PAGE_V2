import solicitudResidencia from '../../../assets/files/residencia/01-SOLICITUD-PARA-RESIDENCIA.pdf';
import cursoInduccion from '../../../assets/files/residencia/CURSO-DE-INDUCCION-ENERO-JUNIO-2025.pdf';
import formatoAnexoXXIX from '../../../assets/files/residencia/FORMATO-ANEXO-XXIX.pdf';
import formatoAnexoXXX from '../../../assets/files/residencia/FORMATO-ANEXO-XXX.pdf';
// import formatoAnteproyecto from '../../../assets/files/residencia/FORMATO-DE-ANTEPROYECTO.docx';
import formatoAprobacionIngenierias from '../../../assets/files/residencia/FORMATO-DE-APROBACION-MODIFICACION-CANCELACION-RP-INGENIERIAS.pdf';
import formatoAprobacionEconomicoAdministrativas from '../../../assets/files/residencia/FORMATO-MODIFICACION-APROBACION-CANCELACION-DE-RP-ECONOMICO-ADMINISTRATIVAS.pdf';
import formatoAprobacionSistemas from '../../../assets/files/residencia/FORMATO-MODIFICACION-APROBACION-CANCELACION-DE-RP-SISTEMAS-Y-COMPUTACION.pdf';
// import plantillaResidencia from '../../../assets/files/residencia/PLANTILLA-RESIDENCIA-2025-VERSION-II-2.docx';

import styles from './ResidenciaDocumentation.module.css';

interface ResidenciaDocument {
  url: string;
  label: string;
}

export function ResidenciaDocumentation() {
  const documents: ResidenciaDocument[] = [
    {
      url: solicitudResidencia,
      label: 'Solicitud para residencia',
    },
    {
      url: cursoInduccion,
      label: 'Curso de inducción enero-junio 2025',
    },
    {
      url: formatoAnexoXXIX,
      label: 'Formato Anexo XXIX',
    },
    {
      url: formatoAnexoXXX,
      label: 'Formato Anexo XXX',
    },
    // {
    //   url: formatoAnteproyecto,
    //   label: 'Formato de anteproyecto',
    // },
    {
      url: formatoAprobacionIngenierias,
      label: 'Formato de aprobación/modificación/cancelación RP Ingenierías',
    },
    {
      url: formatoAprobacionEconomicoAdministrativas,
      label:
        'Formato de aprobación/modificación/cancelación RP Económico-Administrativas',
    },
    {
      url: formatoAprobacionSistemas,
      label:
        'Formato de aprobación/modificación/cancelación RP Sistemas y Computación',
    },
    // {
    //   url: plantillaResidencia,
    //   label: 'Plantilla residencia 2025 versión II',
    // },
  ];

  return (
    <div className={styles.documentation}>
      <h2 className={styles.documentation__heading}>
        Descarga los formatos para la residencia profesional
      </h2>

      <ul className={styles.documentation__list}>
        {documents.map((document, index) => (
          <li
            key={index}
            className={styles.documentation__item}
          >
            <a
              className={styles.documentation__link}
              href={document.url}
              download
            >
              {document.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
