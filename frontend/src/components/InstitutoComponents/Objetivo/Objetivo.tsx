import React from 'react';
import './Objetivo.css';
import imagen from '../../../assets/Fotos/Filosofia3.jpeg';

const Objetivo: React.FC = () => {
    return (
        <div className="bloque-contenido-objetivo" data-aos="fade-left">
            <div className="objetivo-texto">
                <h2>OBJETIVO</h2>
                <p>
                    Promover el desarrollo integral y armónico del educando en relación con los demás, consigo mismo y con su entorno,
                    mediante una formación intelectual que lo capacite en el manejo de los métodos y los lenguajes,
                    sustentados en los principios de identidad nacional, justicia, soberanía y solidaridad, y en la recreación,
                    el deporte y la cultura, que le permitan una mente y un cuerpo sano.
                </p>
            </div>
            <div className="objetivo-imagen">
                <img src={imagen} alt="Imagen de Objetivo" />
            </div>
        </div>
    );
};

export default Objetivo;