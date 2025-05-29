import React, { useEffect } from 'react';
import HeroInfa from '../components/InstitutoComponents/HeroInfra/HeroInfra';
import ContenidoInfra from '../components/InstitutoComponents/ContenidoInfra/ContenidoInfra';
import Tecnm from '../components/InstitutoComponents/Tecnm/Tecnm';

const Infra: React.FC = () => {
  useEffect(() => {

    window.scrollTo(0, 0);
    // Cambiar el título
    document.title = "Infraestructura Educativa | Campus y Laboratorios TecNM Cancún";

    // Modificar o crear meta description
    const description = document.querySelector("meta[name='description']");
    if (description) {
      description.setAttribute("content", "Conoce nuestro campus moderno en Cancún: laboratorios especializados, biblioteca digital, instalaciones deportivas y aulas equipadas para una formación profesional de excelencia.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Conoce nuestro campus moderno en Cancún: laboratorios especializados, biblioteca digital, instalaciones deportivas y aulas equipadas para una formación profesional de excelencia.";
      document.head.appendChild(meta);
    }

    // Crear o modificar meta keywords
    const keywords = document.querySelector("meta[name='keywords']");
    if (keywords) {
      keywords.setAttribute("content", "infraestructura, campus, laboratorios, biblioteca digital, instalaciones deportivas, TecNM Cancún");
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content = "infraestructura, campus, laboratorios, biblioteca digital, instalaciones deportivas, TecNM Cancún";
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
    <div>
      <HeroInfa />
      <ContenidoInfra />
      <Tecnm />
    </div>
  );
};

export default Infra;
