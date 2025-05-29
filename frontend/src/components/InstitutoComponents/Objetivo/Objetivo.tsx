import React from 'react';
import './Objetivo.css';
import imagen from '../../../assets/Fotos/Objetivos del tecnologico de cancun.jpg';

const Objetivo: React.FC = () => {
    return (
        <div className="bloque-contenido-objetivo" data-aos="fade-left">
            <div className="objetivo-texto">
                <h2>OBJETIVO</h2>
                <p>
                    Desarrollar profesionales con: <br />
                    Habilidades técnicas validadas por el mercado laboral. <br /> 
                    Conciencia social y compromiso con su entorno. <br />
                    Mente y cuerpo sano mediante deporte y cultura. <br />
                </p>
            </div>
            <div className="objetivo-imagen">
                <img src={imagen} alt="Imagen de Objetivo" />
            </div>
        </div>
    );
};

export default Objetivo;