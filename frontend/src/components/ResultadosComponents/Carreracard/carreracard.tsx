// import styles from "./CareerCard.module.css";
// // import EngineeringText from "../../../../EngineeringText";
// // Update the import path below if the actual path is different
// import EngineeringText from "../engineeringtext/engineeringtext";

// interface CareerCardProps {
//   title: string;
//   imageUrl: string;
// }

// const CareerCard = ({ title, imageUrl }: CareerCardProps) => {
//   return (
//     <div
//       className={styles.card}
//       style={{ backgroundImage: `url(${imageUrl})` }}
//     >
//       <EngineeringText title={title} />
//     </div>
//   );
// };

// export default CareerCard;

import styles from "./CareerCard.module.css";
import EngineeringText from "../engineeringtext/engineeringtext";

interface CareerCardProps {
  title: string;
  imageUrl: string;
}

const CareerCard = ({ title, imageUrl }: CareerCardProps) => {
  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className={styles.overlay}>
        <EngineeringText title={title} />
      </div>
    </div>
  );
};

export default CareerCard;
