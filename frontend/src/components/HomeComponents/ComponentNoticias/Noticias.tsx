import React from "react";
import styles from "./Noticias.module.css";

interface SidebarArticle {
  titulo: string;
  descripcion: string;
  imagen?: string; // Hacer opcional para futura expansión
}

interface NoticiasProps {
  tituloSeccion: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  imagenAlt?: string; // Añadir texto alternativo para accesibilidad
  sidebarArticulos: SidebarArticle[];
}

const Noticias: React.FC<NoticiasProps> = ({
  tituloSeccion,
  subtitulo,
  descripcion,
  imagen,
  imagenAlt = "", // Valor por defecto
  sidebarArticulos,
}) => {
  return (
    <section className={styles.container} aria-labelledby="noticias-heading">
      <h2 id="noticias-heading" className={styles.sectionTitle}>
        {tituloSeccion}
      </h2>
      
      <div className={styles.content}>
        <article className={styles.mainArticle}>
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
              <article className={styles.sidebarArticle}>
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