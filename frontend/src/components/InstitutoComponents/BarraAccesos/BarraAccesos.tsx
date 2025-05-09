import React from 'react';
import './BarraAccesos.css';
import tucanmj from '../../../assets/Fotos/TucanMJ.png';

const BarraAccesos: React.FC = () => {
    return (
        <div className="barra-accesos" data-aos="fade-up">
            <div className="accesos-contenido">
                <div className="accesos-texto">
                    <a href="#">Noticias</a>
                    <a href="#">Admisiones</a>
                    <a href="#">Eventos</a>
                    <a href="#">Calendario</a>
                </div>
                <div className="accesos-tucan">
                    <img src={tucanmj} alt="Tucán ITCancún" />
                </div>
            </div>
        </div>
    );
};

export default BarraAccesos;