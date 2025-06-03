import './ContenidoInfra.css';

import escuela1 from '../../../assets/Fotos/Infraestructura/escuela.png';
import escuela2 from '../../../assets/Fotos/Infraestructura/escuela2.jpeg';
import escuela3 from '../../../assets/Fotos/Infraestructura/escuela1.jpeg';

import laboratorio1 from '../../../assets/Fotos/Infraestructura/laboratorio.jpg';
import laboratorio2 from '../../../assets/Fotos/Infraestructura/laboratorio2.jpg';
import laboratorio3 from '../../../assets/Fotos/Infraestructura/laboratorio3.jpg';

import biblioteca1 from '../../../assets/Fotos/Infraestructura/biblioteca.jpg';
import biblioteca2 from '../../../assets/Fotos/Infraestructura/biblioteca2.jpg';
import biblioteca3 from '../../../assets/Fotos/Infraestructura/biblioteca3.jpg';

import deportes1 from '../../../assets/Fotos/Infraestructura/deportes1.jpeg';
import deportes2 from '../../../assets/Fotos/Infraestructura/deportes2.jpeg';
import deportes3 from '../../../assets/Fotos/Infraestructura/deportes3.jpg';

import aula1 from '../../../assets/Fotos/Infraestructura/aula.jpg';
import aula2 from '../../../assets/Fotos/Infraestructura/aula2.jpg';
import aula3 from '../../../assets/Fotos/Infraestructura/aula3.jpg';

import ImageCarousel from '../ImageCarousel/ImageCarousel';

const ContenidoInfra = () => (
  <div className="contenido">

    {/* Campus Moderno y Funcional */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Campus Moderno y Funcional</h2>
        <p>El Instituto Tecnológico de Cancún cuenta con un campus diseñado para brindar un entorno propicio para el aprendizaje y el desarrollo integral de sus estudiantes. 
          Ubicado en la Av. Kabah, Km. 3, en Cancún, Quintana Roo,
           el campus ofrece instalaciones que combinan funcionalidad y comodidad, facilitando las actividades académicas y extracurriculares.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel
          images={[
            { src: escuela1, alt: 'Campus – vista 1' },
            { src: escuela2, alt: 'Campus – vista 2' },
            { src: escuela3, alt: 'Campus – vista 3' },
          ]}
          interval={7000}
        />
      </div>
    </div>

    {/* Laboratorios Especializados */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Laboratorios y Talleres Especializados</h2>
        <p>Para fortalecer la formación práctica de los estudiantes, el instituto dispone de diversos laboratorios y talleres equipados con tecnología adecuada para las distintas áreas de estudio. 
          Estos espacios permiten la aplicación de conocimientos teóricos en entornos controlados, promoviendo la adquisición de habilidades técnicas esenciales para el desempeño profesional.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel
          images={[
            { src: laboratorio1, alt: 'Laboratorio – vista 1' },
            { src: laboratorio2, alt: 'Laboratorio – vista 2' },
            { src: laboratorio3, alt: 'Laboratorio – vista 3' },
          ]}
          interval={7000}
        />
      </div>
    </div>

    {/* Biblioteca Digital */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Biblioteca y Centro de Información</h2>
        <p>El Centro de Información del Instituto Tecnológico de Cancún proporciona servicios bibliotecarios y de información eficientes, 
          apoyados por tecnologías modernas, para satisfacer las necesidades de investigación y actualización del conocimiento de la comunidad académica.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel
          images={[
            { src: biblioteca1, alt: 'Biblioteca – vista 1' },
            { src: biblioteca2, alt: 'Biblioteca – vista 2' },
            { src: biblioteca3, alt: 'Biblioteca – vista 3' },
          ]}
          interval={7000}
        />
      </div>
    </div>

    {/* Instalaciones Deportivas */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Instalaciones Deportivas</h2>
        <p>CEl instituto promueve el desarrollo físico y el espíritu deportivo mediante instalaciones adecuadas para la práctica de diversas disciplinas. 
          Estas instalaciones están disponibles para toda la comunidad estudiantil, fomentando un estilo de vida saludable y el trabajo en equipo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <ImageCarousel
          images={[
            { src: deportes1, alt: 'Deportes – vista 1' },
            { src: deportes2, alt: 'Deportes – vista 2' },
            { src: deportes3, alt: 'Deportes – vista 3' },
          ]}
          interval={7000}
        />
      </div>
    </div>

    {/* Aulas Inteligentes */}
    <div className="seccioninfra fila" data-aos="fade-right">
      <div className="texto">
        <h2>Modernización de Aulas y Equipamiento</h2>
        <p>En su compromiso con la excelencia académica, el Instituto Tecnológico de Cancún ha implementado proyectos de modernización que incluyen la renovación de mobiliario y equipamiento en aulas y laboratorios. 
          Estas mejoras buscan proporcionar a estudiantes y docentes las herramientas necesarias para un aprendizaje efectivo y actualizado.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <ImageCarousel
          images={[
            { src: aula1, alt: 'Aula – vista 1' },
            { src: aula2, alt: 'Aula – vista 2' },
            { src: aula3, alt: 'Aula – vista 3' },
          ]}
          interval={7000}
        />
      </div>
    </div>

    {/* Ubicación del Campus */}
    <div className="seccioninfra fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Ubicación del Campus</h2>
        <p>La infraestructura de la universidad está en constante renovación para estar a la altura de la excelencia académica de nuestras aulas y las necesidades de aprendizaje de nuestros alumnos.</p>
      </div>
      <div className="imagen" data-aos="fade-up">
        <iframe
          width="100%"
          height="400"
          frameBorder="0"
          src="https://www.bing.com/maps/embed?h=400&w=500&cp=21.139326~-86.834921&lvl=17.931595"
          scrolling="no"
          title="Mapa del campus"
        />
      </div>
    </div>

  </div>
);

export default ContenidoInfra;