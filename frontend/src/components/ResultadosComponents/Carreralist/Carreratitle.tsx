import React from "react";
import CareerCard from "../Carreracard/carreracard.tsx";
import styles from "./carreracard.module.css";

// Importa imágenes directamente
import AdministracionImg from "../../../assets/Fotos/Admisiones/Carreras/Administracion.jpg";
import ArquitecturaImg from "../../../assets/Fotos/Admisiones/Carreras/Arquitectura.jpg";
import CivilImg from "../../../assets/Fotos/Admisiones/Carreras/Civil.jpg";
import ElectromecanicaImg from "../../../assets/Fotos/Admisiones/Carreras/Electromecanica.jpeg";
import FerroviariaImg from "../../../assets/Fotos/Admisiones/Carreras/Ferroviaria.png";
import GestionEmpresarialImg from "../../../assets/Fotos/Admisiones/Carreras/Gestion_Empresarial.jpg";
import MecatronicaImg from "../../../assets/Fotos/Admisiones/Carreras/Mecatronica.jpg";
import SistemasImg from "../../../assets/Fotos/Admisiones/Carreras/Sistemas.jpg";
import TurismoImg from "../../../assets/Fotos/Admisiones/Carreras/Turismo.jpg";

interface Career {
  title: string;
  imageUrl: string;
}

const careerData: Career[] = [
  { title: "Administración", imageUrl: AdministracionImg },
  { title: "Arquitectura", imageUrl: ArquitecturaImg },
  { title: "Civil", imageUrl: CivilImg },
  { title: "Electromecánica", imageUrl: ElectromecanicaImg },
  { title: "Ferroviaria", imageUrl: FerroviariaImg },
  { title: "Gestión Empresarial", imageUrl: GestionEmpresarialImg },
  { title: "Mecatrónica", imageUrl: MecatronicaImg },
  { title: "Sistemas", imageUrl: SistemasImg },
  { title: "Turismo", imageUrl: TurismoImg },
];

const ResultsGrid: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      {careerData.map((career, index) => (
        <CareerCard
          key={index}
          title={career.title}
          imageUrl={career.imageUrl}
        />
      ))}
    </div>
  );
};

export default ResultsGrid;
