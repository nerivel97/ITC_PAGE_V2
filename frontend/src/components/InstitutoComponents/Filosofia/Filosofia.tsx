import React from 'react';
import './Filosofia.css';

const Filosofia: React.FC = () => {
    return (
        <div className="bloque-contenido-filosofia" data-aos="fade-up">
            <div className="filosofia-texto">
                <h2>FILOSOFÍA</h2>
                <p>
                   Nuestro modelo se basa en: <br /> <br />
                    Formación integral: Combinamos conocimiento técnico con habilidades blandas. <br /> <br />
                    Vinculación con el Plan Nacional de Desarrollo: Contribuimos a la competitividad nacional mediante carreras estratégicas. <br /> <br />
                    Sustentabilidad: Proyectos académicos alineados a los ODS 2030. <br />
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