import React, { useState, useEffect } from 'react';
import './Carrusel.css';

import escudo from "../../../assets/Fotos/Escudo.jpeg";
import atomo from "../../../assets/Fotos/EscudoAtomo.png";
import edificio from "../../../assets/Fotos/EscudoEdificio.png";
import engranaje from "../../../assets/Fotos/EscudoEngranaje.png";
import maya from "../../../assets/Fotos/EscudoMaya.png";
import titulo from "../../../assets/Fotos/EscudoTitulo.png";
import area from "../../../assets/Fotos/EscudoArea.png";

interface Slide {
  titulo: string;
  descripcion: string;
  imagen: string;
}

const Carrusel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const slides: Slide[] = [
    {
      titulo: "Escudo",
      descripcion:
        "El Escudo del Instituto Tecnológico de Cancún está representado por una figura con un engrane, un átomo, un edificio, un brazo levantando un título, el mapa del estado de Quintana Roo y unos símbolos mayas.",
      imagen: escudo
    },
    {
      titulo: "El engrane",
      descripcion:
        "Representa el Sistema Tecnológico, dentro del cual están contenidos los elementos representativos de las diferentes actividades en las que el Instituto Tecnológico participa.",
      imagen: engranaje
    },
    {
      titulo: "El átomo",
      descripcion:
        "Representa la ciencia, de la cual surgen las necesidades del hombre de conocer y avanzar en las investigaciones hacia el futuro y el progreso.",
      imagen: atomo
    },
    {
      titulo: "El edificio",
      descripcion:
        "Representa la hotelería, actividad económica de mayor importancia en la región y el objetivo principal del resultado del Tecnológico de Cancún.",
      imagen: edificio
    },
    {
      titulo: "El brazo con el título",
      descripcion:
        "Significa el aspecto académico que como institución educativa el Tecnológico ofrece a la comunidad.",
      imagen: titulo
    },
    {
      titulo: "Área geográfica",
      descripcion:
        "Significa el estado de la nación donde se encuentra el Instituto.",
      imagen: area
    },
    {
      titulo: "Simbología maya",
      descripcion:
        "Representa en Números Mayas el año de fundación del Instituto Tecnológico de Cancún (1986). Fue elegido en un concurso interno en 1992.",
      imagen: maya
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img src={slide.imagen} alt={slide.titulo} className="carousel-image" />
            <div className="carousel-caption">
              <h3>{slide.titulo}</h3>
              <p>{slide.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrusel;