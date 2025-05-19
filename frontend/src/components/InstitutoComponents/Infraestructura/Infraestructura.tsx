import React, { useEffect } from 'react';
import './Infraestructura.css';
import lab from '../../../assets/Fotos/Laboratorio.jpeg';
import cancha from '../../../assets/Fotos/Cancha Deportiva.jpg';
import cafeteria from '../../../assets/Fotos/Entrada.jpg';
import auditorio from '../../../assets/Fotos/Auditorio.jpeg';
import entrada from '../../../assets/Fotos/Entrada.jpg';
import { useNavigate } from 'react-router-dom';

const Infraestructura: React.FC = () => {
    const navigate = useNavigate();

    // Aquí forzamos el scroll arriba cuando se muestra esta página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="infraestructura" data-aos="fade-up">
            <h2>Infraestructura</h2>
            <p className="descripcion">
                Contamos con espacios modernos y equipados para apoyar tu formación profesional. Conoce nuestras instalaciones.
            </p>
            <div className="galeria-infraestructura">
                <img src={lab} alt="Laboratorio" />
                <img src={cancha} alt="Cancha deportiva" />
                <img src={cafeteria} alt="Cafetería" />
                <img src={auditorio} alt="Auditorio" />
                <img src={entrada} alt="Entrada" />
            </div>
            <br />
            <button 
                onClick={() => navigate('/infraestructura')}
                className="btn-infraestructura"
            >
                Infraestructura
            </button>
        </div>
    );
};

export default Infraestructura;

