import styles from '../components/HomeComponents/Home.module.css';
import Carousel from '../components/HomeComponents/ComponentCarrusel/Carousel';
import Cards from '../components/HomeComponents/ComponentCard/Cards';
import Somos from '../components/HomeComponents/SomosComponent/Somos';
import FlayerOfertas from '../components/HomeComponents/flayercomponent/FlayerOferta';
import Eventos from '../components/HomeComponents/ComponentEvento/Eventos.tsx';
import Noticias from '../components/HomeComponents/ComponentNoticias/Noticias.tsx';
import InvestigacionYDesarrollo from '../components/HomeComponents/Investigacion&Desarrollo/InvestigacionYDesarrollo.tsx';
import HistoriasQueInspiran from '../components/ComponenteHitoriasQueInspiran/HistoriasQueInspiran.tsx';
import img from '../components/HomeComponents/ComponentEvento/img_evento/img_prueba.png';

// Importar imágenes del carrusel
import carouselImage1 from '../assets/sliderImage/1.jpeg';
import carouselImage2 from '../assets/sliderImage/2.jpeg';
import carouselImage3 from '../assets/sliderImage/3.jpg';

// Importar iconos SVG (asegúrate de tener estos archivos en tu proyecto)
import carreraIcon from '../components/HomeComponents/ComponentCard/iconosCards/carrera.svg';
import posgradoIcon from '../components/HomeComponents/ComponentCard/iconosCards/posgrado.svg';
import actividadIcon from '../components/HomeComponents/ComponentCard/iconosCards/actividad.svg';
import estudianteIcon from '../components/HomeComponents/ComponentCard/iconosCards/estudiante.svg';
import egresadoIcon from '../components/HomeComponents/ComponentCard/iconosCards/egresados.svg';


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
    imagenUrl: 'https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/482988051_952590563708036_6923907347411025079_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=19toeF11_vQQ7kNvwFdHeHB&_nc_oc=AdmhoTM66tqdp32igjHD-cs_UPW2lnzwPReUzj0N76MSiI83J4IbAT9r7NaZ8fiDklE&_nc_zt=23&_nc_ht=scontent.fcjs3-1.fna&_nc_gid=RniduXLwkIZX50WFs7GIlQ&oh=00_AfKrwKq72USbY7RcVZF8j7yORMJu-AuHlHNjThQmB0i9bw&oe=682AF212',
  };
  const vidaEstudiantil = {
    titulo: 'Vida estudiantil',
    descripcion:
      'En nuestra institucion creemos que la educacion va mas alla de las aulas. Por eso, ofrecemos un entorno lleno de oportunidades para que desarrolles tus pasiones, conectes con compañeros y vivas experiencia inolvidables.',
    botonTexto: 'Saber mas...',
    imagenUrl: 'https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/496846554_991760889791003_7954670904494441363_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=o9KRw156R6kQ7kNvwHuK4ft&_nc_oc=Admf9_lrqGbZBTvhV2tBzkz-BK1Si3Za-31xP8Hi446Z_bKhcx8Jlzq74zJqaobtFHo&_nc_zt=23&_nc_ht=scontent.fcjs3-1.fna&_nc_gid=Ogje_Bj6TC3gTnz8wepAEg&oh=00_AfJtI7AdC6I2v1U6A8nVNADXKt452mx5uMxQGkYUBiL1ag&oe=682AEDE0',
    orientacion: 'derecha',
  }

  const noticiast = {
    titulo: 'Noticias',
  }

  const eventost = {
    titulo: 'Eventos',
  }

  const cards = [
    {
      id: 'carrera',
      title: 'Carreras',
      iconSrc: carreraIcon,  // Cambiado de emoji a SVG
      number: '+12',         // Actualizado según tu imagen
      description: 'Oferta académica de pregrado'
    },
    {
      id: 'posgrado',
      title: 'Posgrados',
      iconSrc: posgradoIcon,
      number: '+2',
      description: 'Maestrías y especializaciones'
    },
    {
      id: 'actividad',
      title: 'Actividades',
      iconSrc: actividadIcon,
      number: '+16',
      description: 'Eventos y actividades culturales'
    },
    {
      id: 'estudiante',
      title: 'Estudiantes',
      iconSrc: estudianteIcon,
      number: '+4000',
      description: 'Recursos para estudiantes'
    },
    {
      id: 'egresado',
      title: 'Egresados',
      iconSrc: egresadoIcon,
      number: '+900000',
      description: 'Red de egresados'
    },
  ];

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
      <Cards cards={cards} />

      <Somos
        titulo={quienesData.titulo}
        descripcion={quienesData.descripcion}
        botonTexto={quienesData.botonTexto}
        imagenUrl={quienesData.imagenUrl}
      />
      <FlayerOfertas />

      <InvestigacionYDesarrollo
      description="Descubre cómo nuestros programas de investigación fomentan el progreso y la competitividad."
      cards={cardsDesarrollo} />

      <Somos
        titulo={vidaEstudiantil.titulo}
        descripcion={vidaEstudiantil.descripcion}
        botonTexto={vidaEstudiantil.botonTexto}
        imagenUrl={vidaEstudiantil.imagenUrl}
        orientacion={vidaEstudiantil.orientacion as 'izquierda' | 'derecha'}
      />

      <Somos
        titulo={noticiast.titulo}
      />

      <Noticias {...NOTICIAS_DATA} />

      <Somos
        titulo={eventost.titulo}
      />
      <Eventos />
      <HistoriasQueInspiran/>
    </div>


  );

  // Ajusta la ruta según dónde lo pongas


};

export default Home;