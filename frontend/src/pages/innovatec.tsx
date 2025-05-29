import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Innovatec.module.css";
import { FaChevronUp, FaChevronDown, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaRegClock } from "react-icons/fa";

interface IEvento {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  lugar: string;
  categoria: string;
  estado: 'proximo' | 'en-curso' | 'finalizado';
  horario: string;
  participantes: string;
  actividades: {
    titulo: string;
    hora: string;
    ponente?: string;
  }[];
}

const Innovatec: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Datos del evento Innovatec
  const innovatecInfo = {
    titulo: "INNOVATEC 2024",
    lema: "Innovación y Tecnología para el Futuro",
    descripcion: "El evento anual de innovación y tecnología más importante del TecNM Campus Cancún donde estudiantes, académicos y profesionales se reúnen para compartir conocimientos, proyectos y experiencias en el ámbito tecnológico.",
    imagenPrincipal: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/501482308_1002702942030131_1492430353810519695_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFkrclGnAGIhxATzFJXVjKECnDQchKZvFYKcNByEpm8VgOIvkz4_ZX1VUN9O8aOxKxOVMpM3rLE99SmlMm4FBvq&_nc_ohc=obLkzoLMOZIQ7kNvwFxcpUJ&_nc_oc=AdkbHXFHHDAT5TycWZTWnZoJzxLKHKHEJug-SAxMVBO7IIJ5qtxOLg1eNNB9Y7twV-c&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=t5dhTbZhMCqEDtf22dduuA&oh=00_AfJ9GBLYSzOxkIEMBjK1viViL2skE-tF_IpQedYILSWZ9Q&oe=683D3EB2",
    fecha: "2025-05-15",
    lugar: "Auditorio Cecilio Chi TecNM Cancún",
    horario: "9:00 a.m. - 1:00 p.m.",
    participantes: "+50 asistentes esperados",
    estado: "Finalizado"
  };

  // Actividades del evento
  const actividades: IEvento[] = [
    {
      id: "1",
      titulo: "Ceremonia de Inauguración",
      descripcion: "Apertura oficial del evento INNOVATEC 2025 con la presencia de autoridades académicas y invitados especiales.",
      imagen: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/500376150_1002702312030194_2003660213842765661_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGCqi0mJ-VZhRaaej-PV_Vn9AVB-gAdWVz0BUH6AB1ZXGf0MjFuCQuvJta4p0UsjEcwSURi2TkdE7b4Fs19TSjN&_nc_ohc=Ey81v2nEOagQ7kNvwFiLmDd&_nc_oc=Adks1j9GE66phTY6EHXzUN0LobIuJyC2C3lV9Rjl5GdRXAI-9yGRDYHcTPW1ADCc0zU&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=KWz6YcDBoBl0gT1kWYo5iQ&oh=00_AfLScYTfEBXrd3FleQF4H17ve1wkpRIwElTyR38TFVyCDQ&oe=683D3407",
      fecha: "2025-05-15",
      lugar: "Edificio Cecilio Chi",
      categoria: "Ceremonia",
      estado: "proximo",
      horario: "09:00 - 1:00",
      participantes: "+50 Asistentes",
      actividades: [
        { titulo: "Registro", hora: "08:30 a.m. - 09:00 a.m." },
        { titulo: "Palabras de bienvenida", hora: "09:00 - 09:20", ponente: "Director del TecNM Cancún" },
        { titulo: "Inauguración oficial", hora: "09:20 - 09:40" },
        { titulo: "Fotografía oficial", hora: "09:40 - 10:00" }
      ]
    },
    {
      id: "2",
      titulo: "Conferencia Magistral: Inteligencia Artificial",
      descripcion: "El Dr. Carlos Martínez explorará los últimos avances en IA y su aplicación en la industria actual.",
      imagen: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/499860075_1002700012030424_6931769395214093770_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFThwI8Xp-Wb2K6YA8vgD9hrnRMoIZBEPOudEyghkEQ87nVMNOBPvbvYE4mQoUlADZFNr1AGwuyM9wNvgKxCtA5&_nc_ohc=lujTrNioJzkQ7kNvwEvE0Hs&_nc_oc=AdllbgWY3LsVJCF-Ol4LAq72mU4c9jSuz0nnTWE2K3vkOpAYIo2s1ZxN_MyS1HmAPoE&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=TwawE7PqJokpSKWVfWvTmg&oh=00_AfKjZPbraQj5ZnJjG39mDS2y67y_QByABicp7R_nL-x-Cw&oe=683D363E",
      fecha: "2025-05-15",
      lugar: "Auditorio Principal",
      categoria: "Conferencia",
      estado: "proximo",
      horario: "10:30 - 12:00",
      participantes: "Estudiantes y académicos",
      actividades: [
        { titulo: "Introducción", hora: "10:30 - 10:45" },
        { titulo: "Fundamentos de IA", hora: "10:45 - 11:15", ponente: "Dr. Carlos Martínez" },
        { titulo: "Casos de estudio", hora: "11:15 - 11:45" },
        { titulo: "Sesión de preguntas", hora: "11:45 - 12:00" }
      ]
    },
    {
      id: "3",
      titulo: "Taller de Desarrollo Web Avanzado",
      descripcion: "Taller práctico donde los participantes desarrollarán una aplicación web completa usando las últimas tecnologías.",
      imagen: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/499928267_1002700628697029_8375233046215178415_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHfQAjZC8HDgLo2m2WqkWxGLz2lnxFl6wgvPaWfEWXrCJiY9vzM9ytBjXSM88fBIAgqL7whRb2WDqTpxgKsfpeK&_nc_ohc=ubXbTJSkt_sQ7kNvwGvY-p1&_nc_oc=AdkirW-dOmZnxmU9Bn-AF56UYd6xGmUThXhjOF5tFTUx4a43vxDMeKxZGlivBJH8thI&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=K0Kuj_RgJFPXDIvEkEOaMA&oh=00_AfLgy9X8MeFNbJJdXzLqb7Hctmv3CDpZmsin9gwILVJI7g&oe=683D2780",
      fecha: "2025-05-15",
      lugar: "Laboratorio 5",
      categoria: "Taller",
      estado: "proximo",
      horario: "12:00 - 14:00",
      participantes: "Máx. 30 participantes",
      actividades: [
        { titulo: "Configuración inicial", hora: "12:00 - 12:30" },
        { titulo: "Desarrollo frontend", hora: "12:30 - 13:30", ponente: "Ing. Laura Sánchez" },
        { titulo: "Desarrollo backend", hora: "13:30 - 14:00" }
      ]
    },
    {
      id: "4",
      titulo: "Exposición de Proyectos Estudiantiles",
      descripcion: "Los estudiantes presentarán sus proyectos innovadores desarrollados durante el semestre.",
      imagen: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/499914414_1002700582030367_8210355062789956686_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGdLTyPd5K7laiaGNI8FK61BOPBeNCL59EE48F40Ivn0Q36TLaZKWls7cxVXv1kZKh5Oa3HV4exDPIIpwXZahnj&_nc_ohc=5cL_wW0iBM8Q7kNvwEtDHGN&_nc_oc=AdkDeoOFw0H0_9eXriJjkKC6JriI0tgD_j4l7w1QRLKQ71Hd8FZsTNozXLqiPgal0vw&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=ft9g8FsUEn9EcNbaxqtAjA&oh=00_AfLBVwVlPRYzTeR_6xGSek1NGKofmDTlxBiHz-qzyi9UBw&oe=683D2786",
      fecha: "2025-05-15",
      lugar: "Plaza Cívica",
      categoria: "Exposición",
      estado: "proximo",
      horario: "14:00 - 16:00",
      participantes: "Abierto al público",
      actividades: [
        { titulo: "Montaje de stands", hora: "13:30 - 14:00" },
        { titulo: "Presentación de proyectos", hora: "14:00 - 15:30" },
        { titulo: "Evaluación", hora: "15:30 - 16:00" }
      ]
    },
    {
      id: "5",
      titulo: "Panel: El Futuro de la Tecnología",
      descripcion: "Discusión con expertos sobre las tendencias tecnológicas que moldearán los próximos años.",
      imagen: "https://scontent.fmid3-1.fna.fbcdn.net/v/t39.30808-6/499932019_1002701195363639_5612962288432418749_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeG7kYMK8R6gHFF_lvrBn7rouhzHdauYGHu6HMd1q5gYe2Yy2qeQk79HjrcNWcKaj2AQxdYMRpgk_IFPqrEii09b&_nc_ohc=WdAvP3enXi8Q7kNvwElwFXB&_nc_oc=AdkOEbSDlVxT78rkUppqMfbjac-WqgZuJ5DUzwpi8gK1ti8lHdtSxqVxN9_j2mo0zzU&_nc_zt=23&_nc_ht=scontent.fmid3-1.fna&_nc_gid=jK6nTzGAHbp0FQYfzt8ylw&oh=00_AfKAcNPLgcAcwTaTGoBMcn9AzsLCZW2_Tm3rH25Y2gjKSQ&oe=683D4ACD",
      fecha: "2025-05-15",
      lugar: "Auditorio Principal",
      categoria: "Panel",
      estado: "proximo",
      horario: "16:30 - 18:00",
      participantes: "Todos los asistentes",
      actividades: [
        { titulo: "Introducción al panel", hora: "16:30 - 16:40" },
        { titulo: "Tendencias tecnológicas", hora: "16:40 - 17:20", ponente: "Panel de expertos" },
        { titulo: "Discusión abierta", hora: "17:20 - 17:50" },
        { titulo: "Cierre", hora: "17:50 - 18:00" }
      ]
    }
  ];

  const handleClick = (ruta: string = "#") => {
    if (ruta && ruta !== "#") {
      navigate(ruta);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
    target.alt = "Imagen no disponible";
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("es-MX", options);
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return dateString;
    }
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      const slideHeight = carouselRef.current.children[0]?.clientHeight || 0;
      carouselRef.current.scrollTo({
        top: index * slideHeight,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  const handleScrollUp = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  const handleScrollDown = () => {
    if (carouselRef.current && currentSlide < actividades.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'en-curso':
        return <span className={styles.badgeEnCurso}>En curso</span>;
      case 'finalizado':
        return <span className={styles.badgeFinalizado}>Finalizado</span>;
      case 'proximo':
        return <span className={styles.badgeProximo}>Próximo</span>;
      default:
        return null;
    }
  };

  return (
    <section className={styles.container} aria-labelledby="innovatec-heading">
      <header className={styles.sectionHeader}>
        <h1 id="innovatec-heading" className={styles.sectionTitle}>
          {innovatecInfo.titulo}
        </h1>
        <p className={styles.sectionLema}>{innovatecInfo.lema}</p>
      </header>

      {/* Información principal del evento */}
      <article className={styles.mainEvent}>
        <div className={styles.imageContainer}>
          <img
            src={innovatecInfo.imagenPrincipal}
            alt={`Cartel ${innovatecInfo.titulo}`}
            className={styles.mainImage}
            onError={handleImageError}
          />
          <div className={styles.eventBadge}>
            {getEstadoBadge(innovatecInfo.estado)}
          </div>
        </div>
        
        <div className={styles.eventInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.infoIcon} />
              <div>
                <h3>Fecha</h3>
                <p>{formatDate(innovatecInfo.fecha)}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div>
                <h3>Lugar</h3>
                <p>{innovatecInfo.lugar}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaRegClock className={styles.infoIcon} />
              <div>
                <h3>Horario</h3>
                <p>{innovatecInfo.horario}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaUsers className={styles.infoIcon} />
              <div>
                <h3>Participantes</h3>
                <p>{innovatecInfo.participantes}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.eventDescription}>
            <h2>Acerca del evento</h2>
            <p>{innovatecInfo.descripcion}</p>
          </div>
        </div>
      </article>

      {/* Agenda del evento */}
      <section className={styles.agendaSection}>
        <h2 className={styles.agendaTitle}>Agenda del Evento</h2>
        <p className={styles.agendaSubtitle}>Conoce las actividades programadas para INNOVATEC 2025</p>
        
        <div className={styles.agendaContent}>
          <aside className={styles.agendaSidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Actividades</h3>
              <div className={styles.carouselControls}>
                <button
                  className={`${styles.controlButton} ${
                    currentSlide === 0 ? styles.disabled : ""
                  }`}
                  onClick={handleScrollUp}
                  disabled={currentSlide === 0}
                  aria-label="Actividad anterior"
                >
                  <FaChevronUp />
                </button>
                <button
                  className={`${styles.controlButton} ${
                    currentSlide >= actividades.length - 1
                      ? styles.disabled
                      : ""
                  }`}
                  onClick={handleScrollDown}
                  disabled={currentSlide >= actividades.length - 1}
                  aria-label="Siguiente actividad"
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>

            <div className={styles.carouselContainer} ref={carouselRef}>
              {actividades.map((actividad) => (
                <article
                  key={actividad.id}
                  className={styles.sidebarArticle}
                  onClick={() => handleClick(`/innovatec/actividad/${actividad.id}`)}
                  style={{ cursor: "pointer" }}
                  aria-label={`Actividad: ${actividad.titulo}`}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleClick(`/innovatec/actividad/${actividad.id}`)
                  }
                >
                  <div className={styles.sidebarContent}>
                    <div className={styles.sidebarImageContainer}>
                      <img
                        src={actividad.imagen}
                        alt=""
                        loading="lazy"
                        onError={handleImageError}
                        className={styles.sidebarImage}
                      />
                    </div>
                    <div className={styles.textContent}>
                      <div className={styles.activityMeta}>
                        <span className={styles.activityTime}>
                          {actividad.horario}
                        </span>
                        <span className={styles.activityCategory}>
                          {actividad.categoria}
                        </span>
                      </div>
                      <h3 className={styles.activityTitle}>
                        {actividad.titulo}
                      </h3>
                      <div className={styles.activityBadge}>
                        {getEstadoBadge(actividad.estado)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          {/* Detalle de la actividad seleccionada */}
          <div className={styles.activityDetail}>
            {actividades.length > 0 && (
              <>
                <h3>{actividades[currentSlide].titulo}</h3>
                <div className={styles.detailMeta}>
                  <span><FaCalendarAlt /> {formatDate(actividades[currentSlide].fecha)}</span>
                  <span><FaRegClock /> {actividades[currentSlide].horario}</span>
                  <span><FaMapMarkerAlt /> {actividades[currentSlide].lugar}</span>
                </div>
                
                <p className={styles.detailDescription}>
                  {actividades[currentSlide].descripcion}
                </p>
                
                <h4>Programa:</h4>
                <ul className={styles.activitySchedule}>
                  {actividades[currentSlide].actividades.map((item, index) => (
                    <li key={index}>
                      <span className={styles.scheduleTime}>{item.hora}</span>
                      <div>
                        <strong>{item.titulo}</strong>
                        {item.ponente && <p className={styles.speaker}>{item.ponente}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
                
                <button className={styles.registerButton}>
                  Registrarse a esta actividad
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Innovatec;