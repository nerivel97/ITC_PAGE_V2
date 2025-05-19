import React, { useState, ChangeEvent } from "react";
import "./Card.css";

type Props = {
  isAdmin?: boolean;
  reverse?: boolean;
  imageUrl?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void; // ✅ NUEVA PROP
};

const ConvocatoriaCard: React.FC<Props> = ({
  isAdmin = false,
  reverse = false,
  imageUrl = "/default-image.png",
  title = "Título por defecto",
  description = "Descripción por defecto del contenido de la convocatoria.",
  buttonText = "Descargar",
  onButtonClick, // ✅ USO DE LA NUEVA PROP
}) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  return (
    <div className={`card-container ${reverse ? "reverse" : ""}`}>
      <img src={imageSrc} alt="Imagen de la convocatoria" className="card-logo" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{description}</p>
        <button className="card-button" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
      {isAdmin && (
        <div className="admin-controls">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
};

export default ConvocatoriaCard;
