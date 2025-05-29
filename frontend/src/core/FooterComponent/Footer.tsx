import React from 'react';
import styles from './Footer.module.css';
import facebook from '../FooterComponent/FooterImg/face.png';
import youtube from '../FooterComponent/FooterImg/youtube.png';
import ig from '../FooterComponent/FooterImg/instagram.png';
import x from '../FooterComponent/FooterImg/x.avif';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerInfo} data-aos="fade-up">
      <div className={styles.footerColumns}>
        <div className={styles.footerSection}>
          <h2 className={styles.sectionTitle}>Interés</h2>
          <ul>
            <li><a href="https://www.presidencia.gob.mx/" target="_blank" rel="noopener noreferrer">Presidencia de la Republica</a></li>
            <li><a href="https://www.gob.mx/sep" target="_blank" rel="noopener noreferrer">SEP</a></li>
            <li><a href="https://www.dgesu.ses.sep.gob.mx/" target="_blank" rel="noopener noreferrer">Subsecretaria de Educacion Superior</a></li>
            <li><a href="https://www.gob.mx/sep/acciones-y-programas/subsecretaria-de-educacion-basica" target="_blank" rel="noopener noreferrer">Subsecretaria de Educacion y Cultura</a></li>
            <li><a href="https://qroo.gob.mx/" target="_blank" rel="noopener noreferrer">Gobierno del Estado de Quintana Roo</a></li>
            <li><a href="https://www.gob.mx/curp/" target="_blank" rel="noopener noreferrer">Consulta tu CURP</a></li>
            <li><a href="https://autoservicios.tecnm.mx/" target="_blank" rel="noopener noreferrer">TecNM Portal de Autoservicios</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2 className={styles.sectionTitle}>Editorial</h2>
          <ul>
            <li><a href="https://www.conricyt.mx/" target="_blank" rel="noopener noreferrer">CONRICYT</a></li>
          </ul>
          <h2 className={styles.sectionTitle}>Instituciones</h2>
          <ul>
            <li><a href="https://www.conacyt.gob.mx/" target="_blank" rel="noopener noreferrer">CONACYT</a></li>
            <li><a href="https://www.tecnm.mx/" target="_blank" rel="noopener noreferrer">TecNM</a></li>
          </ul>
        </div>

        <div className={`${styles.footerSection} ${styles.publicaciones}`}>
          <h2 className={styles.sectionTitle}> Aviso de privacidad TECNM</h2>
          <a  >Instituto Tecnológico de Cancún - Algunos derechos reservados © 2025
            Av. Kabah, Km. 3 Cancún Quintana Roo México C.P. 77515, Col. Centro
            Teléfono: 01 (998) 8-80-74-32
            Política de privacidad y manejo de datos personales

           </a>
        </div>
      </div>

      <div className={styles.footerSocial}>
        <hr />
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/TECNMCancunOficial/?locale=es_LA" target="_blank" rel="noOpener noreferrer">
            <img src={facebook} alt="Facebook"
            title="Facebook ITC" />
          </a>
          <a href="http://www.youtube.com/@TecNMCancun" target="_blank" rel="noOpener noreferrer">
            <img src={youtube} alt="YouTube"
           title="Youtube ITC" />
          </a>
          <a href="https://www.instagram.com/tecnm_cancun/" target="_blank" rel="noOpener noreferrer">
            <img src={ig} alt="Instagram"
            title="Instagram ITC" />
          </a>
          <a href="https://x.com/TecNM_MX" target="_blank" rel="noOpener noreferrer">
            <img src={x} alt="Twitter (X)"
            title="Twitter (X)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;