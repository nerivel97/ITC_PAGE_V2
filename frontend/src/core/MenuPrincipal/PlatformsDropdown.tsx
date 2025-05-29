import React from 'react';
import styles from './PlatformsDropdown.module.css';
import { FaArrowRight, FaChalkboardTeacher, FaTasks, FaUserTie, FaCheckCircle } from 'react-icons/fa';
import ElibroImage from './IMGMenuPrincipal/elibro.png';
import SIE from './IMGMenuPrincipal/sie.jpg';
import Mooc from './IMGMenuPrincipal/Moodle.png';
// Definición de interfaces
interface TeacherItem {
  name: string;
  icon: React.ReactNode;
  link: string;
}

interface PlatformItem {
  title: string;
  description: string;
  linkText: string;
  imageSrc: string;
  altText: string;
  link: string;
}

interface PlatformsDropdownProps {
  isMobile: boolean;
  onCloseDropdown?: () => void;
}

const PlatformsDropdown: React.FC<PlatformsDropdownProps> = ({ isMobile }) => {
  const platforms: PlatformItem[] = [
    {
      title: "SIE",
      description: "Consulta Horarios, Pagos, Información académica y carga de materias.",
      linkText: "Acceder",
      imageSrc: ElibroImage,
      altText: "SIE",
      link: "http://sie.cancun.tecnm.mx/cgi-bin/sie.pl?Opc=PINDEXESTUDIANTE&psie=intertec&dummy=0"
    },
    {
      title: "Biblioteca Digital",
      description: "Consulta libros e investigaciones en nuestra biblioteca móvil.",
      linkText: "Acceder",
      imageSrc: SIE,
      altText: "Biblioteca Digital",
      link: "https://www.elibro.com/"
    },
    {
      title: "Ekaanbal",
      description: "Plataforma para la administración de materias y recursos educativos.",
      linkText: "Acceder",
      imageSrc: Mooc,
      altText: "Ekaanbal",
      link: "https://ekaanbal.cancun.tecnm.mx/"
    }
  ];

  const teachers: TeacherItem[] = [
    { 
      name: "SIE", 
      icon: <FaChalkboardTeacher />,
      link: "http://sie.cancun.tecnm.mx/cgi-bin/sie.pl?Opc=PINDEXDOCENTE&psie=intertec&dummy=0"
    },
    { 
      name: "CAT", 
      icon: <FaTasks />,
      link: "https://cat.tecnm.mx/inicio"
    },
    { 
      name: "SISSAD", 
      icon: <FaUserTie />,
      link: "https://www.cancun.tecnm.mx/isc-sisad/"
    },
    { 
      name: "SATIT", 
      icon: <FaCheckCircle />,
      link: "https://www.cancun.tecnm.mx/isc-satit/"
    }
  ];

  return (
    <div className={`${styles.dropdown} ${isMobile ? styles.mobileDropdown : ''}`}>
      <div className={styles.platformsContainer}>
        {/* Columnas de plataformas */}
        {platforms.map((platform, index) => (
          <div key={index} className={styles.platformColumn}>
            <img src={platform.imageSrc} alt={platform.altText} />
            <h3>{platform.title}</h3>
            <p>{platform.description}</p>
            <a 
              href={platform.link} 
              className={styles.platformLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform.linkText} <FaArrowRight />
            </a>
          </div>
        ))}
        
        {/* Columna de docentes */}
        <div className={styles.teachersColumn}>
          <h3>Docentes</h3>
          <ul>
            {teachers.map((teacher, index) => (
              <li key={index}>
                <a 
                  href={teacher.link} 
                  className={styles.teacherLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {teacher.icon} {teacher.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlatformsDropdown;
