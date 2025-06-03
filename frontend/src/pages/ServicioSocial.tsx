import './ServicioSocial.css';

const archivosInicio = [
  { nombre: 'Proceso de servicio social', archivo: '/Formatos/ITC-VI-PO-002-01 PROCESO DE SERV SOCIAL.doc' },
  { nombre: 'Solicitud de servicio social', archivo: '/Formatos/ITC-VI-PO-002-02 SOLICITUD DE SERV. SOCIAL.DOC' },
  { nombre: 'Carta de asignación', archivo: '/Formatos/ITC-VI-PO-002-03 CARTA ASIGNACIÓN SERVICIO SOCIAL.DOC' },
  { nombre: 'Tarjeta de control y seguimiento', archivo: '/Formatos/ITC-VI-PO-002-04 TARJETA DE CONTROL Y SEGUIMIENTO  DE SERVICIO SOCIAL.DOC' },
  { nombre: 'Carta compromiso', archivo: '/Formatos/ITC-VI-PO-002-05 CARTA COMPROMISO SERV. SOCIAL.DOC' },
  { nombre: 'Oficio de presentación', archivo: '/Formatos/ITC-VI-PO-002-06 OFICIO  DE PRESENTACION DE SERV. SOCIAL.DOC' },
  { nombre: 'Plan de trabajo', archivo: '/Formatos/ITC-VI-PO-002-07 PLAN DE TRABAJO DEL PRESTANTE.doc' },
];

const archivosDurante = [
  { nombre: 'Reporte bimestral', archivo: '/Formatos/ITC-VI-PO-002-08 REPORTE BIMESTRAL SERV. SOCIAL.DOC' },
  { nombre: 'Autoevaluación cualitativa', archivo: '/Formatos/ITC-VI-PO-002-09 AUTOEVALUACIÓN CUALITATIVA.doc' },
  { nombre: 'Evaluación cualitativa de instancia', archivo: '/Formatos/ITC-VI-PO-002-10 EVALUACIÓN CUALITATIVA  DESEMPEÑO DE LA INSTANCIA.doc' },
];

const archivosConclusion = [
  { nombre: 'Evaluación final', archivo: '/Formatos/ITC-VI-PO-002-11 EVALUACIÓN DESEMPEÑO FINAL  POR EL (LA) PRESTADOR.doc' },
  { nombre: 'Resultado final', archivo: '/Formatos/ITC-VI-PO-002-12 Formato de Resultado final de Desempeño y Calificación del Prestador del Servicio Social.docx' },
  { nombre: 'Concentrado de desempeño', archivo: '/Formatos/ITC-VI-PO-002-13   CONCENTRADO DE DESEMPEÑO Y CALIFICACIÓN.docx' },
  { nombre: 'Oficio de envío', archivo: '/Formatos/ITC-VI-PO-002-14 OFICIO DE ENVÍO CALIFICACIONES.docx' },
  { nombre: 'Constancia', archivo: '/Formatos/ITC-VI-PO-002-15 CONSTANCIA DE TERMINACIÓN SERV. SOCIAL.DOC' },
  { nombre: 'Lineamientos académicos', archivo: '/Formatos/LINEAMIENTOS ACADÉMICO TECNM.docx' },
];

const descargarMultiplesArchivos = (lista: { nombre: string; archivo: string }[]) => {
  lista.forEach((archivo, i) => {
    const link = document.createElement('a');
    link.href = archivo.archivo;
    link.download = archivo.nombre;
    link.target = '_blank';
    document.body.appendChild(link);
    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
    }, i * 300);
  });
};

const ServicioSocial = () => {
  return (
    <main className="container">
      <section className="video-induccion">
        <div className="video-container">
          <iframe
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FTECNMCancunOficial%2Fvideos%2F499257691337126%2F&show_text=0&width=560"
            width="100%"
            height="315"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen
            title="Video de inducción"
          ></iframe>
        </div>
      </section>

      <section className="titulo">
        <h2><strong>Servicio Social:</strong> TUCAN - Guía Paso a Paso</h2>
      </section>

      <section className="requisitos">
        <h3>Requisitos Principales</h3>
        <ul>
          <li>Haber cursado al menos el 70% de los créditos.</li>
          <li>Asistir al curso de inducción.</li>
          <li>Contar con seguro facultativo vigente.</li>
          <li>Completar un mínimo de 500 horas en un periodo no menor a 6 meses ni mayor a 2 años.</li>
        </ul>
      </section>

      <section className="proceso">
        <h3>Proceso paso a paso</h3>
        <div className="pasos">
          <div className="paso" onClick={() => descargarMultiplesArchivos(archivosInicio)} style={{ cursor: 'pointer' }}>
            <img src="/Fotos/ServicioSocial/icono-descargar.png" alt="Descargar" />
            <p><strong>1.</strong> Descargar y llenar la solicitud de servicio social.</p>
          </div>
          <div className="paso">
            <img src="/Fotos/ServicioSocial/icono-charla.png" alt="Inducción" />
            <p><strong>2.</strong> Asistir a la plática de inducción.</p>
          </div>
          <a href="/Formatos/ITC-VI-PO-002-03 CARTA ASIGNACIÓN SERVICIO SOCIAL.DOC" download className="paso">
            <img src="/Fotos/ServicioSocial/icono-documento.png" alt="Entregar" />
            <p><strong>3.</strong> Entregar la documentación requerida.</p>
          </a>
          <div className="paso">
            <img src="/Fotos/ServicioSocial/icono-servicio.png" alt="Servicio" />
            <p><strong>4.</strong> Iniciar el servicio social en la dependencia asignada.</p>
          </div>
          <div className="paso" onClick={() => descargarMultiplesArchivos(archivosDurante)} style={{ cursor: 'pointer' }}>
            <img src="/Fotos/ServicioSocial/icono-reporte.png" alt="Reportes" />
            <p><strong>5.</strong> Presentar reportes bimestrales y evaluaciones.</p>
          </div>
          <div className="paso" onClick={() => descargarMultiplesArchivos(archivosConclusion)} style={{ cursor: 'pointer' }}>
            <img src="/Fotos/ServicioSocial/icono-final.png" alt="Conclusión" />
            <p><strong>6.</strong> Concluir con la entrega del informe final y carta de terminación.</p>
          </div>
        </div>
      </section>

      <section className="documentos">
        <h3>Documentación y formatos</h3>
        <div className="grid-documentos">
          <div className="tarjeta-formato">
            <img src="/Fotos/ServicioSocial/icono-documento.png" alt="icono" />
            <h4>Solicitud de servicio social</h4>
            <p>Llena este documento y entrégalo al departamento.</p>
            <button className="boton-descarga" onClick={() => descargarMultiplesArchivos(archivosInicio)}>Descargar</button>
          </div>
          <div className="tarjeta-formato">
            <img src="/Fotos/ServicioSocial/icono-documento.png" alt="icono" />
            <h4>Reporte bimestral</h4>
            <p>Entrega mensual con avances de actividades.</p>
            <button className="boton-descarga" onClick={() => descargarMultiplesArchivos(archivosDurante)}>Descargar</button>
          </div>
          <div className="tarjeta-formato">
            <img src="/Fotos/ServicioSocial/icono-documento.png" alt="icono" />
            <h4>Constancia de terminación</h4>
            <p>Documento de finalización oficial del servicio social.</p>
            <button className="boton-descarga" onClick={() => descargarMultiplesArchivos(archivosConclusion)}>Descargar</button>
          </div>
        </div>
      </section>

      <section className="contacto seccion">
        <p><strong>¿Tienes alguna duda? Contáctanos:</strong></p>
        <p>Correo Electrónico: <a href="mailto:servicio.social@tecnm.edu.mx">servicio.social@tecnm.edu.mx</a></p>
        <p>Teléfono: 9999999999</p>
      </section>
    </main>
  );
};

export default ServicioSocial;