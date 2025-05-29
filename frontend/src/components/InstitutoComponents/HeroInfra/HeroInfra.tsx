import React from 'react';
import './HeroInfra.css'; // Asegúrate que la ruta al CSS sea correcta

// 1. Importamos el nuevo video en lugar de la imagen
import videoBannerEntrada from '../../../assets/Videos/Entrada del tecnologico de cancun.mp4';

const HeroInfa: React.FC = () => {
    return (
        <div className="banner" data-aos="fade-in">
            {/* 2. Reemplazamos la etiqueta <img> por la etiqueta <video> */}
            <video 
                autoPlay        // Reproducción automática
                muted           // Silenciado (necesario para autoplay en muchos navegadores)
                loop            // Reproducción en bucle
                playsInline     // Para reproducción inline en iOS
                className="banner-video" // Misma clase para heredar estilos CSS
            >
                <source src={videoBannerEntrada} type="video/mp4" />
                Tu navegador no soporta videos HTML5. {/* Mensaje para navegadores antiguos */}
            </video>
            <div className="banner-texto" data-aos="zoom-in" data-aos-delay="500">
                <h1>Infraestructura</h1>
            </div>
        </div>
    );
};

export default HeroInfa;