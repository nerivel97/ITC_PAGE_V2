import styles from '../components/HomeComponents/Home.module.css';
import Carousel from '../components/HomeComponents/ComponentCarrusel/Carousel';
import Somos from '../components/HomeComponents/SomosComponent/Somos';
import FlayerOfertas from '../components/HomeComponents/flayercomponent/FlayerOferta';
import Eventos from '../components/HomeComponents/ComponentEvento/Eventos.tsx';
import Noticias from '../components/HomeComponents/ComponentNoticias/Noticias.tsx';
import InvestigacionYDesarrollo from '../components/HomeComponents/Investigacion&Desarrollo/InvestigacionYDesarrollo.tsx';

import img from '../components/HomeComponents/ComponentEvento/img_evento/img_prueba.png';

// Importar imágenes del carrusel
import carouselImage1 from '../assets/sliderImage/1.jpeg';
import carouselImage2 from '../assets/sliderImage/2.jpeg';
import carouselImage3 from '../assets/sliderImage/3.jpg';


const Home = () => {
  const carouselImages = [
    { id: 1, image: carouselImage1, alt: 'Slide 1' },
    { id: 2, image: carouselImage2, alt: 'Slide 2' },
    { id: 3, image: carouselImage3, alt: 'Slide 3' },
  ];
  const quienesData = {
    titulo: 'Quiénes Somos',
    descripcion:
      'El tucán fue adoptado como mascota de este Instituto desde el año de 1990 y fue seleccionado por ser parte importante dentro de la fauna del Estado de Q. Roo. Los tucanes son aves de pelo y pico de colores muy llamativos por su brillantez y colorido. Llegan a medir hasta 60 cm. Su pico es largo, macizo con dientecillos como sierra, llega a medir la tercera parte de su tamaño y es muy ligero por las numerosas cámaras que tiene por lo que no le dificulta el vuelo. Su lengua es muy larga (llega a medir hasta 14 cm), angosta, aplanada y termina en punta. Tiene alas pequeñas, cortas y redondeadas. La cola es cuadrada en unas especies y llama la atención la facilidad con que la mueve hacia arriba y abajo. Los ojos están rodeados por una piel que a veces es de colores vivos.',
    botonTexto: 'Saber mas...',
    imagenUrl: 'https://pbs.twimg.com/media/GYGFMBQXsAAEPRd.jpg',
  };
  const vidaEstudiantil = {
    titulo: 'Vida estudiantil',
    descripcion:
      'En nuestra institucion creemos que la educacion va mas alla de las aulas. Por eso, ofrecemos un entorno lleno de oportunidades para que desarrolles tus pasiones, conectes con compañeros y vivas experiencia inolvidables.',
    botonTexto: 'Saber mas...',
    imagenUrl: 'https://pbs.twimg.com/media/GYGFMBQXsAAEPRd.jpg',
  }

  const noticiast = {
    titulo: 'Noticias',
  }

  const eventost = {
    titulo: 'Eventos',
  }


  const NOTICIAS_DATA = {
    tituloSeccion: "Informativo",
    subtitulo: "Participa en el Innovatec",
    descripcion: "An FDA-approved gene therapy...",
    imagen: img,
    rutaPrincipal: "/",
    sidebarArticulos: [
      {
        titulo: "Deportes",
        descripcion: "Athletes win record-breaking...",
        imagen: img,
        ruta: "/",
      },
      {
        titulo: "Deportes",
        descripcion: "Athletes win record-breaking...",
        imagen: img,
        ruta: "/",
      },
      {
        titulo: "Deportes",
        descripcion: "Athletes win record-breaking...",
        imagen: img,
        ruta: "/",
      },
      {
        titulo: "Deportes",
        descripcion: "Athletes win record-breaking...",
        imagen: img,
        ruta: "/",
      },
      // ... otros artículos
    ],
  };
  const cardsDesarrollo = [
  {
    image: 'https://cdn.masmovil.es/embed/f942e33f77a798f172fd7fbf1244c4a1600708225/hablar-en-publico.jpg?imagick=1&size=1000',
    title: 'Calentamiento global',
       link: 'https://road.cc/content/review/quintana-roo-srfive-2021-281773',
  },
  {
    image: 'https://www.techtitute.com/techtitute/cursos/016284639/recursos/banner/experto-universitario-termodinamica.jpg',
    title: 'Termodinámica',
       link: 'https://road.cc/content/review/quintana-roo-srfive-2021-281773',
  },
  {
    image: 'https://www.sepi.esimetic.ipn.mx/assets/files/sepiesimetic/img/servicios/1laerodinamica.jpg',
    title: 'Aerodinámica',
    link: 'https://road.cc/content/review/quintana-roo-srfive-2021-281773',
  }
];


  return (
    <div className={styles.homeContainer}>
      <Carousel images={carouselImages} />


      <Somos
        titulo={quienesData.titulo}
        descripcion={quienesData.descripcion}
        botonTexto={quienesData.botonTexto}
        imagenUrl={quienesData.imagenUrl}
      />
      <FlayerOfertas />

       <InvestigacionYDesarrollo
      description="Descubre cómo nuestros programas de investigación fomentan el progreso y la competitividad."
      cards={cardsDesarrollo}
      
    />



      <Somos
        titulo={vidaEstudiantil.titulo}
        descripcion={vidaEstudiantil.descripcion}
        botonTexto={vidaEstudiantil.botonTexto}
        imagenUrl={vidaEstudiantil.imagenUrl}
      />

      <Somos
        titulo={noticiast.titulo}
      />

      <Noticias {...NOTICIAS_DATA} />

      <Somos
        titulo={eventost.titulo}
      />
      <Eventos />
    </div>


  );

  // Ajusta la ruta según dónde lo pongas


};

export default Home;