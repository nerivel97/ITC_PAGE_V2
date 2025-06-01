// MenuPrincipal.tsx
import React, { useState, useEffect } from "react";
import styles from "./MenuPrincipal.module.css";
import {
  FaHome,
  FaGraduationCap,
  FaUniversity,
  FaLaptopCode,
  FaEnvelopeOpenText,
  FaAngleDoubleDown,
  FaUserGraduate,
  FaArrowLeft,
  FaQuestion,
} from "react-icons/fa";
import RegulationDropdown from "./RegulationDropdown";
import PlatformsDropdown from "./PlatformsDropdown";
import EstudianteDropdown from "./EstudianteDropdown";
import HamburgerIcon from "./HamburgerIcon";

const MenuPrincipal: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (dropdownName: string) => {
    if (!isMobile) {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveDropdown(null); // Reset dropdown al abrir/cerrar menú
  };

  const closeAll = () => {
    setActiveDropdown(null);
    setMenuOpen(false);
  };

  const handleBack = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.menuContainer}>
        {isMobile && (
          <div className={styles.hamburger} onClick={toggleMenu}>
            <HamburgerIcon isOpen={menuOpen} />
          </div>
        )}

        <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          {/* Flecha de retroceso para móvil */}
          {isMobile && activeDropdown && (
            <div className={styles.backArrow} onClick={handleBack}>
              <FaArrowLeft />
            </div>
          )}

          <li onClick={closeAll}>
            <a href="/home">
              <FaHome /> <span>Inicio</span>
            </a>
          </li>

          <li
            onMouseEnter={() => handleMouseEnter("regulations")}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              isMobile &&
              setActiveDropdown(
                activeDropdown === "regulations" ? null : "regulations"
              )
            }
          >
            <a href="#">
              <FaUniversity /> <span>Instituto</span>
            </a>
            {activeDropdown === "regulations" && (
              <RegulationDropdown
                isMobile={isMobile}
                onCloseDropdown={closeAll}
              />
            )}
          </li>
             <li onClick={closeAll}>
            <a href="/oferta-educativa">
              <FaGraduationCap /> <span>Ofertas Educativas</span>
            </a>
          </li>
          <li onClick={closeAll}>
            <a href="/Admisiones">
              <FaAngleDoubleDown />
              <span>Admisiones</span>
            </a>
          </li>
      

          <li
            onMouseEnter={() => handleMouseEnter("students")}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              isMobile &&
              setActiveDropdown(
                activeDropdown === "students" ? null : "students"
              )
            }
          >
            <a href="#">
              <FaUserGraduate />
              <span>Estudiantes</span>
            </a>
            {activeDropdown === "students" && (
              <EstudianteDropdown
                isMobile={isMobile}
                onCloseDropdown={closeAll}
              />
            )}
          </li>

          <li
            onMouseEnter={() => handleMouseEnter("platforms")}
            onMouseLeave={handleMouseLeave}
            onClick={() =>
              isMobile &&
              setActiveDropdown(
                activeDropdown === "platforms" ? null : "platforms"
              )
            }
          >
            <a href="#">
              <FaLaptopCode /> <span>Plataformas Digitales</span>
            </a>
            {activeDropdown === "platforms" && (
              <PlatformsDropdown isMobile={isMobile} />
            )}
          </li>

          <li onClick={closeAll}>
            <a href="/Preguntas_frecuentes">
              <FaQuestion /> <span>Preguntas Frecuentes</span>
            </a>
          </li>

          <li onClick={closeAll}>
            <a href="#">
              <FaEnvelopeOpenText /> <span>Buzón de Quejas</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuPrincipal;
