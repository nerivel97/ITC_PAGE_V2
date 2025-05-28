// EstudianteDropdown.tsx
import React from "react";
import styles from './EstudianteDropdown.module.css';
import {  useNavigate } from 'react-router-dom';

// Importa tus imágenes
import SeguroFacultativo from './EstudiantesDropdown/Thona.png';
import Calendario from './EstudiantesDropdown/calendario.png';
import ServicioSocial from './EstudiantesDropdown/servicioSocial.jfif';
import Residencia from './EstudiantesDropdown/residencia.webp';
import Titulacion from './EstudiantesDropdown/titulacion.webp';
import Extraescolares from './EstudiantesDropdown/actividades.jpg';

interface DropdownItem {
  title: string;
  imageSrc: string;
  path: string;
}

interface DropdownProps {
  isMobile: boolean;
  onCloseDropdown: () => void;
}

const EstudianteDropdown: React.FC<DropdownProps> = ({ isMobile, onCloseDropdown }) => {
  const navigate = useNavigate();

  const secciones: DropdownItem[] = [
    { title: "Seguro Facultativo", imageSrc: SeguroFacultativo, path: "/oferta" },
    { title: "Calendario Escolar", imageSrc: Calendario, path: "/calendario" },
    { title: "Servicio Social", imageSrc: ServicioSocial, path: "/servicio-social" },
    { title: "Residencia Profesional", imageSrc: Residencia, path: "/residencia-profesional" },
    { title: "Titulación", imageSrc: Titulacion, path: "/oferta-educativa" },
    { title: "Actividades Extraescolares", imageSrc: Extraescolares, path: "/extraescolares" },
  ];

  const handleClick = (path: string) => {
    navigate(path);
    onCloseDropdown();
  };

  return (
    <div className={`${styles.dropdownContainer} ${isMobile ? styles.mobileVersion : ''}`}>
      <div className={styles.dropdownGrid}>
        {secciones.map((seccion, index) => (
          <div
            key={index}
            className={styles.gridItem}
            onClick={() => handleClick(seccion.path)}
          >
            <div className={styles.imageContainer}>
              <img 
                src={seccion.imageSrc} 
                alt={seccion.title}
                className={styles.itemImage}
              />
            </div>
            <h3 className={styles.itemTitle}>{seccion.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudianteDropdown;