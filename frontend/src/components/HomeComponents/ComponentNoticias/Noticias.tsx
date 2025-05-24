import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Noticias.module.css";
import { fetchNoticias } from "../../../admin/services/noticias.service";
import { INoticia } from "../../../admin/interfaces/noticia.interface";
import { FaSync, FaChevronUp, FaChevronDown } from "react-icons/fa";

const Noticias: React.FC = () => {
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState<INoticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const data = await fetchNoticias();
        setNoticias(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar las noticias");
        setLoading(false);
        console.error(err);
      }
    };

    cargarNoticias();
  }, []);

  const handleClick = (ruta: string = "#") => {
    if (ruta && ruta !== "#") {
      navigate(ruta);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src =
      "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
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
    if (carouselRef.current && currentSlide < noticiasSecundarias.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  // Estado de carga mejorado
  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando noticias...</p>
      </div>
    );

  // Estado de error mejorado
  if (error)
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <svg className={styles.errorIllustration} viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="#e5e5fc" />
            <path d="M100,30 L105,140 L95,140 Z" fill="#4f72e6" />
            <circle cx="100" cy="170" r="10" fill="#4f72e6" />
          </svg>
          <h3 className={styles.errorTitle}>¡Ups! Algo salió mal</h3>
          <p className={styles.errorMessage}>{error}</p>
          <button
            className={styles.errorButton}
            onClick={() => window.location.reload()}
          >
            <FaSync className={styles.refreshIcon} /> Reintentar
          </button>
        </div>
      </div>
    );

  // Estado vacío mejorado
  if (noticias.length === 0)
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIllustration} viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="#f5f5f5" />
          <path
            d="M70,70 L130,130 M70,130 L130,70"
            stroke="#ccc"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <h3>No hay noticias disponibles</h3>
        <p>
          Actualmente no hay noticias publicadas. Vuelve a revisar más tarde.
        </p>
      </div>
    );

  const noticiaPrincipal = noticias[0];
  const noticiasSecundarias = noticias.slice(1, 6); // Limitar a 5 noticias secundarias

  return (
    <section className={styles.container} aria-labelledby="noticias-heading">
      <header className={styles.sectionHeader}>
        <h2 id="noticias-heading" className={styles.sectionTitle}>
          Últimas Noticias
        </h2>
      </header>

      <div className={styles.content}>
        {/* Artículo Principal */}
        <article
          className={styles.mainArticle}
          onClick={() =>
            handleClick(`/noticias/${noticiaPrincipal.id_noticia}`)
          }
          style={{ cursor: "pointer" }}
          aria-label={`Artículo principal: ${noticiaPrincipal.nombre_noticia}`}
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleClick(`/noticias/${noticiaPrincipal.id_noticia}`)
          }
        >
          <div className={styles.imageContainer}>
            <img
              src={
                noticiaPrincipal.imagen ||
                "https://via.placeholder.com/800x400?text=Noticia+principal"
              }
              alt={noticiaPrincipal.nombre_noticia}
              loading="lazy"
              onError={handleImageError}
              className={styles.mainImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.articleBadge}>Destacado</div>
          </div>
          <div className={styles.articleContent}>
            <div className={styles.articleMeta}>
              <time
                dateTime={noticiaPrincipal.fecha_publicacion}
                className={styles.articleDate}
              >
                {formatDate(noticiaPrincipal.fecha_publicacion)}
              </time>
              <span className={styles.articleAuthor}>
                Por {noticiaPrincipal.autor}
              </span>
            </div>
            <h3 className={styles.mainArticleTitle}>
              {noticiaPrincipal.nombre_noticia}
            </h3>
            <p className={styles.mainArticleDescription}>
              {truncateText(noticiaPrincipal.descripcion, 300)}
            </p>
            <button
              className={styles.buttonhover}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(`/noticias/${noticiaPrincipal.id_noticia}`);
              }}
            >
              Leer más
            </button>
          </div>
        </article>

        {/* Sidebar con carrusel vertical */}
        <aside className={styles.sidebar} aria-label="Más noticias">
          <div className={styles.sidebarHeader}>
            <h3 className={styles.sidebarTitle}>Más noticias</h3>
            <div className={styles.carouselControls}>
              <button
                className={`${styles.controlButton} ${
                  currentSlide === 0 ? styles.disabled : ""
                }`}
                onClick={handleScrollUp}
                disabled={currentSlide === 0}
                aria-label="Noticia anterior"
              >
                <FaChevronUp />
              </button>
              <button
                className={`${styles.controlButton} ${
                  currentSlide >= noticiasSecundarias.length - 1
                    ? styles.disabled
                    : ""
                }`}
                onClick={handleScrollDown}
                disabled={currentSlide >= noticiasSecundarias.length - 1}
                aria-label="Siguiente noticia"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>

          <div className={styles.carouselContainer} ref={carouselRef}>
            {noticiasSecundarias.length > 0 ? (
              noticiasSecundarias.map((noticia) => (
                <article
                  key={noticia.id_noticia}
                  className={styles.sidebarArticle}
                  onClick={() => handleClick(`/noticias/${noticia.id_noticia}`)}
                  style={{ cursor: "pointer" }}
                  aria-label={`Artículo: ${noticia.nombre_noticia}`}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleClick(`/noticias/${noticia.id_noticia}`)
                  }
                >
                  <div className={styles.sidebarContent}>
                    {noticia.imagen && (
                      <div className={styles.sidebarImageContainer}>
                        <img
                          src={noticia.imagen}
                          alt=""
                          loading="lazy"
                          onError={handleImageError}
                          className={styles.sidebarImage}
                        />
                      </div>
                    )}
                    <div className={styles.textContent}>
                      <time
                        dateTime={noticia.fecha_publicacion}
                        className={styles.articleDate}
                      >
                        {formatDate(noticia.fecha_publicacion)}
                      </time>
                      <h4 className={styles.sidebarArticleTitle}>
                        {noticia.nombre_noticia}
                      </h4>
                      <p className={styles.sidebarArticleDescription}>
                        {truncateText(noticia.descripcion, 100)}
                      </p>
                    </div>
                    <button
                      className={styles.buttonhover}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(`/noticias/${noticia.id_noticia}`); // Cambiado a noticia.id_noticia
                      }}
                    >
                      Leer más
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className={styles.noArticles}>
                No hay más artículos disponibles
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Noticias;
