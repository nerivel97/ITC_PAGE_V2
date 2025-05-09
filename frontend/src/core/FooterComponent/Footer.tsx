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
            <li>Presidencia de la República</li>
            <li>SEP</li>
            <li>Subsecretaría de Educación Superior</li>
            <li>Subsecretaría de Educación y Cultura</li>
            <li>Gobierno del Estado de Quintana Roo</li>
            <li>Consulta tu CURP</li>
            <li>TecNM Portal de Autoservicios</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h2>Editorial</h2>
          <ul>
            <li>CONRICYT</li>
          </ul>
          <h2>Instituciones</h2>
          <ul>
            <li>CONACYT</li>
            <li>TecNM</li>
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
              href="https://facebook.com"
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
          <a href="https://facebook.com" target="_blank" rel="noOpener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noOpener noreferrer">
            <img src={youtube} alt="YouTube" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noOpener noreferrer">
            <img src={ig} alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noOpener noreferrer">
            <img src={x} alt="Twitter (X)" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;