import React from 'react';
import Hero from '../components/InstitutoComponents/Hero/Hero'
import Filosofia from '../components/InstitutoComponents/Filosofia/Filosofia';
import Vision from '../components/InstitutoComponents/Vision/Vision';
import Valores from '../components/InstitutoComponents/Valores/Valores';
import PoliticaCalidad from '../components/InstitutoComponents/PoliticaCalidad/PoliticaCalidad';
import PoliticaEquidad from '../components/InstitutoComponents/PoliticaEquidad/PoliticaEquidad';
import Objetivo from '../components/InstitutoComponents/Objetivo/Objetivo';
import Carrusel from '../components/InstitutoComponents/Carrusel/Carrusel';
import Mascota from '../components/InstitutoComponents/Mascota/Mascota';
import Infraestructura from '../components/InstitutoComponents/Infraestructura/Infraestructura';
import BarraAccesos from '../components/InstitutoComponents/BarraAccesos/BarraAccesos';
const Instituto: React.FC = () => {
    return (
        <div className="instituto">
    
            <Hero/>
            <Vision/>
            <Valores/>
            <Filosofia/>
            <PoliticaCalidad/>
            <PoliticaEquidad/>
            <Objetivo/>
            <Carrusel/>
            <Mascota/>
            <Infraestructura/>
            <BarraAccesos/>


        </div>
    );
};
export default Instituto;