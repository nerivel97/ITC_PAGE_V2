import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
  title: string;
  description: string;
  imageUrl: string;
  altText?: string;
  reversed?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, imageUrl, altText = 'Image', reversed }) => {
  return (
    <div className={`seccion ${reversed ? 'fila-reversa' : 'fila'}`}>
      <div className="texto">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="imagen">
        <img src={imageUrl} alt={altText} />
      </div>
    </div>
  );
};

export default InfoCard;