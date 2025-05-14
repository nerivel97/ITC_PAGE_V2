import React, { useEffect } from 'react';
import Hero from '../components/InstitutoComponents/Hero/Hero'
import Filosofia from '../components/InstitutoComponents/Filosofia/Filosofia';
import Vision from '../components/InstitutoComponents/Vision/Vision';
import Valores from '../components/InstitutoComponents/Valores/Valores';
import PoliticaCalidad from '../components/InstitutoComponents/PoliticaCalidad/PoliticaCalidad';
import PoliticaEquidad from '../components/InstitutoComponents/PoliticaEquidad/PoliticaEquidad';
import Objetivo from '../components/InstitutoComponents/Objetivo/Objetivo';
import Carrusel from '../components/InstitutoComponents/Carrusel/Carrusel';
import Mascota from '../components/InstitutoComponents/Mascota/Mascota';
import Infraestructura from '../components/InstitutoComponents/Infraestructura/Infraestructura';
import BarraAccesos from '../components/InstitutoComponents/BarraAccesos/BarraAccesos';
const Instituto: React.FC = () => {
      useEffect(() => {
        // Cambiar el título
        document.title = "TecNM Cancún | Historia, Misión y Visión de Nuestra Institución";
    
        // Modificar o crear meta description
        const description = document.querySelector("meta[name='description']");
        if (description) {
          description.setAttribute("content", "Conoce al TecNM Campus Cancún: historia, misión y valores que respaldan más de 25 años de liderazgo en educación tecnológica en Quintana Roo.");
        } else {
          const meta = document.createElement("meta");
          meta.name = "description";
          meta.content = "Conoce al TecNM Campus Cancún: historia, misión y valores que respaldan más de 25 años de liderazgo en educación tecnológica en Quintana Roo.";
          document.head.appendChild(meta);
        }
    
    
        // Crear o modificar meta author
        const author = document.querySelector("meta[name='author']");
        if (author) {
          author.setAttribute("content", "TecNM Cancún");
        } else {
          const meta = document.createElement("meta");
          meta.name = "author";
          meta.content = "TecNM Cancún";
          document.head.appendChild(meta);
        }
      }, []);
    return (
        <div className="instituto">
            <Hero/> 
            <Vision/>
            <Valores/>
            <Filosofia/>
            <PoliticaCalidad/>
            <PoliticaEquidad/>
            <Objetivo/>
            <Carrusel/>
            <Mascota/>
            <Infraestructura/>
            <BarraAccesos/>
        </div>
    );
};
export default Instituto;