import React from 'react';
import './ContenidoInfra.css';
import escuela from '../../../assets/Fotos/Infraestructura/escuela.png';
import laboratorio from '../../../assets/Fotos/Infraestructura/laboratorio.jpg';
import biblioteca from '../../../assets/Fotos/Infraestructura/biblioteca.jpg';
import deportes from '../../../assets/Fotos/Infraestructura/biblioteca.jpg';
import aula from '../../../assets/Fotos/Infraestructura/aula.jpg';

const ContenidoInfra: React.FC = () => {
  return (
    <div className='contenido'>
        <div className="seccion fila" data-aos="fade-right">
      <div className="texto">
        <h2>Campus Moderno y Funcional</h2>
        <p>Diseñado para inspirar el aprendizaje, nuestro campus combina aulas climatizadas con tecnología interactiva, espacios verdes para fomentar la convivencia estudiantil y conectividad 100% WiFi en todas las áreas.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <img src={escuela} alt="Entrada principal TecNM Cancún - Biblioteca institucional"/>
      </div>
    </div>

    <div className="seccion fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Laboratorios Especializados</h2>
        <p>Equipados con tecnología avanzada, nuestros laboratorios incluyen software para diseño 3D, programación y simulación, además de máquinas CNC, robots industriales y kits de electrónica, con certificaciones de Cisco, Autodesk y Siemens.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <img src={laboratorio} alt="Estudiantes de ingeniería en laboratorio de computación TecNM"/>
      </div>
    </div>

    <div className="seccion fila" data-aos="fade-right">
      <div className="texto">
        <h2>Biblioteca Digital</h2>
        <p>Con más de 20,000 recursos académicos a tu alcance, nuestra biblioteca ofrece una colección física y digital, con acceso remoto a bases de datos como IEEE Xplore y Springer, además de salas de estudio colaborativo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <img src={biblioteca} alt="Biblioteca TecNM Cancún - Espacio de estudio moderno"/>
      </div>
    </div>

    <div className="seccion fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Instalaciones Deportivas</h2>
        <p>Contamos con canchas de baloncesto, voleibol y fútbol rápido, además de un gimnasio bien equipado para acondicionamiento físico y torneos interuniversitarios.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-down">
        <img src={deportes} alt="Estudiantes jugando baloncesto TecNM Cancún"/>
      </div>
    </div>

    <div className="seccion fila" data-aos="fade-right">
      <div className="texto">
        <h2>Aulas Inteligentes</h2>
        <p>Con proyectores 4K, pantallas táctiles, mobiliario ergonómico y plataformas híbridas, nuestras aulas están equipadas con la última tecnología educativa para facilitar un aprendizaje moderno y efectivo.</p>
      </div>
      <div className="imagen" data-aos="zoom-in-up">
        <img src={aula} alt="Aula equipada con tecnología educativa TecNM"/>
      </div>
    </div>

    <div className="seccion fila fila-reversa" data-aos="fade-left">
      <div className="texto">
        <h2>Ubicación del Campus</h2>
        <p>La infraestructura de la universidad está en constante renovación para estar a la altura de la excelencia académica de nuestras aulas y las necesidades de aprendizaje de nuestros alumnos.</p>
      </div>
      <div className="imagen" data-aos="fade-up">
        <iframe width="100%" height="400" src="https://www.bing.com/maps/embed?h=400&w=500&cp=21.139326~-86.834921&lvl=17.931595&typ=d&sty=r&src=SHELL&FORM=MBEDV8" scrolling="no"></iframe>
      </div>
    </div>
    </div>
  );
};

export default ContenidoInfra;