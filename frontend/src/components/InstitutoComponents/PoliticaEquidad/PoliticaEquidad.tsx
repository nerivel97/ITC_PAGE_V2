import React from 'react';
import './PoliticaEquidad.css';

const PoliticaEquidad: React.FC = () => {
    return (
        <div className="bloque-contenido-equidad" data-aos="fade-right">
            <div className="equidad-imagen"></div>
            <div className="equidad-texto">
                <h2>POLÍTICA DE EQUIDAD DE GÉNERO</h2>
                <p>
                    Promovemos: <br />
                    Ambientes libres de discriminación y violencia. <br />
                    Programas de mentoría para mujeres en STEM. <br />
                    Conciliación vida académica-familiar. <br />
                </p>
            </div>
        </div>
    );
};

export default PoliticaEquidad;