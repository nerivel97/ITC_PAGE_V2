import React from 'react';
import Card from '../components/AdmisionesComponents/ComponentCard/Card';
import Title from '../components/AdmisionesComponents/ComponentTitle/Title';
import styles from '../components/AdmisionesComponents/Home.module.css';

const Admisiones: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
    
            <Title />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Escudo.png" 
            title='OFICIO DE CONVOCATORIA CAMPUS CANCUN'
            description='Consulta el documento oficial con las fechas, requisitos y lineamientos para el proceso de admisión al campus Cancún del TECNM en 2025.'
            reverse={false} />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Red.png" 
            title='OFICIO DE CONVOCATORIA DISTANCIA'
            description='Accede a la convocatoria para modalidades a distancia en extensiones como Puerto Morelos, Chunhuhub, Pantera e Ignacio Zaragoza. Incluye sedes, procesos y requisitos específicos.'
            reverse={true} />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Birrete.png" 
            title='OFICIO DE CONVOCATORIA DISTANCIA'
            description='Explora las licenciaturas e ingenierías disponibles en el campus Cancún. Conoce los perfiles de ingreso, duración y objetivos de cada programa académico.'
            reverse={false} />
            
            <Card imageUrl="/src/assets/Fotos/Admisiones/Libro.png" 
            title='GUÍA DE ESTUDIOS'
            description='Revisa los temas y áreas de conocimiento que serán evaluados en el examen de admisión. Ideal para preparar tu ingreso al TECNM con tiempo y enfoque.'
            reverse={true} />

        </div>
    );
};
export default Admisiones;