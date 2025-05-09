import styles from './SummaryCard.module.css';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
}

const SummaryCard = ({ title, value, icon, trend, onClick }: SummaryCardProps) => {
  return (
    <div className={styles.summaryCard} onClick={onClick}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
      {trend && <span className={`${styles.trend} ${styles[trend]}`}></span>}
    </div>
  );
};

export default SummaryCard; // Exportación por defecto