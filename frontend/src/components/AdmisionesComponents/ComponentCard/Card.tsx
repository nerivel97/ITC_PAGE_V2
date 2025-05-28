import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

type Props = {
  isAdmin?: boolean;
  reverse?: boolean;
  imageUrl?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  pdfUrl?: string;
  linkUrl?: string;
};

const ConvocatoriaCard: React.FC<Props> = ({
  isAdmin = false,
  reverse = false,
  imageUrl = "/default-image.png",
  title = "Título por defecto",
  description = "Descripción por defecto del contenido de la convocatoria.",
  buttonText = "Descargar",
  pdfUrl,
  linkUrl,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(imageUrl);
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };

  const handleButtonClick = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;

      // Extrae automáticamente el nombre del archivo del URL
      const partes = pdfUrl.split("/");
      link.download = partes[partes.length - 1];

      link.click();
    } else if (linkUrl) {
      navigate(linkUrl);
    }
  };

  return (
    <div className={`card-container ${reverse ? "reverse" : ""}`}>
      <img src={imageSrc} alt="Imagen de la convocatoria" className="card-logo" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{description}</p>
        {(pdfUrl || linkUrl) ? (
          <button className="card-button" onClick={handleButtonClick}>
            {buttonText}
          </button>
        ) : (
          <button className="card-button" disabled>
            {buttonText}
          </button>
        )}
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
