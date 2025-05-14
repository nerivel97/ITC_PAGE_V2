import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../components/OfertasComponents/Carreras.module.css';
import { carrerasData } from '../data/CarrerasData';
import Breadcrumbs from '../components/OfertasComponents/Breadcrumbs/Breadcrumbs';

const Carreras: React.FC = () => {
  const { carreraNombre } = useParams<{ carreraNombre: string }>();
  const carrera = carreraNombre ? carrerasData[carreraNombre] : null;

  if (!carrera) {
    return (
      <div className={styles.container}>
        <h1>Programa no encontrado</h1>
        <p>La carrera solicitada no existe en nuestros registros.</p>
      </div>
    );
  }

  // Función para dividir texto en párrafos
  const formatParagraphs = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ));
  };

  // Función para dividir texto en items de lista
  const formatListItems = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((item, i) => (
      <div key={i} className={styles.itemRow}>
        <img src="/Fotos/Carreras/bandera.png" alt="Ícono" />
        <p>{item}</p>
      </div>
    ));
  };

  // Función para dividir texto en items de campo laboral
  const formatCampoItems = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((item, i) => (
      <div key={i} className={styles.areaItem}>
        <img src="/Fotos/Carreras/engranaje.png" alt="Ícono" />
        <p>{item}</p>
      </div>
    ));
  };

  // Función para dividir texto en items de funciones
  const formatFuncionesItems = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((item, i) => (
      <div key={i} className={styles.funcionItem}>
        <img src="/Fotos/Carreras/palo.png" alt="Ícono" />
        <p>{item}</p>
      </div>
    ));
  };

  return (
    <div className={styles.container} style={{ '--primary-color': carrera.bgColor } as React.CSSProperties}>
      <Breadcrumbs currentPage={carrera.title} />
      
      <div className={styles.headerBanner}>
        <img src={carrera.imagen_banner} alt={`Banner de ${carrera.title}`} />
        <div className={styles.carreraTitle}>{carrera.title}</div>
      </div>

      <div className={styles.institucionInfo}>
        <div className={styles.flexContainer}>
          <div className={styles.flexItem1}>
            <img src={carrera.foto_mascota} alt={`Logo ${carrera.title}`} />
          </div>
          <div className={styles.flexItem2}>
            {formatParagraphs(carrera.description)}
          </div>
        </div>
      </div>

      {(carrera.objetivos || carrera.mision || carrera.vision) && (
        <div className={styles.visionMision}>
          <h2 className={styles.sectionTitle}>OBJETIVOS, MISIÓN Y VISIÓN</h2>
          <div className={styles.visionMisionContainer}>
            {carrera.objetivos && (
              <div className={styles.visionMisionItem}>
                <img src="/Fotos/Carreras/obj.png" alt="Ícono de Objetivos" />
                <h3>Objetivos</h3>
                {formatListItems(carrera.objetivos)}
              </div>
            )}
            
            {carrera.mision && (
              <div className={styles.visionMisionItem}>
                <img src="/Fotos/Carreras/mis.png" alt="Ícono de Misión" />
                <h3>Misión</h3>
                {formatListItems(carrera.mision)}
              </div>
            )}
            
            {carrera.vision && (
              <div className={styles.visionMisionItem}>
                <img src="/Fotos/Carreras/vis.png" alt="Ícono de Visión" />
                <h3>Visión</h3>
                {formatListItems(carrera.vision)}
              </div>
            )}
          </div>
        </div>
      )}

      {carrera.perfilIngreso && (
        <div className="perfil-ingreso">
          <h2 className={styles.sectionTitle}>PERFIL DE INGRESO</h2>
          <div className={styles.perfilContent}>
            <div className={styles.flexContainer}>
              <div className={styles.flexItem2}>
                {formatParagraphs(carrera.perfilIngreso)}
              </div>
              <div className={styles.flexItem1}>
                <img src={carrera.foto_ingreso} alt="Perfil de ingreso" />
              </div>
            </div>
          </div>
        </div>
      )}

      {carrera.perfilEgreso && (
        <div className="perfil-egreso">
          <h2 className={styles.sectionTitle}>PERFIL DE EGRESO</h2>
          <div className={styles.perfilContent}>
            <div className={`${styles.flexContainer} ${styles.flexReverse}`}>
              <div className={styles.flexItem2}>
                {formatParagraphs(carrera.perfilEgreso)}
              </div>
              <div className={styles.flexItem1}>
                <img src={carrera.foto_egreso} alt="Perfil de egreso" />
              </div>
            </div>
          </div>
        </div>
      )}

      {(carrera.campolaboral || carrera.funcionesprof) && (
        <div className={styles.campoLaboral}>
          {carrera.campolaboral && (
            <div className={styles.campoAreas}>
              <h3><img src="/Fotos/Carreras/campo.png" alt="Engranaje" />Campo laboral</h3>
              {formatCampoItems(carrera.campolaboral)}
            </div>
          )}
          
          {carrera.funcionesprof && (
            <div className={styles.campoFunciones}>
              <h3><img src="/Fotos/Carreras/func.png" alt="Profesional" />Funciones profesionales</h3>
              {formatFuncionesItems(carrera.funcionesprof)}
            </div>
          )}
        </div>
      )}

      {carrera.reticula && (
        <div className={styles.reticulaContainer}>
          <h2 className={styles.sectionTitle}>RETÍCULA</h2>
          <div className={styles.semestresSlider}>
            {/* Aquí iría la lógica para renderizar la retícula */}
            <div className={styles.semestreContainer}>
              <div className={styles.semestreHeader}>
                <span className={styles.circulo}></span>
                <h3>SEMESTRE 1</h3>
              </div>
              <div className={styles.materiasGrid}>
                {/* Ejemplo de materia - esto debería ser dinámico */}
                <div className={styles.materia}>
                  <h4>Materia Ejemplo</h4>
                  <p>Código: ABC-123</p>
                  <p>3-2-5</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.semestreSliderNav}>
            {/* Navegación de semestres */}
            <span className={`${styles.sliderDot} ${styles.active}`} data-semester="1"></span>
            <span className={styles.sliderDot} data-semester="2"></span>
          </div>
        </div>
      )}

      {carrera.reticula && (
        <div className={styles.downloadButtonContainer}>
          <a href="#" className={styles.downloadButton}>DESCARGAR RETÍCULA COMPLETA</a>
        </div>
      )}

    </div>
  );
};

export default Carreras;