import React from 'react';
import './Vision.css';
import Ojos1 from "../../../assets/Fotos/Ojo1.png";
import lupa from "../../../assets/Fotos/lupa.png";
import montaña from "../../../assets/Fotos/montañas.png";
import Bandera from "../../../assets/Fotos/Bandera.png";

const Vision: React.FC = () => {
    return (
        <div className='vision-mision'>
            <div className="bloque" data-aos="fade-right">
                <div className="titulo">
                    <img src={Ojos1} alt="Ícono Visión" />
                    <h2>Visión</h2>
                </div>
                <ul>
                    <li>
                        <img src={lupa} alt="Lupa" />
                        <p>Egresados con altas tasas de empleabilidad (85% en primer año).</p>
                    </li>
                    <li>
                        <img src={lupa} alt="Lupa" />
                        <p>Laboratorios equipados con tecnología de vanguardia.</p>
                    </li>
                    <li>
                        <img src={lupa} alt="Lupa" />
                        <p>Alianzas internacionales para la movilidad estudiantil y docente.</p>
                    </li>
                </ul>
            </div>
            <div className="bloque" data-aos="fade-left">
                <div className="titulo">
                    <img src={montaña} alt="Ícono Misión" />
                    <h2>Misión</h2>
                </div>
                <ul>
                    <li>
                        <img src={Bandera} alt="Bandera" />
                        <p>Programas educativos acreditados y alineados a las necesidades del sector productivo.</p>
                    </li>
                    <li>
                        <img src={Bandera} alt="Bandera" />
                        <p>Investigación aplicada para solucionar desafíos regionales y globales.</p>
                    </li>
                    <li>
                        <img src={Bandera} alt="Bandera" />
                        <p>Vinculación con empresas líderes en turismo, construcción y tecnología.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Vision;