import React from 'react';
import './Filosofia.css';
import graduados from '../../../assets/Fotos/Quienes_somos/graduados.png';
import estudiantes from '../../../assets/Fotos/Quienes_somos/Estudiantes.png';
import campana from '../../../assets/Fotos/Quienes_somos/Campana.jpeg';

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
               <div
                    className="circulo"
                    style={{ backgroundImage: `url(${graduados})`, top: '0', left: '60px', zIndex: 5 }}
                />
                <div
                    className="circulo"
                    style={{ backgroundImage: `url(${estudiantes})`, top: '60px', left: '110px', zIndex: 2 }}
                />
                <div
                    className="circulo"
                    style={{ backgroundImage: `url(${campana})`, top: '120px', left: '0px', zIndex: 1 }}
                />
            </div>
        </div>
    );
};

export default Filosofia;