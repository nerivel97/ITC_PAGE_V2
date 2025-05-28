import React from 'react';
import Card from '../components/AdmisionesComponents/ComponentCard/Card';
import Title from '../components/AdmisionesComponents/ComponentTitle/Title';
import styles from '../components/AdmisionesComponents/Home.module.css';
import { useNavigate } from 'react-router-dom';

const Admisiones: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.pageContainer}>
    
            <div>
                <Title> Oferta Educativa TECNM Campus Cancún 2025 </Title>
            </div>

            <Card imageUrl="/src/assets/Fotos/Admisiones/Libro.png" 
            title='GUÍA PARA EL EXAMEN DE SELECCIÓN'
            description='Presenta la oferta educativa a distancia en sedes como Puerto Morelos y Chunhuhub. Contiene requisitos, fechas, examen en línea y detalles para solicitar beca.'
            buttonText = 'Descargar PDF'
            pdfUrl = '/Documentos/Guia-Examen-Seleccion-2025.pdf'
            reverse={true} />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Escudo.png" 
            title='2DA CONVOCATORIA CAMPUS CANCÚN 2025'
            description='Incluye requisitos, fechas, carreras disponibles y pasos para ingresar en modalidad presencial al semestre agosto - diciembre 2025. También detalla pagos e inscripción.'
            buttonText = 'Descargar PDF'
            pdfUrl = '/Documentos/2da-Convocatoria-Campus-Cancun-2025.pdf'
            reverse={false} />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Red.png" 
            title='CONVOCATORIA EDUCACIÓN A DISTANCIA 2025'
            description='Presenta la oferta educativa a distancia en sedes como Puerto Morelos y Chunhuhub. Contiene requisitos, fechas, examen en línea y detalles para solicitar beca.'
            buttonText = 'Descargar PDF'
            pdfUrl = '/Documentos/Convocatoria-Educacion-A-Distancia.pdf'
            reverse={true} />

            <Card imageUrl="/src/assets/Fotos/Admisiones/Libro.png" 
            title='RESULTADOS'
            description='Revisa los resultados de los exámenes de admisiones.'
            buttonText='Ver más'
            reverse={false}
            linkUrl = '/Resultados' />
        </div>
    );
};
export default Admisiones;