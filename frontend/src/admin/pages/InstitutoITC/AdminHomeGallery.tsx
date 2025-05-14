// src/pages/HomeGallery.tsx
import { useState, useEffect } from "react";
import ImageUploadModal from "../../components/HomeComponents/ImageUploadModal";
import ImageLibraryModal from "../../components/HomeComponents/ImageLibraryModal";
import "./AdminHomeGallery.css"; // <- Import del CSS

interface HomeImage {
  id: string;
  url: string;
  alt: string;
  section: string;
  position: number;
}

const AdminHomeGallery = () => {
  const [images, setImages] = useState<HomeImage[]>([]);
  /*const [selectedSection, setSelectedSection] = useState<string | null>(null);*/
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState<{
    section: string;
    position: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/home-images")
      .then((res) => res.json())
      .then(setImages)
      .catch(() => console.warn("Fallo la carga de imágenes"));
  }, []);

  const sections = ["Carrusel", "Somos", "Contacto"];

  const handleReplaceImage = (section: string, position: number) => {
    setShowLibraryModal({ section, position });
  };

  const updateImageForSection = (section: string, position: number, newImage: HomeImage) => {
    setImages((prev) =>
      prev.map((img) =>
        img.section === section && img.position === position ? { ...newImage, section, position } : img
      )
    );
    setShowLibraryModal(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="header-container">
        <h1 className="title">Galería del Home</h1>
        <button className="upload-button" onClick={() => setShowUploadModal(true)}>
          Subir nueva imagen
        </button>
      </div>

      {sections.map((section) => (
        <div key={section} className="section-container">
          <h2 className="section-title">Sección: {section}</h2>
          <div className="image-grid">
            {images
              .filter((img) => img.section === section)
              .sort((a, b) => a.position - b.position)
              .map((img) => (
                <div key={img.id} className="image-card">
                  <img src={img.url} alt={img.alt} />
                  <p>{img.alt}</p>
                  <button
                    className="replace-button"
                    onClick={() => handleReplaceImage(section, img.position)}
                  >
                    Reemplazar
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onUploaded={(newImage) => setImages((prev) => [...prev, newImage])}
        />
      )}

      {showLibraryModal && (
        <ImageLibraryModal
          currentSection={showLibraryModal.section}
          position={showLibraryModal.position}
          onSelectImage={(img) =>
            updateImageForSection(showLibraryModal.section, showLibraryModal.position, img)
          }
          onClose={() => setShowLibraryModal(null)}
        />
      )}
    </div>
  );
};

export default AdminHomeGallery;
