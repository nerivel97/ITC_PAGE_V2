import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/OfertasComponents/Breadcrumbs/Breadcrumbs';
import { ICarrera } from '../admin/interfaces/oferta.interface';
import { message } from 'antd';
import '../components/OfertasComponents/Carreras.css';

const Carreras: React.FC = () => {
  const { carreraSlug } = useParams<{ carreraSlug: string }>(); // Cambiado de carreraNombre a carreraSlug
  const [carrera, setCarrera] = useState<ICarrera | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        setLoading(true);
        // Cambiar la URL para buscar por url_slug en lugar de ID
        const response = await fetch(`http://localhost:8000/api/carreras?slug=${carreraSlug}`);
        
        if (!response.ok) {
          throw new Error('Carrera no encontrada');
        }

        const data = await response.json();
        
        if (!data.success || !data.data) {
          throw new Error(data.message || 'Error al cargar la carrera');
        }

        setCarrera(data.data);
      } catch (error) {
        if (error instanceof Error) {
          message.error(error.message);
        } else {
          message.error('Error desconocido al cargar la carrera');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCarrera();
  }, [carreraSlug]); // Cambiado de carreraNombre a carreraSlug


  if (loading) {
    return <div className="carrera-container">Cargando información de la carrera...</div>;
  }

  if (!carrera) {
    return (
      <div className="notFoundContainer">
        <h1>Programa no encontrado</h1>
        <p>La carrera solicitada no existe en nuestros registros.</p>
      </div>
    );
  }

  // Transformar datos del backend al formato esperado por el frontend
  
  // Obtener misiones, visiones y objetivos desde el backend
  const misiones = carrera.mision_vision_objetivos?.filter(m => m.tipo === 'mision').map(m => m.contenido).join('\n') || '';
  const visiones = carrera.mision_vision_objetivos?.filter(m => m.tipo === 'vision').map(m => m.contenido).join('\n') || '';
  const objetivos = carrera.mision_vision_objetivos?.filter(m => m.tipo === 'objetivo').map(m => m.contenido).join('\n') || '';
  
  // Obtener perfiles de alumno
  const perfilIngreso = carrera.perfil_alumno?.find(p => p.tipo === 'ingreso')?.descripcion || '';
  const perfilEgreso = carrera.perfil_alumno?.find(p => p.tipo === 'egreso')?.descripcion || '';
  
  // Obtener campos laborales y funciones profesionales
  const camposLaborales = carrera.campos_laborales?.map(c => c.descripcion).join('\n') || '';
  const funcionesProfesionales = carrera.funciones_profesionales?.map(f => f.descripcion).join('\n') || '';

  return (
    <div className="carrera-container" style={{ '--primary-color': carrera.bg_color } as React.CSSProperties}>
      <Breadcrumbs currentPage={carrera.title} />
      
      {/* Banner */}
      <div className="banner-container">
        {carrera.imagen_banner ? (
          <img 
            src={carrera.imagen_banner}
            alt={`Banner de ${carrera.title}`}
            className="banner-image"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder-banner.png';
              e.currentTarget.className = 'banner-placeholder';
            }}
          />
        ) : (
          <div className="banner-placeholder">
            <p>Esta carrera no tiene imagen de banner</p>
          </div>
        )}
        <div className="title-overlay">
          <h1>{carrera.title}</h1>
          <p className="tagline">{carrera.description?.split('\n')[0]}</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-wrapper">
        {/* Información general con logo */}
        <section className="info-section">
          <div className="logo-container">
            {carrera.foto_mascota ? (
              <img 
                src={carrera.foto_mascota} 
                alt={`Logo ${carrera.title}`}
                className="logo-image"
              />
            ) : (
              <div className="logo-placeholder">
                <p>No hay logo disponible</p>
              </div>
            )}
          </div>
          <div className="description-container">
            {carrera.description?.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Información general */}
        <section className="general-info">
          <h2>INFORMACIÓN GENERAL</h2>
          <div className="info-grid">
            <div className="info-item">
              <img src="/src/assets/Fotos/tipo.png" alt="Tipo" />
              <p><strong>Tipo:</strong> {carrera.tipo.charAt(0).toUpperCase() + carrera.tipo.slice(1)}</p>
            </div>
            <div className="info-item">
              <img src="/src/assets/Fotos/modo.png" alt="Modalidad" />
              <p><strong>Modalidad:</strong> Presencial</p>
            </div>
            <div className="info-item">
              <img src="/src/assets/Fotos/duracion.png" alt="Duracion" />
              <p><strong>Duración:</strong> 8 semestres (4 años)</p>
            </div>
          </div>
        </section>

        {/* Objetivos, Misión y Visión */}
        <section className="vision-section">
          <h2>OBJETIVOS, MISIÓN Y VISIÓN</h2>
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-icon">
                <img src="/Fotos/Carreras/obj.png" alt="Objetivos" />
              </div>
              <h3>Objetivos</h3>
              <div className="vision-content">
                {objetivos.split('\n').filter(Boolean).map((item, i) => (
                  <div key={i} className="vision-item">
                    <img src="/Fotos/Carreras/bandera.png" alt="Ícono" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="vision-card">
              <div className="vision-icon">
                <img src="/Fotos/Carreras/mis.png" alt="Misión" />
              </div>
              <h3>Misión</h3>
              <div className="vision-content">
                {misiones.split('\n').filter(Boolean).map((item, i) => (
                  <div key={i} className="vision-item">
                    <img src="/Fotos/Carreras/bandera.png" alt="Ícono" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="vision-card">
              <div className="vision-icon">
                <img src="/Fotos/Carreras/vis.png" alt="Visión" />
              </div>
              <h3>Visión</h3>
              <div className="vision-content">
                {visiones.split('\n').filter(Boolean).map((item, i) => (
                  <div key={i} className="vision-item">
                    <img src="/Fotos/Carreras/bandera.png" alt="Ícono" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Perfiles */}
        <div className="profiles-container">
          <section className="profile-section">
            <h2>PERFIL DE INGRESO</h2>
            <div className="profile-content">
              <div className="profile-text">
                {perfilIngreso.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="profile-image">
                {carrera.foto_ingreso ? (
                  <img src={carrera.foto_ingreso} alt="Perfil de ingreso" />
                ) : (
                  <div className="image-placeholder">
                    <p>No hay imagen disponible</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="profile-section reverse">
            <h2>PERFIL DE EGRESO</h2>
            <div className="profile-content">
              <div className="profile-text">
                {perfilEgreso.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="profile-image">
                {carrera.foto_egreso ? (
                  <img src={carrera.foto_egreso} alt="Perfil de egreso" />
                ) : (
                  <div className="image-placeholder">
                    <p>No hay imagen disponible</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Campo Laboral */}
        <section className="work-field">
          <h2>CAMPO LABORAL</h2>
          <div className="work-field-grid">
            <div className="work-area">
              <h3>
                <img src="/Fotos/Carreras/campo.png" alt="Campo laboral" />
                OPORTUNIDADES LABORALES
              </h3>
              <div className="work-items">
                {camposLaborales.split('\n').filter(Boolean).map((item, i) => (
                  <div key={i} className="work-item">
                    <img src="/Fotos/Carreras/engranaje.png" alt="Ícono" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="work-area">
              <h3>
                <img src="/Fotos/Carreras/func.png" alt="Funciones" />
                FUNCIONES PROFESIONALES
              </h3>
              <div className="work-items">
                {funcionesProfesionales.split('\n').filter(Boolean).map((item, i) => (
                  <div key={i} className="work-item">
                    <img src="/Fotos/Carreras/palo.png" alt="Ícono" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Carreras;