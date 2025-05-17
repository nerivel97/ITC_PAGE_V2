import styles from './style.module.css';
import viviIMG from './imagenesHQI/vivi.png';
import ejercicioIMG from './imagenesHQI/ejercicio.png';
import iaIMG from './imagenesHQI/ia.png';
import mantequillaIMG from './imagenesHQI/mantequilla.png';
import medicinaIMG from './imagenesHQI/medicina.png';

const logros = [
  {
    titulo: "Ingeniera industrial",
    descripcion: "Gestión de Seguridad Operacional de acuerdo a la NOM (Norma Oficial Mexicana).",
    imagen: viviIMG,
    alto: "row-span-2",
    link: "https://www.puertopenasco.tecnm.mx/category/egresados-y-casos-de-exito/"
  },
  {
    titulo: "INSTITUTO DE CÁNCER",
    descripcion: "El ejercicio ayuda a sobrevivientes de cáncer de colon a vivir más tiempo.",
    imagen: ejercicioIMG,
    link: "https://www.infobae.com/salud/2025/02/25/el-ejercicio-ayuda-a-los-sobrevivientes-de-cancer-de-colon-a-vivir-mas-tiempo/"
  },
  {
    titulo: "HOSPITAL GENERAL",
    descripcion: "Reemplazar mantequilla por aceites vegetales puede reducir el riesgo de muerte prematura.",
    imagen: mantequillaIMG,
    link: "https://www.20minutos.es/gastronomia/consumir-aceite-vegetal-mantequilla-vinculado-un-menor-riesgo-muerte-prematura-5688852/"
  },
  {
    titulo: "SALUD PÚBLICA",
    descripcion: "Un equipo utiliza IA para modelar epidemias y mejorar la prevención.",
    imagen: iaIMG,
    link: "https://www.rocheplus.es/innovacion/inteligencia-artificial/ia-contra-pandemias.html"
  },
  {
    titulo: "ESCUELA DE MEDICINA",
    descripcion: "Estudios sobre enfermedades raras ofrecen esperanza a millones de personas.",
    imagen: medicinaIMG,
    link: "https://www.gob.mx/salud/articulos/alrededor-de-8-millones-de-mexicanos-viven-con-enfermedades-raras?idiom=es"
  }
];

export default function HistoriasQueInspiran() {
  return (
    <section className={styles.contenedorprincipal}>
      <h2 className={styles.titulologros}>Historias que inspiran</h2>
      <div className={styles.gridlogros}>
        {logros.map((logro, idx) => (
          <a
            key={idx}
            href={logro.link}
            className={`${styles.tarjeta} ${logro.alto ? styles.grande : ''}`}
          >
            <img src={logro.imagen} alt={logro.titulo} className={styles.imagenajustada} />
            <div className={styles.overlay}>
              <h3 className={styles.titulo}>{logro.titulo}</h3>
              <p className={styles.descripcion}>{logro.descripcion}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
