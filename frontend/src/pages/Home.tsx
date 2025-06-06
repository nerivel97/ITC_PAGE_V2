import styles from '../components/HomeComponents/Home.module.css';
import Carousel from '../components/HomeComponents/ComponentCarrusel/Carousel';
import Somos from '../components/HomeComponents/SomosComponent/Somos';
import FlayerOfertas from '../components/HomeComponents/flayercomponent/FlayerOferta';
import Eventos from '../components/HomeComponents/ComponentEvento/Eventos.tsx';
import Noticias from '../components/HomeComponents/ComponentNoticias/Noticias.tsx';
import InvestigacionYDesarrollo from '../components/HomeComponents/Investigacion&Desarrollo/InvestigacionYDesarrollo.tsx';
import HistoriasQueInspiran from '../components/ComponenteHitoriasQueInspiran/HistoriasQueInspiran.tsx';
import { useNavigate } from 'react-router-dom';

// Importar imágenes del carrusel
import carouselImage1 from '../assets/sliderImage/1.jpeg';
import carouselImage2 from '../assets/sliderImage/2.jpeg';
import carouselImage3 from '../assets/sliderImage/3.jpg';
import tucanImage from '../components/HomeComponents/ImagenesHome/Tucan-Sociedad-de-Alumnos-ITC.jpg';
import vidaImage from '../components/HomeComponents/ImagenesHome/InovaTEC.jpg';


const Home = () => {
  const carouselImages = [
    { id: 1, image: carouselImage1, alt: 'Slide 1' },
    { id: 2, image: carouselImage2, alt: 'Slide 2' },
    { id: 3, image: carouselImage3, alt: 'Slide 3' },
  ];

  

  const navigate = useNavigate();

  const handleQuienesSomosClick = () => {
    navigate('/instituto');
  };

  const handleVidaEstudiantilClick = () => {
    navigate('/extraescolares');
  };


  const quienesData = {
    titulo: 'Quiénes Somos',
    descripcion:
      'El tucán fue adoptado como mascota de este Instituto desde el año de 1990 y fue seleccionado por ser parte importante dentro de la fauna del Estado de Q. Roo. Los tucanes son aves de pelo y pico de colores muy llamativos por su brillantez y colorido...',
    botonTexto: 'Saber mas...',
    imagenUrl: tucanImage,
  };

  const vidaEstudiantil = {
    titulo: 'Vida estudiantil',
    descripcion:
      'En nuestra institucion creemos que la educacion va mas alla de las aulas. Por eso, ofrecemos un entorno lleno de oportunidades para que desarrolles tus pasiones, conectes con compañeros y vivas experiencia inolvidables.',
    botonTexto: 'Saber mas...',
    imagenUrl: vidaImage,
  };

  const noticiast = {
    titulo: 'Noticias',
  };

  const eventost = {
    titulo: 'Eventos',
  };

  const cardsDesarrollo = [
    {
      image: 'https://cdn.masmovil.es/embed/f942e33f77a798f172fd7fbf1244c4a1600708225/hablar-en-publico.jpg?imagick=1&size=1000',
      title: 'Calentamiento global',
    },
    {
      image: 'https://www.techtitute.com/techtitute/cursos/016284639/recursos/banner/experto-universitario-termodinamica.jpg',
      title: 'Termodinámica',
    },
    {
      image: 'https://www.sepi.esimetic.ipn.mx/assets/files/sepiesimetic/img/servicios/1laerodinamica.jpg',
      title: 'Aerodinámica',
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
        onButtonClick={handleQuienesSomosClick} // Pasamos la función de navegación
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
        onButtonClick={handleVidaEstudiantilClick} // Pasamos la función de navegación
      />

      <Somos
        titulo={noticiast.titulo}
      />

      <Noticias />

      <Somos
        titulo={eventost.titulo}
      />
      
      <Eventos />
      <HistoriasQueInspiran/>
    </div>
  );
};

export default Home;