import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Noticias.module.css";

interface SidebarArticle {
  titulo: string;
  descripcion: string;
  imagen?: string;
  ruta?: string; // Nueva propiedad para la ruta
}

interface NoticiasProps {
  tituloSeccion: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  imagenAlt?: string;
  rutaPrincipal?: string; // Ruta para el artículo principal
  sidebarArticulos: SidebarArticle[];
}

const Noticias: React.FC<NoticiasProps> = ({
  tituloSeccion,
  subtitulo,
  descripcion,
  imagen,
  imagenAlt = "",
  rutaPrincipal = "#", // Valor por defecto
  sidebarArticulos,
}) => {
  const navigate = useNavigate();

  const handleClick = (ruta: string = "#") => {
    if (ruta && ruta !== "#") {
      navigate(ruta);
    }
  };

  return (
    <section className={styles.container} aria-labelledby="noticias-heading">
      <h2 id="noticias-heading" className={styles.sectionTitle}>
        {tituloSeccion}
      </h2>
      
      <div className={styles.content}>
        <article 
          className={styles.mainArticle}
          onClick={() => handleClick(rutaPrincipal)}
          style={{ cursor: rutaPrincipal !== "#" ? "pointer" : "default" }}
        >
          <div className={styles.imagePlaceholder}>
            <img src={imagen} alt={imagenAlt} loading="lazy" />
          </div>
          <div className={styles.articleContent}>
            <h3>{subtitulo}</h3>
            <p>{descripcion}</p>
          </div>
        </article>

        <aside className={styles.sidebar}>
          {sidebarArticulos.map((articulo, index) => (
            <React.Fragment key={`${articulo.titulo}-${index}`}>
              <article 
                className={styles.sidebarArticle}
                onClick={() => handleClick(articulo.ruta)}
                style={{ cursor: articulo.ruta ? "pointer" : "default" }}
              >
                <div className={styles.textContent}>
                  <h4>{articulo.titulo}</h4>
                  <p>{articulo.descripcion}</p>
                </div>
                {articulo.imagen && (
                  <div className={styles.imagePlaceholderSmall}>
                    <img src={articulo.imagen} alt="" loading="lazy" />
                  </div>
                )}
              </article>
              {index < sidebarArticulos.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default Noticias;