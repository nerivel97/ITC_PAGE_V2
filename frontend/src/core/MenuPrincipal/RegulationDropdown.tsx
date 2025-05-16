import React from 'react';
import styles from './RegulationDropdown.module.css';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Estudiante from './IMGMenuPrincipal/estudiante.png';
import General from './IMGMenuPrincipal/general.jpg';
import Responsable from './IMGMenuPrincipal/responsable.png';

// Define la interfaz DropdownItem localmente para asegurar los tipos
interface DropdownItem {
  title: string;
  description: string;
  linkText: string;
  imageSrc: string;
  altText: string;
  path: string; // Asegúrate que es string (primitivo) no String (objeto)
}

interface RegulationDropdownProps {
  isMobile: boolean;
  onCloseDropdown?: () => void;
}

const RegulationDropdown: React.FC<RegulationDropdownProps> = ({ isMobile, onCloseDropdown }) => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    if (onCloseDropdown) {
      onCloseDropdown();
    }
  };

  // Asegúrate que todos los path son strings primitivos
  const regulations: DropdownItem[] = [
    {
      title: "Acerca de",
      description: "Conoce la historia del tecnologico, nuestro compromiso, nuestra visión...",
      linkText: "Ver más detalles",
      imageSrc: Estudiante,
      altText: "Al estudiante",
      path: "/Instituto" 
    },
    {
      title: "Instalaciones",
      description: "Conoce nuestras áreas enriquecidas del plantel...",
      linkText: "Ver más detalles",
      imageSrc: General,
      altText: "Generales del curso",
      path: "/Infraestructura" 
    },
    {
      title: "Directorio",
      description: "Estamos para ayudarte con nuestros departamentos...",
      linkText: "Ver directorios",
      imageSrc: Responsable,
      altText: "Responsables",
      path: "/Instituto-directorio" 
    },
  ];

  return (
    <div className={`${styles.dropdown} ${isMobile ? styles.mobileDropdown : ''}`}>
      {regulations.map((regulation, index) => (
        <div key={index} className={styles.regulationContainer}>
          <div className={styles.regulationImage}>
            <img src={regulation.imageSrc} alt={regulation.altText} />
          </div>
          <div className={styles.regulationContent}>
            <h3>{regulation.title}</h3>
            <p>{regulation.description}</p>
            <button 
              onClick={() => handleLinkClick(regulation.path)}
              className={styles.regulationLink}
            >
              {regulation.linkText} <FaArrowRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegulationDropdown;