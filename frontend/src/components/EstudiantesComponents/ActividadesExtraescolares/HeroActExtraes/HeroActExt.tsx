import React from 'react';
import '../../../InstitutoComponents/Hero/Hero.css';
import ITCANCUN from '../../../../assets/Fotos/ITCANCUN.jpeg';

const Hero: React.FC = () => {
    return (
        <div className="hero-banner" data-aos="zoom-in">
            <img src={ITCANCUN} alt="Banner Tecnológico" className="banner-img" />
            <div className="banner-text">
                <h1>Bienvenido a las<br />Actividades Extraescolares</h1>
                <p>Descubre los pilares que definen nuestra identidad y<br />
                    nuestro compromiso con la excelencia educativa.</p>
            </div>
        </div>
    );
};

export default Hero;