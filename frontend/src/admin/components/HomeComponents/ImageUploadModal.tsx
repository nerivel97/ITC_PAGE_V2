// src/components/HomeComponents/ImageUploadModal.tsx
import { useState } from "react";
import "./ImageUploadModal.css";

interface Props {
  onClose: () => void;
  onUploaded: (image: {
    id: string;
    url: string;
    alt: string;
    section: string;
    position: number;
    expirationDate?: string;
  }) => void;
}

const ImageUploadModal = ({ onClose, onUploaded }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [alt, setAlt] = useState("");
  const [section, setSection] = useState("Carrusel");
  const [position, setPosition] = useState(0);
  const [expirationDate, setExpirationDate] = useState("");

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("alt", alt);
    formData.append("section", section);
    formData.append("position", position.toString());
    formData.append("expirationDate", expirationDate); // <--- nueva línea

    fetch("/api/upload-home-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((img) => {
        onUploaded(img);
        onClose();
      })
      .catch(() => alert("Falló la subida"));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Subir Imagen</h2>
        <div className="input-group">
          <label>Imagen</label>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <div className="input-group">
          <label>Texto alternativo</label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Sección</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option>Carrusel</option>
            <option>Somos</option>
            <option>Contacto</option>
          </select>
        </div>
        <div className="input-group">
          <label>Posición</label>
          <input
            type="number"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label>Fecha de caducidad</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
        <div className="button-row">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="upload-btn" onClick={handleUpload}>Subir</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
