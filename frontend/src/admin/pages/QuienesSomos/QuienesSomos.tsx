import { useState } from 'react';
import './QuienesSomos.css';

type ImageSection = 'hero' | 'laboratorios' | 'instalaciones' | 'equipo';

const QuienesSomosAdmin = () => {
  const [selectedSection, setSelectedSection] = useState<ImageSection>('hero');
  const [images, setImages] = useState<Record<ImageSection, string | null>>({
    hero: null,
    laboratorios: null,
    instalaciones: null,
    equipo: null
  });

  const [titles, setTitles] = useState<Record<ImageSection, string>>({
    hero: '',
    laboratorios: '',
    instalaciones: '',
    equipo: ''
  });

  const [texts, setTexts] = useState<Record<ImageSection, string>>({
    hero: '',
    laboratorios: '',
    instalaciones: '',
    equipo: ''
  });

  const handleImageUpload = (section: ImageSection, file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImages(prev => ({ ...prev, [section]: imageUrl }));
    console.log(`✅ Imagen para la sección "${section}" subida con éxito.`);
  };

  const handleTextChange = (section: ImageSection, value: string) => {
    setTexts(prev => ({ ...prev, [section]: value }));
  };

  const handleTitleChange = (section: ImageSection, value: string) => {
    setTitles(prev => ({ ...prev, [section]: value }));
  };

  const handleDeleteImage = (section: ImageSection) => {
    setImages(prev => ({ ...prev, [section]: null }));
    console.log(`🗑️ Imagen eliminada de la sección "${section}".`);
  };

  const handleSave = async () => {
    console.log('📦 Datos a guardar:', {
      images,
      titles,
      texts
    });
    alert('Cambios guardados correctamente');
  };

  const sectionLabels: Record<ImageSection, string> = {
    hero: 'Hero',
    laboratorios: 'Laboratorios',
    instalaciones: 'Instalaciones',
    equipo: 'Equipo'
  };

  return (
    <div className="admin-panel">
      <h2>Administración de "Quiénes Somos"</h2>

      <div className="section-selector">
        <label>Seleccionar sección:</label>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value as ImageSection)}
        >
          {Object.entries(sectionLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="image-upload-section">
        <h3>{sectionLabels[selectedSection]}</h3>
        {images[selectedSection] ? (
          <div className="preview-container">
            <img
              src={images[selectedSection]!}
              alt={`Previsualización ${selectedSection}`}
              className="image-preview"
            />
            <h4>{titles[selectedSection]}</h4>
            <p className="image-text">{texts[selectedSection]}</p>
            <button
              className="delete-button"
              onClick={() => handleDeleteImage(selectedSection)}
            >
              Eliminar Imagen
            </button>
          </div>
        ) : (
          <p className="no-image">No hay imagen seleccionada</p>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(selectedSection, file);
          }}
        />
      </div>

      <div className="text-section">
        <label>Título para {selectedSection}:</label>
        <input
          type="text"
          value={titles[selectedSection]}
          onChange={(e) => handleTitleChange(selectedSection, e.target.value)}
          placeholder="Título para esta imagen..."
        />
      </div>

      <div className="text-section">
        <label>Descripción para {selectedSection}:</label>
        <textarea
          value={texts[selectedSection]}
          onChange={(e) => handleTextChange(selectedSection, e.target.value)}
          placeholder="Escribe una descripción para esta sección..."
          rows={3}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Guardar Cambios
      </button>

      <hr />

      <div className="global-preview">
        <h3>Vista previa global</h3>
        {Object.entries(sectionLabels).map(([key, label]) => {
          const section = key as ImageSection;
          return (
            <div key={section} className="global-section">
              <h4>{label}</h4>
              {images[section] ? (
                <>
                  <img src={images[section]!} alt={label} className="image-preview" />
                  <h5>{titles[section]}</h5>
                  <p className="image-text">{texts[section]}</p>
                </>
              ) : (
                <p className="no-image">Sin imagen</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuienesSomosAdmin;
