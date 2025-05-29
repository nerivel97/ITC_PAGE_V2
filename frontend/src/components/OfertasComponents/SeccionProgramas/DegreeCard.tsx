import { useNavigate } from 'react-router-dom';
import styles from './DegreesSection.module.css';

interface DegreeCardProps {
  title: string;
  description: string;
  bgColor: string;
  url_slug: string;
}

const DegreeCard = ({ title, description, bgColor, url_slug }: DegreeCardProps) => {
  const navigate = useNavigate();

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (!text) return 'Descripción no disponible';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const handleClick = () => {
    navigate(`/oferta-educativa/${url_slug}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={styles.card}
      onClick={handleClick}
      style={{ 
        cursor: 'pointer', 
        '--bg-color': bgColor 
      } as React.CSSProperties}
    >
      <div className={styles.content}>
        <p className={styles.heading}>{title}</p>
        <p className={styles.para}>{truncateDescription(description)}</p>
      </div>
    </div>
  );
};

export default DegreeCard;