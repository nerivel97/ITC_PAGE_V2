// TitulacionSection.tsx
import React from 'react';
import styles from './Titulaciones.module.css';

import { 
  FaFileAlt, 
  FaMoneyBillWave, 
  FaClipboardList, 
  FaScroll,
  FaBook,
  FaFlask,
  FaTools,
  FaGraduationCap,
  FaBriefcase,
  FaChalkboardTeacher,
  FaFileSignature,
  FaLaptopCode,
  FaLightbulb,
  FaBusinessTime,
  FaMicroscope,
  FaUserTie
} from 'react-icons/fa';
import { IoIosWarning } from "react-icons/io";

const Titulacion = () => {
  return (
    <div className={styles.container}>
      {/* Sección de Requisitos */}
      <div className={styles.requisitosSection}>
        <h4 className={styles.sectionTitle}>Requisitos para Titulación</h4>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><FaFileAlt /></div>
            <h5>Requisitos Generales</h5>
            <ul>
              <li>Certificado de estudios</li>
              <li>Acta de nacimiento</li>
              <li>CURP</li>
              <li>4 fotografías</li>
            </ul>
            <a href="·" className={styles.cardBtn}>Descargar</a>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}><FaMoneyBillWave /></div>
            <h5>Constancia de No Adeudo</h5>
            <p>Documento emitido por la institución que acredite que no existen adeudos económicos.</p>
            <a href="#" className={styles.cardBtn}>Descargar</a>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}><FaClipboardList /></div>
            <h5>Hoja de Datos</h5>
            <p>Formato oficial con información personal del egresado debidamente llenado y firmado.</p>
            <a href="#" className={styles.cardBtn}>Descargar</a>
          </div>
          
          <div className={styles.card}>
            <div className={styles.cardIcon}><FaScroll /></div>
            <h5>Solicitud de Acto Recepcional</h5>
            <p>Documento formal donde se solicita la fecha para la presentación del examen profesional.</p>
            <a href="#" className={styles.cardBtn}>Descargar</a>
          </div>
        </div>
      </div>

      {/* Sección de Trámites Personales */}
      <div className={styles.twoColumns}>
        <div className={`${styles.column} ${styles.tramitesTexto}`}>
          <h4>Importante!<IoIosWarning /></h4>
          <p>Los trámites son personales, necesariamente deberán presentar los documentos en original y copia legible para su integración en el orden que se presentan a continuación dentro de un fólder tamaño oficio color crema.</p>
        </div>
      </div>
      
      {/* Sección de Opciones de Titulación */}
      <div className={styles.contenedorOpciones}>
        <div className={styles.opcionesTitulacion}>
          <h4 className={styles.tituloSeccion}>Opciones de titulación para licenciatura antes del plan 2004</h4>
          
          <div className={styles.listaOpciones}>
            <div className={styles.columnaOpciones}>
              <ul className={styles.itemsOpciones}>
                <li><span className={styles.numeroOpcion}>Opción I.</span> Tésis Profesional</li>
                <li><span className={styles.numeroOpcion}>Opción II.</span> Libros de Texto o Prototipos Didácticos</li>
                <li><span className={styles.numeroOpcion}>Opción III.</span> Proyecto de Investigación</li>
                <li><span className={styles.numeroOpcion}>Opción IV.</span> Diseño ó Rediseño de Equipo, Aparato ó Maquinaria</li>
                <li><span className={styles.numeroOpcion}>Opción V.</span> Cursos Especiales de Titulación</li>
              </ul>
            </div>
            
            <div className={styles.columnaOpciones}>
              <ul className={styles.itemsOpciones}>
                <li><span className={styles.numeroOpcion}>Opción VI.</span> Examen Global Por Áreas de Conocimiento</li>
                <li><span className={styles.numeroOpcion}>Opción VII.</span> Memoria de Experiencia Profesional</li>
                <li><span className={styles.numeroOpcion}>Opción VIII.</span> Escolaridad por Promedio</li>
                <li><span className={styles.numeroOpcion}>Opción IX.</span> Escolaridad por Estudios de Posgrado</li>
                <li><span className={styles.numeroOpcion}>Opción X.</span> Memoria de Residencia Profesional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contenedorOpciones}>
        <div className={styles.opcionesConImagen}>
          <div className={styles.textoOpciones}>
            <h4 className={styles.tituloSeccion}>Opciones de titulación para licenciatura a partir del plan 2004</h4>
            
            <ul className={styles.itemsOpciones}>
              <li><span className={styles.numeroOpcion}>Opción I.</span> Tesis Profesional</li>
              <li><span className={styles.numeroOpcion}>Opción III.</span> Proyecto de Investigación</li>
              <li><span className={styles.numeroOpcion}>Opción VI.</span> Examen Por Áreas de Conocimiento</li>
              <li><span className={styles.numeroOpcion}>Opción VIII.</span> Escolaridad por Promedio</li>
              <li><span className={styles.numeroOpcion}>Opción X.</span> Informe de Residencia Profesional</li>
            </ul>
          </div>
          
          <div className={styles.imagenOpciones}>
            <img src="/Fotos/Carreras/ProcesoTitulacion.png" alt="Proceso de titulación" />
          </div>
        </div>
      </div>

      {/* Titulación Integral */}
      <div className={styles.contenedorTitulacionIntegral}>
        <h3 className={styles.tituloPrincipal}>Titulación integral (para generaciones que ingresaron en 2009-2010 y agosto 2015, con enfoque por competencias)</h3>
        
        {/* Generación 2009-2010 */}
        <div className={styles.generacionSeccion}>
          <h4 className={styles.subtituloGeneracion}>TIPOS DE PROYECTOS PARA GENERACIONES QUE INGRESARON EN 2009-2010</h4>
          <div className={styles.proyectosContainer}>
            <ProyectoCard 
              numero={1}
              titulo="Informe Técnico de Reláfrica Periodontal"
              icono={<FaFileSignature />}
              imagen="/Fotos/Carreras/InformeT.png"
            />
            <ProyectoCard 
              numero={2}
              titulo="Proyecto de Innovación Tecnológica"
              icono={<FaLightbulb />}
              imagen="/Fotos/Carreras/ProyectoT.png"
            />
            <ProyectoCard 
              numero={3}
              titulo="Informe de Estancia"
              icono={<FaBusinessTime />}
              imagen="/Fotos/Carreras/InformeE.png"
            />
            <ProyectoCard 
              numero={4}
              titulo="Tesis"
              icono={<FaBook />}
              imagen="/Fotos/Carreras/Tesis.png"
            />
            <ProyectoCard 
              numero={5}
              titulo="Tesina"
              icono={<FaBook />}
              imagen="/Fotos/Carreras/Tesina.png"
            />
            <ProyectoCard 
              numero={6}
              titulo="Examen General de Esperado en Licenciadura (EGEL del Carneval)"
              icono={<FaGraduationCap />}
              imagen="/Fotos/Carreras/Examen.png"
            />
            <ProyectoCard 
              numero={7}
              titulo="Proyecto de Investigación"
              icono={<FaMicroscope />}
              imagen="/Fotos/Carreras/ProyectoI.png"
            />
          </div>
        </div>
        
        {/* Generación Agosto 2015 */}
        <div className={styles.generacionSeccion}>
          <h4 className={styles.subtituloGeneracion}>TIPOS DE PROYECTOS PARA GENERACIONES QUE INGRESARON EN AGOSTO 2015</h4>
          <div className={styles.proyectosContainer}>
            <ProyectoCard 
              numero={1}
              titulo="Residencia Profesional"
              icono={<FaUserTie />}
              imagen="/Fotos/Carreras/ResidenciaP.png"
            />
            <ProyectoCard 
              numero={2}
              titulo="Proyectos de Innovación y/o Desarrollo Tecnológico"
              icono={<FaLaptopCode />}
              imagen="/Fotos/Carreras/ProyectoIDT.png"
            />
            <ProyectoCard 
              numero={3}
              titulo="Proyecto Integrador"
              icono={<FaTools />}
              imagen="/Fotos/Carreras/ProyectoInt.png"
            />
            <ProyectoCard 
              numero={4}
              titulo="Proyecto Productivo"
              icono={<FaBriefcase />}
              imagen="/Fotos/Carreras/ProyectoP.png"
            />
            <ProyectoCard 
              numero={5}
              titulo="Proyecto de Investigación Tecnológica"
              icono={<FaFlask />}
              imagen="/Fotos/Carreras/ProyectoIT.png"
            />
            <ProyectoCard 
              numero={6}
              titulo="Proyecto de Emprendedurismo"
              icono={<FaLightbulb />}
              imagen="/Fotos/Carreras/ProyectoE.png"
            />
            <ProyectoCard 
              numero={7}
              titulo="Proyecto Integral de Educación Dual"
              icono={<FaChalkboardTeacher />}
              imagen="/Fotos/Carreras/ProyectoIED.png"
            />
            <ProyectoCard 
              numero={8}
              titulo="Estancia"
              icono={<FaBusinessTime />}
              imagen="/Fotos/Carreras/Estancia.png"
            />
            <ProyectoCard 
              numero={9}
              titulo="Tesis o Tesina"
              icono={<FaBook />}
              imagen="/Fotos/Carreras/Tesis.png"
            />
            <ProyectoCard 
              numero={10}
              titulo="Examen General de Egreso de la Licenciatura (EGEL del Ceneval)"
              icono={<FaGraduationCap />}
              imagen="/Fotos/Carreras/Examen.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta de proyecto reutilizable
interface ProyectoCardProps {
  numero: number;
  titulo: string;
  icono: React.ReactNode;
  imagen: string;
}

const ProyectoCard: React.FC<ProyectoCardProps> = ({ numero, titulo, icono, imagen }) => {
  return (
    <div className={styles.proyectoCard}>
      <div className={styles.cardImagen}>
        <img src={imagen} alt={titulo} />
        <div className={styles.cardIconOverlay}>
          {icono}
        </div>
      </div>
      <div className={styles.cardContenido}>
        <span className={styles.numeroProyecto}>{numero}</span>
        <h5>{titulo}</h5>
      </div>
    </div>
  );
};

export default Titulacion;