import './EstructuraDirectorio.css';
import { useState } from 'react';
import { secciones } from './dataDirectorio';
import tucanImg from './ImagenesDirectorio/Tucan.png';

const EstructuraDirectorio = () => {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState<string[]>([]);

  const toggleSeccion = (titulo: string) => {
    if (seccionesAbiertas.includes(titulo)) {
      setSeccionesAbiertas(seccionesAbiertas.filter((s) => s !== titulo));
    } else {
      setSeccionesAbiertas([...seccionesAbiertas, titulo]);
    }
  };

  return (
    <div className="directorio-layout">
      {/* Tucán en esquina superior derecha */}
      <div className="telefono-tucan">
        <img
          src={tucanImg}
          alt="Tucán con Mensaje"
          title="Tucán institucional invitando a comunicarse con el TECNM-Cancún"
        />
        <div>
          <strong>¡Estamos a solo una llamada de distancia!</strong>
          <p>Teléfonos:</p>
          <p>998-8807432</p>
          <p>998-8480960</p>
        </div>
      </div>

      {/* Directorio */}
      <div className="directorio-tec">
        <h2>Directorio TEC</h2>

        {secciones.map((seccion, idx) => (
          <div key={idx} className="seccion">
            <button className="seccion-titulo" onClick={() => toggleSeccion(seccion.titulo)}>
              {seccion.titulo} <span className="icono">{seccionesAbiertas.includes(seccion.titulo) ? '▲' : '▼'}</span>
            </button>

            {seccionesAbiertas.includes(seccion.titulo) && (
              <div className="contenido-acordeon">
                {seccion.datos.map((item, i) => (
                  <div className="tarjeta" key={i}>
                    <div className="tarjeta-content">
                      <div className="tarjeta-info">
                        <p><span className="etiqueta">Cargo:</span> {item.cargo}</p>
                        <p><span className="etiqueta">Responsable:</span> {item.nombre}</p>
                        <p><span className="etiqueta">Correo:</span> {item.correo}</p>
                      </div>
                      {item.extension && (
                        <div className="extension">
                          <span>Extensión: {item.extension}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstructuraDirectorio;
