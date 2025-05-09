import styles from './Card.module.css';

interface CardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}

const Card = ({ title, description, icon, onClick }: CardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardIcon}>{icon}</div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

export default Card;
