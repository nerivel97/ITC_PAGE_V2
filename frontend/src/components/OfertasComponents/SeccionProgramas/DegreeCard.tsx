import { useNavigate } from 'react-router-dom';
import styles from './DegreesSection.module.css';

interface DegreeCardProps {
  id: number;
  title: string;
  description: string;
  bgClass: string;
}

const DegreeCard = ({title, description, bgClass }: DegreeCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Convertir título a formato URL-friendly
    const carreraUrl = title.toLowerCase()
      .replace(/\s+/g, '-')          // Reemplaza espacios con guiones
      .replace(/[^\w-]/g, '')        // Elimina caracteres especiales
      .replace(/--+/g, '-')          // Reemplaza múltiples guiones con uno solo
      .replace(/^-+|-+$/g, '');      // Elimina guiones al inicio/final
    
    navigate(`/oferta-educativa/${carreraUrl}`);
  };

  return (
    <div 
      className={`${styles.card} ${styles[bgClass]}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={styles.content}>
        <p className={styles.heading}>{title}</p>
        <p className={styles.para}>{description}</p>
      </div>
    </div>
  );
};

export default DegreeCard;