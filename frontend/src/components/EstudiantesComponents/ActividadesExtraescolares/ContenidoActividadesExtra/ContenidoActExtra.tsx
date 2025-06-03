import './ContenidoActExtra.css';

// Nuevas actividades
import Atletismo1 from '../../../../assets/Fotos/ActividadesExtra/Atletismo 1.jpg';
import Atletismo2 from '../../../../assets/Fotos/ActividadesExtra/Atletismo 2.jpg';

import Ajedrez1 from '../../../../assets/Fotos/ActividadesExtra/Ajedrez 1.jpg';
import Ajedrez2 from '../../../../assets/Fotos/ActividadesExtra/Ajedrez 2.jpg';

import Futbol1 from '../../../../assets/Fotos/ActividadesExtra/Futbol 1.jpg';
import Futbol2 from '../../../../assets/Fotos/ActividadesExtra/Futbol 2.jpg';

import Beisbol1 from '../../../../assets/Fotos/ActividadesExtra/Beisbol 1.jpg';
import Beisbol2 from '../../../../assets/Fotos/ActividadesExtra/Beisbol 2.jpg';

import Karate1 from '../../../../assets/Fotos/ActividadesExtra/Karate 1.png';
import Karate2 from '../../../../assets/Fotos/ActividadesExtra/Karate 2.png';

import DanzaFolclorica1 from '../../../../assets/Fotos/ActividadesExtra/Danza folclorica 2.jpg';
import DanzaFolclorica2 from '../../../../assets/Fotos/ActividadesExtra/Danza folclorica 3.jpg';

import DanzaModerna1 from '../../../../assets/Fotos/ActividadesExtra/Danza folclorica 2.jpg';
import DanzaModerna2 from '../../../../assets/Fotos/ActividadesExtra/Danza folclorica 2.jpg';

import Musica1 from '../../../../assets/Fotos/ActividadesExtra/Musica 2.jpg';
import Musica2 from '../../../../assets/Fotos/ActividadesExtra/Musica 3.jpeg';

import Banda1 from '../../../../assets/Fotos/ActividadesExtra/Banda de guerra 1.jpg';
import Banda2 from '../../../../assets/Fotos/ActividadesExtra/Banda de guerra 2.jpg';


import ImageCarousel from '../ImageCarouseACTEXTRA/ImageCarousel';

const ContenidoActExtra = () => (
  <div className="contenido">

    {/* Equipo de Atletismo */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Equipo de Atletismo</h2>
        <p>Disciplina y esfuerzo dentro y fuera de la pista. Entrenamientos físicos: resistencia, velocidad y fuerza en sesiones guiadas por entrenadores especializados. Valores formativos: compromiso, superación personal y trabajo en equipo. Representación institucional: participación en competencias locales, regionales y nacionales.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel images={[{ src: Atletismo1, alt: 'Entrenamiento de atletismo en pista' }, { src: Atletismo2, alt: 'Estudiantes del TecNM Campus Cancún entrenando en el equipo de atletismo' }]} interval={7000} />
      </div>
    </div>

    {/* Equipo de Ajedrez */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Equipo de Ajedrez</h2>
        <p>En nuestro campus, el ajedrez es una actividad clave para quienes buscan desarrollar la mente, mejorar la concentración y tomar decisiones con estrategia. Si te apasiona el tablero, disfrutas pensar con calma y actuar con precisión, este es tu lugar. Únete al equipo de ajedrez y forma parte de una comunidad que valora el intelecto, el respeto y la competencia sana.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel images={[{ src: Ajedrez1, alt: 'Alumnos del TecNM Cancún en partida de ajedrez' }, { src: Ajedrez2, alt: 'Estudiante en partida' }]} interval={7000} />
      </div>
    </div>

    {/* Equipo de Básquetbol */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Equipo de Básquetbol</h2>
        <p>El básquetbol es un deporte que exige esfuerzo, trabajo en equipo y mucha pasión por superar cada desafío en la cancha. Si te gusta competir, moverte en conjunto y dar siempre tu mejor esfuerzo, este es tu lugar. En nuestro campus, el equipo de básquetbol te invita a ser parte de una comunidad que se apoya, se esfuerza y representa con orgullo sus colores.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel images={[{ src: Futbol1, alt: 'Equipo de básquetbol del TecNM Cancún en entrenamiento' }, { src: Futbol2, alt: 'Jugadores en acción' }]} interval={7000} />
      </div>
    </div>

    {/* Equipo de Fútbol */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Equipo de Fútbol</h2>
        <p>Si tu pasión es el fútbol, el TecNM Campus Cancún te invita a formar parte de su equipo representativo. Únete a una comunidad que valora el trabajo en equipo, la disciplina y el espíritu deportivo. ¡Demuestra tu talento, compite con orgullo y sé parte de nuestra familia futbolística!</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel images={[{ src: Futbol1, alt: 'Partido representativo de fútbol TecNM Cancún' }, { src: Futbol2, alt: 'Equipo en cancha' }]} interval={7000} />
      </div>
    </div>

    {/* Béisbol */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Equipo de Béisbol</h2>
        <p>Pasión por el diamante y trabajo en equipo. Vive la emoción de cada lanzamiento, la adrenalina al correr las bases y la fuerza en cada bateo. Únete a una familia que valora la disciplina y el compañerismo en cada partido.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel images={[{ src: Beisbol1, alt: 'Jugadores en juego' }, { src: Beisbol2, alt: 'Alumnos del TecNM Cancún durante partido de béisbol' }]} interval={7000} />
      </div>
    </div>

    {/* Karate */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Equipo de Karate</h2>
        <p>El karate es un camino que une cuerpo, mente y espíritu. Aprende a superar retos con perseverancia, respeto y autocontrol mientras fortaleces tu bienestar físico y mental.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel images={[{ src: Karate1, alt: 'Entrenamiento de karate' }, { src: Karate2, alt: 'Alumnos del TecNM Cancún practicando karate' }]} interval={7000} />
      </div>
    </div>

    {/* Danza Folclórica */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Danza Folclórica</h2>
        <p>Yaaxché te invita a revivir nuestras raíces con ritmo, color y tradición. Expresa la riqueza cultural que nos define y forma parte de un grupo apasionado por la identidad mexicana.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel images={[{ src: DanzaFolclorica1, alt: 'Presentación de danza' }, { src: DanzaFolclorica2, alt: 'Grupo Yaaxché en presentación de danza folclórica' }]} interval={7000} />
      </div>
    </div>

    {/* Danza Moderna */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Danza Moderna</h2>
        <p>Fusiona creatividad, técnica y emoción. Desafía tus límites, explora nuevas formas de expresión corporal y conecta con otros a través del ritmo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel images={[{ src: DanzaModerna1, alt: 'Ensayo de danza' }, { src: DanzaModerna2, alt: 'Estudiantes del TecNM Cancún en clase de danza moderna' }]} interval={7000} />
      </div>
    </div>

    {/* Club de Música */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Club de Música</h2>
        <p>Explora nuevos estilos, mejora tu técnica y exprésate a través del sonido. Comparte tu talento musical en un entorno colaborativo y creativo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel images={[{ src: Musica1, alt: 'Estudiante con guitarra' }, { src: Musica2, alt: 'Alumno tocando guitarra en el Club de Música TecNM' }]} interval={7000} />
      </div>
    </div>

    {/* Escolta y Banda de Guerra */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Escolta y Banda de Guerra</h2>
        <p>Honor, compromiso y tradición. Participa en ceremonias oficiales, desfiles y competencias representando a tu institución con orgullo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel images={[{ src: Banda1, alt: 'Banda en formación' }, { src: Banda2, alt: 'Escolta y Banda de Guerra TecNM Cancún en ceremonia cívica' }]} interval={7000} />
      </div>
    </div>


  </div>
);

export default ContenidoActExtra;
