import React, { useEffect } from 'react';
import Hero from '../components/EstudiantesComponents/ActividadesExtraescolares/HeroActExtraes/HeroActExt';
import ContenidoAct from '../components/EstudiantesComponents/ActividadesExtraescolares/ContenidoActividadesExtra/ContenidoActExtra';

const ActExtra: React.FC = () => {
 useEffect(() => {
  window.scrollTo(0, 0);
  // Cambiar el título
  document.title = "Formación Integral | Actividades Extraescolares TecNM Cancún";

  // Modificar o crear meta description
  const description = document.querySelector("meta[name='description']");
  if (description) {
    description.setAttribute("content", "Participa en actividades deportivas, culturales y sociales que fortalecen tu desarrollo integral en el #TecNMCampusCancún. ¡Inscríbete ahora!");
  } else {
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = "Participa en actividades deportivas, culturales y sociales que fortalecen tu desarrollo integral en el #TecNMCampusCancún. ¡Inscríbete ahora!";
    document.head.appendChild(meta);
  }

  // Crear o modificar meta keywords
  const keywords = document.querySelector("meta[name='keywords']");
  if (keywords) {
    keywords.setAttribute("content", "actividades extraescolares, deportes, cultura, formación integral, TecNM Cancún");
  } else {
    const meta = document.createElement("meta");
    meta.name = "keywords";
    meta.content = "actividades extraescolares, deportes, cultura, formación integral, TecNM Cancún";
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
      <Hero />
      <ContenidoAct />
    </div>
  );
};

export default ActExtra;
