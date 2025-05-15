// import React from "react";
// import CareerCard from "../Carreracard/carreracard";
// import styles from './carreracard.module.css';

// interface Career {
//   title: string;
//   imageUrl: string;
// }

// const careerData: Career[] = [
//   { title: "Ingeniería Ferroviaria", imageUrl: "/images/ferroviaria.jpg" },
//   {
//     title: "Ingeniería en Sistemas Computacionales",
//     imageUrl: "/images/sistemas.jpg",
//   },
//   { title: "Ingeniería en Construcción", imageUrl: "/images/construccion.jpg" },
//   { title: "Ingeniería Mecatrónica", imageUrl: "/images/mecatronica.jpg" },
//   {
//     title: "Ingeniería en Mantenimiento Industrial",
//     imageUrl: "/images/mantenimiento.jpg",
//   },
//   {
//     title: "Licenciatura en Contaduría Pública",
//     imageUrl: "/images/contaduria.jpg",
//   },
//   { title: "Licenciatura en Turismo", imageUrl: "/images/turismo.jpg" },
//   {
//     title: "Ingeniería Industrial y de Gestión",
//     imageUrl: "/images/industrial.jpg",
//   },
//   { title: "Arquitectura", imageUrl: "/images/arquitectura.jpg" },
//   { title: "Licenciatura en Gastronomía", imageUrl: "/images/gastronomia.jpg" },
// ];

// const ResultsGrid: React.FC = () => {
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//         gap: "1.5rem",
//         padding: "1rem",
//         justifyItems: "center",
//       }}
//     >
//       {careerData.map((career, index) => (
//         <CareerCard
//           key={index}
//           title={career.title}
//           imageUrl={career.imageUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default ResultsGrid;

import React from "react";
import CareerCard from "../Carreracard/carreracard.tsx";
import styles from "./carreracard.module.css";

interface Career {
  title: string;
  imageUrl: string;
}

const careerData: Career[] = [
  { title: "Ingeniería Ferroviaria", imageUrl: "/images/ferroviaria.jpg" },
  {
    title: "Ingeniería en Sistemas Computacionales",
    imageUrl: "/images/sistemas.jpg",
  },
  { title: "Ingeniería en Construcción", imageUrl: "/images/construccion.jpg" },
  { title: "Ingeniería Mecatrónica", imageUrl: "/images/mecatronica.jpg" },
  {
    title: "Ingeniería en Mantenimiento Industrial",
    imageUrl: "/images/mantenimiento.jpg",
  },
  {
    title: "Licenciatura en Contaduría Pública",
    imageUrl: "/images/contaduria.jpg",
  },
  { title: "Licenciatura en Turismo", imageUrl: "/images/turismo.jpg" },
  {
    title: "Ingeniería Industrial y de Gestión",
    imageUrl: "/images/industrial.jpg",
  },
  { title: "Arquitectura", imageUrl: "/images/arquitectura.jpg" },
  { title: "Licenciatura en Gastronomía", imageUrl: "/images/gastronomia.jpg" },
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
