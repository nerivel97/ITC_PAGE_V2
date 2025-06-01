import styles from './style.module.css';
import nasaIMG from './imagenesHQI/NASA.png';
import carreraIMG from './imagenesHQI/carrera.png';
import andresIMG from './imagenesHQI/andres.png';
import programaIMG from './imagenesHQI/programa.png';
import agedrezIMG from './imagenesHQI/agedrez.png';

const logros = [
  {
    titulo: "Concurso de la NASA",
    descripcion: "Estudiante del ITC participara en concurso de la NASA.",
    imagen: nasaIMG,
    alto: "row-span-2",
    link: "https://www.facebook.com/share/p/191zVVjpkF/"
  },
  {
    titulo: "¡TEC. CANCÚN EN 3MIL Y 10MIL!",
    descripcion: "Soberbio el competidor Juan Zubiran Ortiz del Instituto Tecnológico de Cancún.",
    imagen: carreraIMG,
    link: "https://www.facebook.com/share/p/14EoWy85tnU/"
  },
  {
    titulo: "programa de credenciales CROC",
    descripcion: "Jonathan Ernesto Tamay impulsa el programa de credenciales CROC en universidades de Benito Juárez.",
    imagen: programaIMG,
    link: "https://www.facebook.com/share/p/16t37bXfsx/"
  },
  {
    titulo: "Andrés Enrique Tec Osorio",
    descripcion: "seleccionado para el Programa Internacional Air and Space Program (IASP).",
    imagen: andresIMG,
    link: "https://www.facebook.com/share/p/1AJ791cNXb/"
  },
  {
    titulo: "PRIMER TORENEO VIRTUAL DE AJEDREZ",
    descripcion: "se realizo vía remota en la modalidad individual y por equipos.",
    imagen: agedrezIMG,
    link: "https://www.facebook.com/share/p/1CCJYerfwL/"
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
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.tarjeta} ${logro.alto ? styles.grande : ''}`}
          >
            <img src={logro.imagen} 
            alt={logro.descripcion} 
            title={logro.titulo}
            className={styles.imagenajustada} />
            
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