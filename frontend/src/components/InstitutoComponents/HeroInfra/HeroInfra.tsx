import React from 'react';
import './HeroInfra.css';
import video from '../../../assets/Videos/escuela2.mp4';

const HeroInfa: React.FC = () => {
    return (
        <div className="banner" data-aos="fade-in">
            <video autoPlay muted loop playsInline className="banner-video">
                <source src={video} type="video/mp4" />
                Tu navegador no soporta videos HTML5.
            </video>
            <div className="banner-texto" data-aos="zoom-in" data-aos-delay="500">
                <h1>Infraestructura</h1>
            </div>
        </div>
    );
};

export default HeroInfa;