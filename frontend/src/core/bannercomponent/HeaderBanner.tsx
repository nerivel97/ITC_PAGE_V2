// components/HeaderBanners/HeaderBanners.tsx
import React from 'react';
import styles from './HeaderBanners.module.css';

// Importar imágenes locales
import logo from './logos/gobmx_logo.png';
import headerImage1 from './logos/gobierno.png';
import headerImage2 from './logos/nacional.png';
import headerImage3 from './logos/logotec.jpg';

const HeaderBanners = () => {
  const headerImages = [
    { id: 1, image: headerImage1, link: '#', alt: 'Imagen 1' },
    { id: 2, image: headerImage2, link: '#', alt: 'Imagen 2' },
    { id: 3, image: headerImage3, link: '#', alt: 'Imagen 3' },
  ];

  return (
    <>
      {/* Primer encabezado */}
      <header className={styles.header1}>
        <div className={styles.header1Container}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
          
          <div className={styles.emptySpace}></div>
          
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Gobierno</a>
            <a href="#" className={styles.navLink}>Participa</a>
            <a href="#" className={styles.navLink}>Datos</a>
          </div>
        </div>
      </header>

      {/* Segundo encabezado  */}
      <header className={styles.header2}>
        <div className={styles.header2Container}>
          <div className={styles.headerImagesWrapper}>
            {headerImages.map(image => (
              <a 
                key={image.id} 
                href={image.link} 
                className={styles.headerImageLink}
              >
                <img 
                  src={image.image} 
                  alt={image.alt} 
                  className={styles.headerImage}
                />
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderBanners;