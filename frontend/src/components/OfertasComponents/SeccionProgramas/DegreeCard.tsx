import { useNavigate } from 'react-router-dom';
import styles from './DegreesSection.module.css';

interface DegreeCardProps {
  title: string;
  description: string;
  bgColor: string;
}

const DegreeCard = ({title, description, bgColor }: DegreeCardProps) => {
  const navigate = useNavigate();

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const handleClick = () => {
    // Convertir título a formato URL-friendly
    const carreraUrl = title
      .normalize("NFD")  // Normaliza los caracteres a su forma descompuesta
      .replace(/[\u0300-\u036f]/g, "")  // Elimina los diacríticos (acentos)
      .toLowerCase()
      .replace(/\s+/g, '-')          // Reemplaza espacios con guiones
      .replace(/[^\w-]/g, '')        // Elimina caracteres especiales
      .replace(/--+/g, '-')          // Reemplaza múltiples guiones con uno solo
      .replace(/^-+|-+$/g, '');      // Elimina guiones al inicio/final
    
    navigate(`/oferta-educativa/${carreraUrl}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
};

  return (
    <div 
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: 'pointer', '--bg-color': bgColor } as React.CSSProperties}
    >
      <div className={styles.content}>
        <p className={styles.heading}>{title}</p>
        <p className={styles.para}>{truncateDescription(description)}</p>
      </div>
    </div>
  );
};

export default DegreeCard;