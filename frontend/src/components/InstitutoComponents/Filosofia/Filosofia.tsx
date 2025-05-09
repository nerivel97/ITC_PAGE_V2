import React from 'react';
import './Filosofia.css';

const Filosofia: React.FC = () => {
    return (
        <div className="bloque-contenido-filosofia" data-aos="fade-up">
            <div className="filosofia-texto">
                <h2>FILOSOFÍA</h2>
                <p>
                    Se establece esta filosofía basándose en el plan nacional del desarrollo que señala en el apartado de “educación superior”,
                    que está en un medio para acrecentar el capital humano y social de la nación, y la inteligencia individual y colectiva de
                    los mexicanos, para enriquecer la cultura con las aportaciones de las humanidades, las artes, las ciencias y la tecnología;
                    y para contribuir al aumento de la competitividad y el empleo seguidos de una economía basada en el conocimiento.<br /><br />
                    Las instituciones de educación superior realizan funciones de docencia, investigación, y difusión de la cultura según sea su tipología.<br />
                    Así mismo estamos en vía de lograr un sistema educativo superior de calidad que brinde sólida formación a sus educandos y egresados
                    que responda a la demanda del país.
                </p>
            </div>
            <div className="circulos-filosofia">
                <div className="circulo imagen1"></div>
                <div className="circulo imagen2"></div>
                <div className="circulo imagen3"></div>
            </div>
        </div>
    );
};

export default Filosofia;