import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConcursoRobotica.module.css";
import { FaChevronUp, FaChevronDown, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaRobot, FaTrophy, FaTools, FaRegClock } from "react-icons/fa";

const ConcursoRobotica: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Información del concurso
  const concursoInfo = {
    titulo: "Concurso Nacional de Robótica 2025",
    lema: "Innovación Tecnológica en Movimiento",
    descripcion: "El evento anual que reúne a los mejores talentos en robótica del TecNM para competir en desafíos técnicos y demostrar su creatividad e ingenio en el diseño de soluciones automatizadas.",
    imagenPrincipal: "https://scontent-qro1-1.xx.fbcdn.net/v/t39.30808-6/499183546_1000336575600101_3494602190566601078_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEeb_i79QmdLmdkMhmkVQlaBZP3zmISfQUFk_fOYhJ9BTvdNEkuOmjCV-Gd7q8VD4EeUvu4Oh2CSnG_qISiiA1d&_nc_ohc=aCxAEMw5fyYQ7kNvwHylxlZ&_nc_oc=AdkMafMUvEQaDHyws0CGmEhu_sbrZGPkpLiiRUM_PAoa_lZ6E9rTVHmppPkbn5ODCk0&_nc_zt=23&_nc_ht=scontent-qro1-1.xx&_nc_gid=eyJe24RVuVl12aylRAnCiA&oh=00_AfIARCwmoDHLsJFOjPF05TFmT-m3wQDrKnKtIIwI2_R_gw&oe=683D7CB8",
    fecha: "2025-05-25",
    lugar: "Polideportivo TecNM Cancún",
    horario: "08:00 - 19:00 hrs",
    participantes: "25 equipos de 4 campus",
    estado: "proximo",
    categorias: [
      "Robótica Autónoma",
      "Sumo Robótico",
      "Robótica de Rescate",
      "Drones Autónomos"
    ],
    premios: [
      "Premio en efectivo de $10,000 MXN",
      "Kit de desarrollo robótico avanzado",
      "Becas para certificaciones internacionales",
      "Visitas a centros de investigación"
    ]
  };

  // Equipos participantes
  const equipos = [
    {
      id: "1",
      nombre: "CyberTitans",
      campus: "Cancún",
      imagen: "https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/484497204_951724097128016_9191369249615692488_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE66hs9zVEoFN9tbAUNJ-4IdhH7cKXbept2Eftwpdt6m9b0QA87GBaRRCKDuVbECDjtSsWxBUY4AYcMHIZJkWyd&_nc_ohc=YEsLyiiCCi8Q7kNvwE7D7mF&_nc_oc=AdkxO8blJh-o97hTRObaMX2QOy-vwNa6Hb2nXWjKpeKJcfubX3BPVBFZmkeh1W80jxA&_nc_zt=23&_nc_ht=scontent.fisj3-3.fna&_nc_gid=lPSnDZld3tyl_OGFv7xC7w&oh=00_AfLkKveaSNfLJ40KiYshKoBem43BjZy_tO7vURisRYYwpA&oe=683D5AE6",
      categoria: "Robótica Autónoma",
      descripcion: "Equipo especializado en visión computarizada y navegación autónoma.",
      miembros: ["Juan Pérez", "María García", "Carlos López"]
    },
    {
      id: "2",
      nombre: "MechWarriors",
      campus: "Mérida",
      imagen: "https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/484902842_951723870461372_1501597614738828971_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGL-plnqk9hABJ6vQpwAqbDWtj67BeI6Cha2PrsF4joKCYfQ0RN8Gc0bKX43NOBKhEwJ0TsriLe1Fzq4GCy446l&_nc_ohc=q4w_6xMlc7IQ7kNvwGpbS6f&_nc_oc=AdnRCXQzKBMMXiczVxBZVtUG1WM1F4Ao4-ezuhJ_VXaQj1cxFiFJ80iKQZnw19VYGBo&_nc_zt=23&_nc_ht=scontent.fisj3-3.fna&_nc_gid=zZ5ppMgvPsiepre8vZvJSw&oh=00_AfIz2-zmhR65s2R3FohDXPznePXm4gjtpSuOvt1fjq2Pqg&oe=683D7D77",
      categoria: "Sumo Robótico", 
      descripcion: "Expertos en sistemas mecánicos y estrategias de combate robótico.",
      miembros: ["Ana Rodríguez", "Luis Martínez"]
    },
    {
      id: "3",
      nombre: "RescueBots",
      campus: "Villahermosa",
      imagen: "https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/484576730_951723850461374_274908601736750202_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE89vKL9O2ZckfMy9qwGd1m_31EVZ93Mpz_fURVn3cynKMwuSg1yTwgjUjxEuNFD3jL7Ls1YKnb7CMtkCYU7gTj&_nc_ohc=Qo1pTbldI4sQ7kNvwEolsA0&_nc_oc=Adksw-TFdU5VmKxCSgZkWNOVlCsHQXq-iXh4XTj8H3_rm61eH6bR7LbnQrkiLcr1cYA&_nc_zt=23&_nc_ht=scontent.fisj3-3.fna&_nc_gid=ZeTD3TSBXOJaBiLP6XXDGg&oh=00_AfKoM9t2LcIE6N9LjtLMLrvQNNpOn760YdqOCypFY0giag&oe=683D6579",
      categoria: "Robótica de Rescate",
      descripcion: "Innovadores en sistemas de mapeo y navegación en entornos complejos.",
      miembros: ["Roberto Jiménez", "Sofía Ramírez", "Jorge Hernández"]
    },
    {
      id: "4",
      nombre: "SkyDrones",
      campus: "Chetumal",
      imagen: "https://scontent.fisj3-3.fna.fbcdn.net/v/t39.30808-6/484556902_951724180461341_8313565720217324988_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeHYHoOdwTeNkQKBlL8_xl2Weneo2XREczV6d6jZdERzNXisYemnBK0-XSSFo-OukGyv8k4awYG8wzZo_2B-bZaH&_nc_ohc=uq7ZW-WfMNoQ7kNvwHFXZE8&_nc_oc=AdnADY333J5k0-hXoqQWWqak7bOrOZ4gIRzvaW17Bfpav9SMmT6B0girA3NOdqiC6yQ&_nc_zt=23&_nc_ht=scontent.fisj3-3.fna&_nc_gid=NCVu-WaViC3k_7FV5REoiA&oh=00_AfIiPJ4oKJC2ZHL807SGjir_IurNVxN1mm1Yplds8iiQiA&oe=683D5ECF",
      categoria: "Drones Autónomos",
      descripcion: "Pioneros en algoritmos de vuelo autónomo y coordinación de enjambres.",
      miembros: ["Karen Díaz", "Miguel Flores"]
    }
  ];

  // Pruebas del concurso
  const pruebas = [
    {
      id: "1",
      nombre: "Laberinto Autónomo",
      descripcion: "Los robots deben navegar por un laberinto desconocido sin intervención humana en el menor tiempo posible.",
      imagen: "https://elgaragehub.com/blog/content/images/2019/11/k.jpg",
      horario: "09:00 - 11:00",
      categoria: "Robótica Autónoma",
      requisitos: ["Robot completamente autónomo", "Dimensiones máx. 30x30x30 cm", "Sin comunicación externa"]
    },
    {
      id: "2", 
      nombre: "Sumo Robótico",
      descripcion: "Competencia donde los robots deben sacar al oponente del dohyo utilizando estrategias de empuje.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo6appe_C-xXULWkx-WbdnsSIsDzKF8h0spA&s",
      horario: "11:30 - 13:30",
      categoria: "Sumo Robótico",
      requisitos: ["Peso máximo 3 kg", "Dimensiones máx. 20x20 cm", "Sensores permitidos"]
    },
    {
      id: "3",
      nombre: "Zona de Desastre",
      descripcion: "Simulación de rescate donde robots deben identificar y transportar objetos que representan víctimas.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kvD07YdrBLRrB2sWJ3N0SHw3eX_H83C7TQ&s",
      horario: "14:30 - 16:30",
      categoria: "Robótica de Rescate",
      requisitos: ["Autonomía limitada", "Capacidad de transporte", "Sensores múltiples"]
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
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-MX", options);
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
    if (carouselRef.current && currentSlide < equipos.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const getEstadoBadge = () => {
    switch(concursoInfo.estado) {
      case 'proximo':
        return <span className={styles.badgeProximo}>Próximo</span>;
      case 'en-curso':
        return <span className={styles.badgeEnCurso}>En curso</span>;
      case 'finalizado':
        return <span className={styles.badgeFinalizado}>Finalizado</span>;
      default:
        return null;
    }
  };

  return (
    <section className={styles.container} aria-labelledby="robotica-heading">
      <header className={styles.sectionHeader}>
        <h1 id="robotica-heading" className={styles.sectionTitle}>
          {concursoInfo.titulo}
        </h1>
        <p className={styles.sectionLema}>{concursoInfo.lema}</p>
        <div className={styles.robotIcon}>
          <FaRobot />
        </div>
      </header>

      {/* Información principal del concurso */}
      <article className={styles.mainEvent}>
        <div className={styles.imageContainer}>
          <img
            src={concursoInfo.imagenPrincipal}
            alt={`Cartel ${concursoInfo.titulo}`}
            className={styles.mainImage}
            onError={handleImageError}
          />
          <div className={styles.eventBadge}>
            {getEstadoBadge()}
          </div>
        </div>
        
        <div className={styles.eventInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <FaCalendarAlt className={styles.infoIcon} />
              <div>
                <h3>Fecha</h3>
                <p>{formatDate(concursoInfo.fecha)}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <div>
                <h3>Lugar</h3>
                <p>{concursoInfo.lugar}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaRegClock className={styles.infoIcon} />
              <div>
                <h3>Horario</h3>
                <p>{concursoInfo.horario}</p>
              </div>
            </div>
            <div className={styles.infoItem}>
              <FaUsers className={styles.infoIcon} />
              <div>
                <h3>Participantes</h3>
                <p>{concursoInfo.participantes}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.eventDescription}>
            <h2>Acerca del concurso</h2>
            <p>{concursoInfo.descripcion}</p>
            
            <div className={styles.categoriasSection}>
              <h3><FaTools className={styles.sectionIcon} /> Categorías</h3>
              <ul className={styles.categoriasList}>
                {concursoInfo.categorias.map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </div>
            
            <div className={styles.premiosSection}>
              <h3><FaTrophy className={styles.sectionIcon} /> Premios</h3>
              <ul className={styles.premiosList}>
                {concursoInfo.premios.map((premio, index) => (
                  <li key={index}>{premio}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* Equipos participantes */}
      <section className={styles.equiposSection}>
        <h2 className={styles.sectionTitle}>
          <FaRobot className={styles.sectionIcon} /> Equipos Participantes
        </h2>
        
        <div className={styles.equiposContent}>
          <aside className={styles.equiposSidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Lista de equipos</h3>
              <div className={styles.carouselControls}>
                <button
                  className={`${styles.controlButton} ${
                    currentSlide === 0 ? styles.disabled : ""
                  }`}
                  onClick={handleScrollUp}
                  disabled={currentSlide === 0}
                  aria-label="Equipo anterior"
                >
                  <FaChevronUp />
                </button>
                <button
                  className={`${styles.controlButton} ${
                    currentSlide >= equipos.length - 1
                      ? styles.disabled
                      : ""
                  }`}
                  onClick={handleScrollDown}
                  disabled={currentSlide >= equipos.length - 1}
                  aria-label="Siguiente equipo"
                >
                  <FaChevronDown />
                </button>
              </div>
            </div>

            <div className={styles.carouselContainer} ref={carouselRef}>
              {equipos.map((equipo) => (
                <article
                  key={equipo.id}
                  className={styles.sidebarArticle}
                  onClick={() => handleClick(`/robotica/equipo/${equipo.id}`)}
                  style={{ cursor: "pointer" }}
                  aria-label={`Equipo: ${equipo.nombre}`}
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleClick(`/robotica/equipo/${equipo.id}`)
                  }
                >
                  <div className={styles.sidebarContent}>
                    <div className={styles.sidebarImageContainer}>
                      <img
                        src={equipo.imagen}
                        alt=""
                        loading="lazy"
                        onError={handleImageError}
                        className={styles.sidebarImage}
                      />
                    </div>
                    <div className={styles.textContent}>
                      <h3 className={styles.equipoNombre}>
                        {equipo.nombre}
                      </h3>
                      <p className={styles.equipoCampus}>
                        {equipo.campus} • {equipo.categoria}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>

          {/* Detalle del equipo seleccionado */}
          <div className={styles.equipoDetail}>
            {equipos.length > 0 && (
              <>
                <h3>{equipos[currentSlide].nombre}</h3>
                <p className={styles.equipoMeta}>
                  <span>{equipos[currentSlide].campus}</span> • 
                  <span>{equipos[currentSlide].categoria}</span>
                </p>
                
                <div className={styles.equipoImagenContainer}>
                  <img
                    src={equipos[currentSlide].imagen}
                    alt={`Equipo ${equipos[currentSlide].nombre}`}
                    className={styles.equipoImagen}
                    onError={handleImageError}
                  />
                </div>
                
                <p className={styles.equipoDescripcion}>
                  {equipos[currentSlide].descripcion}
                </p>
                
                <h4>Miembros del equipo:</h4>
                <ul className={styles.miembrosList}>
                  {equipos[currentSlide].miembros.map((miembro, index) => (
                    <li key={index}>{miembro}</li>
                  ))}
                </ul>
                
                <button 
                  className={styles.verRobotButton}
                  onClick={() => handleClick(`/robotica/equipo/${equipos[currentSlide].id}/robot`)}
                >
                  <FaRobot /> Ver robot del equipo
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Pruebas del concurso */}
      <section className={styles.pruebasSection}>
        <h2 className={styles.sectionTitle}>
          <FaTrophy className={styles.sectionIcon} /> Pruebas y Competencias
        </h2>
        
        <div className={styles.pruebasGrid}>
          {pruebas.map((prueba) => (
            <article key={prueba.id} className={styles.pruebaCard}>
              <div className={styles.pruebaImagenContainer}>
                <img
                  src={prueba.imagen}
                  alt={prueba.nombre}
                  className={styles.pruebaImagen}
                  onError={handleImageError}
                />
                <span className={styles.pruebaCategoria}>{prueba.categoria}</span>
              </div>
              <div className={styles.pruebaContent}>
                <h3>{prueba.nombre}</h3>
                <p className={styles.pruebaHorario}>
                  <FaRegClock /> {prueba.horario}
                </p>
                <p className={styles.pruebaDescripcion}>
                  {prueba.descripcion}
                </p>
                
                <h4>Requisitos:</h4>
                <ul className={styles.requisitosList}>
                  {prueba.requisitos.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default ConcursoRobotica;