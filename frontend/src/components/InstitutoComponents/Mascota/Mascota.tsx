import React from 'react';
import './Mascota.css';
import mascota from '../../../assets/Fotos/Tucan.png';

const Mascota: React.FC = () => {
    return (
        <div className="bloque-contenido-mascota" data-aos="fade-up">
            <div className="mascota-texto">
                <h2>M A S C O T A</h2>
                <p>
                    El tucán fue adoptado como mascota de este Instituto desde el año de 1990 y fue seleccionado por ser parte importante dentro
                    de la fauna del Estado de Q. Roo. <br /><br />
                    Los tucanes son aves de pelo y pico de colores muy llamativos por su brillantez y colorido. Llegan a medir hasta 60 cm.
                    Su pico es largo, macizo con dientecillos como sierra, llega a medir la tercera parte de su tamaño y es muy ligero por
                    las numerosas cámaras que tiene, por lo que no le dificulta el vuelo.
                </p>
            </div>
            <div className="mascota-imagen">
                <img src={mascota} alt="Imagen de Tucán" />
            </div>
        </div>
    );
};

export default Mascota;