import React from 'react';
import './PoliticaCalidad.css';
import Tucan from '../../../assets/Fotos/Tucan.png';

const PoliticaCalidad: React.FC = () => {
    return (
        <div className="bloque-contenido-politica" data-aos="zoom-in">
            <div className="politica-texto">
                <h2>POLÍTICA DE CALIDAD</h2>
                <p>
                    “El Instituto Tecnológico de Cancún establece el compromiso de implementar todos sus procesos,
                    orientándolos hacia la satisfacción de sus clientes sustentada en la Calidad del Proceso Educativo,
                    para cumplir con sus requisitos, mediante la eficacia de un Sistema de Gestión de la Calidad y de mejora continua,
                    conforme a la norma ISO 9001:2008/NMX-CC-9001-IMNC-2008”
                </p>
            </div>
            <div className="politica-imagen">
                <img src={Tucan} alt="Política de Calidad" />
            </div>
        </div>
    );
};

export default PoliticaCalidad;