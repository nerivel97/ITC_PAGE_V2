import React from 'react';
import './Hero.css';
import ITCANCUN from '../../../assets/Fotos/ITCANCUN.jpeg';

const Hero: React.FC = () => {
    return (
        <div className="hero-banner" data-aos="zoom-in">
            <img src={ITCANCUN} alt="Banner Tecnológico" className="banner-img" />
            <div className="banner-text">
                <h1>Bienvenido al<br />Tecnológico de Cancún</h1>
                <p>Descubre los pilares que definen nuestra identidad y<br />
                    nuestro compromiso con la excelencia educativa.</p>
            </div>
        </div>
    );
};

export default Hero;