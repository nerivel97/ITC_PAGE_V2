// src/components/HomeComponents/ImageLibraryModal.tsx
import { useState, useEffect } from "react";
import "./ImageLibraryModal.css";

interface HomeImage {
  id: string;
  url: string;
  alt: string;
  section: string;
  position: number;
}

interface Props {
  currentSection: string;
  position: number;
  onSelectImage: (image: HomeImage) => void;
  onClose: () => void;
}

const ImageLibraryModal = ({ currentSection, position, onSelectImage, onClose }: Props) => {
  const [library, setLibrary] = useState<HomeImage[]>([]);

  useEffect(() => {
    fetch("/api/home-images")
      .then((res) => res.json())
      .then(setLibrary)
      .catch(() => alert("Fallo la carga de imágenes"));
  }, []);

  const handleImageClick = (img: HomeImage) => {
  fetch("/api/update-home-image", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: img.id,
      section: currentSection,
      position,
    }),
  })
    .then((res) => res.json())
    .then((updatedImage) => {
      onSelectImage(updatedImage);
      onClose();
    })
    .catch(() => alert("Error al actualizar la imagen"));
};


  return (
    <div className="library-overlay">
      <div className="library-container">
        <h2 className="library-title">Selecciona una imagen para reemplazar</h2>
        <div className="library-grid">
          {library.map((img) => (
            <div key={img.id} className="library-image" onClick={() => handleImageClick(img)}>
              <img src={img.url} alt={img.alt} />
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ImageLibraryModal;
