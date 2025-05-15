import React from 'react';
import './Valores.css';
import responsabilidad from '../../../assets/Fotos/responsabilidad.png';
import trabajoEquipo from '../../../assets/Fotos/trabajo_en_equipo.png';
import respeto from '../../../assets/Fotos/respeto (1).png';
import lealtad from '../../../assets/Fotos/lealtad (1).png';
import comunicacion from '../../../assets/Fotos/comunicacion (1).png';
import superacion from '../../../assets/Fotos/superacion.png';

const Valores: React.FC = () => {
    return (
        <div className="valores-iconos" data-aos="fade-up">
            <h2>VALORES</h2>
            <div className="iconos-grid">
                <div className="icono-valor">
                    <img src={responsabilidad} alt="Responsabilidad" />
                    <span>Responsabilidad</span>
                </div>
                <div className="icono-valor">
                    <img src={trabajoEquipo} alt="Trabajo en equipo" />
                    <span>Trabajo en equipo</span>
                </div>
                <div className="icono-valor">
                    <img src={respeto} alt="Respeto" />
                    <span>Respeto e inclusión</span>
                </div>
                <div className="icono-valor">
                    <img src={lealtad} alt="Compromiso institucional" />
                    <span>Compromiso social</span>
                </div>
                <div className="icono-valor">
                    <img src={comunicacion} alt="Comunicación efectiva" />
                    <span>Comunicación</span>
                </div>
                <div className="icono-valor">
                    <img src={superacion} alt="Superacion" />
                    <span>Mejora continua</span>
                </div>
            </div>
        </div>
    );
};

export default Valores;