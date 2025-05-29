import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Concursos.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface IConcurso {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
  categoria: string;
  estado: 'activo' | 'finalizado' | 'proximamente';
  requisitos: string[];
}

const Concursos: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Datos de los concursos
  const concursos: IConcurso[] = [
    {
      id: "1",
      titulo: "Concurso Nacional de Innovación Tecnológica 2025",
      descripcion: "Participa en el concurso más importante de innovación tecnológica para estudiantes del TecNM. Premios en efectivo y oportunidades de incubación para los mejores proyectos.",
      imagen: "https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/499925808_1002701565363602_1528923798069595850_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=UqCBgSeE9eIQ7kNvwHZtqMb&_nc_oc=AdnkKRyhsObH6DsOY9d9Ti7BMcQTOato0iH92CI6uf2owt0YjZEQix2A4zNcDAea5UM&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=P4L6G5tUWHydoRth7i9ElQ&oh=00_AfI0g-5Q_g-TRPm4h92WIH1X13yb-1t_8N206Z4A2nXjFQ&oe=683D17C2",
      fecha: "2025-11-15",
      categoria: "Tecnología",
      estado: "activo",
      requisitos: ["Ser estudiante activo", "Proyecto innovador", "Equipo de 3 a 5 personas"]
    },
    {
      id: "2",
      titulo: "Concurso de Robótica Intercampus",
      descripcion: "Demuestra tus habilidades en robótica compitiendo contra equipos de otros campus del TecNM. Inscripciones abiertas hasta el 10 de octubre.",
      imagen: "https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/499531480_1000335098933582_1951397396243827054_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=UFEb033HJfsQ7kNvwG-RI83&_nc_oc=AdnQyN_0ht-56aEpyRv9bkfIMUAYVADGbLIekGLg0nSf2im-TcNcZKMKOrHWfrkqkzs&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=G4GtunfQx2ODtQN9hl7FNw&oh=00_AfIK63zn-66PrHFP4-VMp5ZHvly2Mc0YIZ0PTzwNV5NcxA&oe=683D2ECD",
      fecha: "2023-10-30",
      categoria: "Robótica",
      estado: "activo",
      requisitos: ["Conocimientos básicos de robótica", "Equipo de 2 a 4 personas", "Carta compromiso"]
    },
    {
      id: "3",
      titulo: "Hackathon de Seguridad Informática",
      descripcion: "24 horas de programación intensiva para resolver desafíos de seguridad informática. Premios para los tres primeros lugares.",
      imagen: "https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/499043161_1000334638933628_8798144031099101470_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_ohc=LRxw-f2e8GYQ7kNvwGqJiNM&_nc_oc=AdnIwfYsBvROZTUlHm1YPm8Zj6qE3y1s3eV6ZJACht_2ZIJsqruV3Z5ZM2RUMirN4YQ&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=iNMLgWRYdgOYr7fxBKe42g&oh=00_AfIcdlufQU1oqRkxcIwRghFKoHxrQXahURM3V0l5bt5maw&oe=683D1DBF",
      fecha: "2025-12-09",
      categoria: "Seguridad",
      estado: "proximamente",
      requisitos: ["Conocimientos en programación", "Mayor de 18 años", "Laptop propia"]
    },
    {
      id: "4",
      titulo: "Concurso de Fotografía Científica",
      descripcion: "Captura imágenes que muestren la belleza de la ciencia y la tecnología. Las mejores fotografías serán exhibidas en el edificio principal.",
      imagen: "https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/499992705_1001939478773144_8189279073428814371_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=oeJIyQV4_RwQ7kNvwE0GonJ&_nc_oc=AdkOMBzPntQdWzg0XA1fO6YRFmSZZN9Wgzh9IbPJmHCLqRJ8VhZJ62MGDol-LtGwkqE&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=4gaW-pEc-JInx7LtGYmtng&oh=00_AfJlUmD7xlSF_bWcTIQaqnifZJYSbJhhpMPMH9MAchL66Q&oe=683D13C4",
      fecha: "2024-09-20",
      categoria: "Arte y Ciencia",
      estado: "finalizado",
      requisitos: ["Cámara profesional o smartphone", "Tema científico", "Formato JPG"]
    },
    {
      id: "5",
      titulo: "Torneo de Programación ACM",
      descripcion: "Prepárate para el torneo de programación más prestigioso del TecNM. Los ganadores representarán al campus en la competencia nacional.",
      imagen: "https://scontent-qro1-2.xx.fbcdn.net/v/t39.30808-6/499862261_1001938365439922_941908336855039830_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=DbvfwQHCwZEQ7kNvwEfXOUH&_nc_oc=AdkBkHOnoaizXC8gQT-tXm1A6Bf_-zt4LZQvDZizkOZiRkK571j7B6YwTASzEdn0VhE&_nc_zt=23&_nc_ht=scontent-qro1-2.xx&_nc_gid=YJQ7i-7VGzEqLzINnApQTQ&oh=00_AfJWCVnQwpOkyQv1-wQCnfb9ZDY1lNWFGS7kOUgxtEyAfA&oe=683D29B8",
      fecha: "2024-02-15",
      categoria: "Programación",
      estado: "proximamente",
      requisitos: ["Conocimientos avanzados de algoritmos", "Equipo de 3 personas", "Prueba de selección previa"]
    },
    {
      id: "6",
      titulo: "Concurso de Emprendimiento Social",
      descripcion: "Presenta proyectos que resuelvan problemas sociales en tu comunidad. Premios en efectivo y asesoría para implementación.",
      imagen: "https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/500279306_1000974738869618_3588735946381716585_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nqhMz-PZjL8Q7kNvwHufVGn&_nc_oc=AdnJZ_5cSMdORp2ccpy1mjbFiDL33GHG10nONC6hWaMy5NfRWaH6Y31Tqoj3kTHOs4k&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=JVDEs8VcvaOq-90gvgajxA&oh=00_AfJPHJhP_w7ZU2HnVL8Akq_wZoUgpXnAMXyV0kxFRHOi7Q&oe=683D2FBD",
      fecha: "2025-28-05",
      categoria: "Emprendimiento",
      estado: "activo",
      requisitos: ["Proyecto con impacto social", "Equipo multidisciplinario", "Plan de implementación"]
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

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
    if (carouselRef.current && currentSlide < concursosSecundarios.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case 'activo':
        return <span className={styles.badgeActivo}>Activo</span>;
      case 'finalizado':
        return <span className={styles.badgeFinalizado}>Finalizado</span>;
      case 'proximamente':
        return <span className={styles.badgeProximamente}>Próximamente</span>;
      default:
        return null;
    }
  };

  const concursoPrincipal = concursos[0];
  const concursosSecundarios = concursos.slice(1, 6); // Limitar a 5 concursos secundarios

  return (
    <section className={styles.container} aria-labelledby="concursos-heading">
      <header className={styles.sectionHeader}>
        <h2 id="concursos-heading" className={styles.sectionTitle}>
          Concursos del TecNM Cancún
        </h2>
        <p className={styles.sectionSubtitle}>
          Participa en nuestros concursos académicos y demuestra tu talento
        </p>
      </header>

      <div className={styles.content}>
        {/* Concurso Principal */}
        <article
          className={styles.mainArticle}
          onClick={() => handleClick(`/innovatec`)}
          style={{ cursor: "pointer" }}
          aria-label={`Concurso principal: ${concursoPrincipal.titulo}`}
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && handleClick(`/innovatec`)
          }
        >
          <div className={styles.imageContainer}>
            <img
              src={concursoPrincipal.imagen}
              alt={concursoPrincipal.titulo}
              loading="lazy"
              onError={handleImageError}
              className={styles.mainImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.articleBadge}>
              {getEstadoBadge(concursoPrincipal.estado)}
            </div>
          </div>
          <div className={styles.articleContent}>
            <div className={styles.articleMeta}>
              <time dateTime={concursoPrincipal.fecha} className={styles.articleDate}>
                {formatDate(concursoPrincipal.fecha)}
              </time>
              <span className={styles.articleCategory}>
                {concursoPrincipal.categoria}
              </span>
            </div>
            <h3 className={styles.mainArticleTitle}>
              {concursoPrincipal.titulo}
            </h3>
            <p className={styles.mainArticleDescription}>
              {truncateText(concursoPrincipal.descripcion, 300)}
            </p>
            <div className={styles.requisitosContainer}>
              <h4>Requisitos:</h4>
              <ul className={styles.requisitosList}>
                {concursoPrincipal.requisitos.slice(0, 3).map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <button
              className={styles.buttonhover}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(`/innovatec`);
              }}
            >
              Ver detalles
            </button>
          </div>
        </article>

        {/* Sidebar con carrusel vertical */}
        <aside className={styles.sidebar} aria-label="Más concursos">
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Más concursos</h3>
            <div className={styles.carouselControls}>
              <button
                className={`${styles.controlButton} ${
                  currentSlide === 0 ? styles.disabled : ""
                }`}
                onClick={handleScrollUp}
                disabled={currentSlide === 0}
                aria-label="Concurso anterior"
              >
                <FaChevronUp />
              </button>
              <button
                className={`${styles.controlButton} ${
                  currentSlide >= concursosSecundarios.length - 1
                    ? styles.disabled
                    : ""
                }`}
                onClick={handleScrollDown}
                disabled={currentSlide >= concursosSecundarios.length - 1}
                aria-label="Siguiente concurso"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          <div className={styles.carouselContainer} ref={carouselRef}>
            {concursosSecundarios.length > 0 ? (
              concursosSecundarios.map((concurso) => (
                <article
                  key={concurso.id}
                  className={styles.sidebarArticle}
                  onClick={() => handleClick(`/concursorobotica`)}
                  style={{ cursor: "pointer" }}
                  aria-label={`Concurso: ${concurso.titulo}`}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleClick(`/concursorobotica`)
                  }
                >
                  <div className={styles.sidebarContent}>
                    {concurso.imagen && (
                      <div className={styles.sidebarImageContainer}>
                        <img
                          src={concurso.imagen}
                          alt=""
                          loading="lazy"
                          onError={handleImageError}
                          className={styles.sidebarImage}
                        />
                        <div className={styles.sidebarBadge}>
                          {getEstadoBadge(concurso.estado)}
                        </div>
                      </div>
                    )}
                    <div className={styles.textContent}>
                      <div className={styles.sidebarMeta}>
                        <time dateTime={concurso.fecha} className={styles.articleDate}>
                          {formatDate(concurso.fecha)}
                        </time>
                        <span className={styles.articleCategory}>
                          {concurso.categoria}
                        </span>
                      </div>
                      <h4 className={styles.sidebarArticleTitle}>
                        {concurso.titulo}
                      </h4>
                      <p className={styles.sidebarArticleDescription}>
                        {truncateText(concurso.descripcion, 100)}
                      </p>
                    </div>
                    <button
                      className={styles.buttonhover}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(`/concursorobotica`);
                      }}
                    >
                      Ver detalles
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className={styles.noArticles}>
                No hay más concursos disponibles
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Concursos;