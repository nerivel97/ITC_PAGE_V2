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
          <h2>Interés</h2>
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
          <h2>Editorial</h2>
          <ul>
            <li><a href="https://www.conricyt.mx/" target="_blank" rel="noopener noreferrer">CONRICYT</a></li>
          </ul>
          <h2>Instituciones</h2>
          <ul>
            <li><a href="https://www.conacyt.gob.mx/" target="_blank" rel="noopener noreferrer">CONACYT</a></li>
            <li><a href="https://www.tecnm.mx/" target="_blank" rel="noopener noreferrer">TecNM</a></li>
          </ul>
        </div>

        <div className={`${styles.footerSection} ${styles.publicaciones}`}>
          <h2>Publicaciones</h2>
          <div className={styles.publicacionesGrid}>
            <div className={styles.pubBox}></div>
            <div className={styles.pubBox}></div>
            <div className={styles.pubBox}></div>
            <div className={styles.pubBox}></div>

            <a
              href="https://www.facebook.com/TECNMCancunOficial/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fbCenterIcon}
            >
              <img src={facebook} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerSocial}>
        <hr />
        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com/TECNMCancunOficial/?locale=es_LA" target="_blank" rel="noOpener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="http://www.youtube.com/@TecNMCancun" target="_blank" rel="noOpener noreferrer">
            <img src={youtube} alt="YouTube" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noOpener noreferrer">
            <img src={ig} alt="Instagram" />
          </a>
          <a href="https://x.com/TecNM_MX" target="_blank" rel="noOpener noreferrer">
            <img src={x} alt="Twitter (X)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;