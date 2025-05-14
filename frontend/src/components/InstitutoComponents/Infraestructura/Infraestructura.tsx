import React from 'react';
import './Infraestructura.css';
import lab from'../../../assets/Fotos/Laboratorio.jpeg';
import cancha from'../../../assets/Fotos/Cancha Deportiva.jpg';
import cafeteria from'../../../assets/Fotos/Entrada.jpg';
import auditorio from'../../../assets/Fotos/Auditorio.jpeg';
import entrada from'../../../assets/Fotos/Entrada.jpg';
import { useNavigate } from 'react-router-dom'; // Solo este cambio en imports

const Infraestructura: React.FC = () => {
    const navigate = useNavigate(); // Añadido aquí

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
            <button 
                onClick={() => navigate('/infraestructura')} // Único cambio en el botón
                className="btn-infraestructura"
            >
                Infraestructura
            </button>
        </div>
    );
};

export default Infraestructura;