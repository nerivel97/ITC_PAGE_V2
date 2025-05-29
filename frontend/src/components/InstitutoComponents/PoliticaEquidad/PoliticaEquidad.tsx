import React from 'react';
import './PoliticaEquidad.css';
// Asegúrate que la ruta a la imagen sea correcta desde este archivo
import imagenEquidad from '../../../assets/Fotos/POLÍTICA DE EQUIDAD DE GÉNERO TECNM.jpg'; 

const PoliticaEquidad: React.FC = () => {
    return (
        <div className="bloque-contenido-equidad" data-aos="fade-right">
            <div className="equidad-imagen">
                <img 
                    src={imagenEquidad} 
                    alt="Imagen ilustrativa de la política de equidad de género en el Tecnológico de Cancún" 
                    title="Política de Equidad de Género - Tecnológico de Cancún"
                />
            </div>
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