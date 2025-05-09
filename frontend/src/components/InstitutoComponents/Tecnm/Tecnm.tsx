import React from 'react'
import './Tecnm.css'
import estudiantes from '../../../assets/Fotos/Infraestructura/Estudiantes.png'

const Tecnm: React.FC = () => {
    return (
        <div className="porque-tecnm" data-aos="fade-up">
            <div className="porque-container">
                <div className="card-img" data-aos="zoom-in" data-aos-delay="300">
                    <img src={estudiantes} alt="Estudiante leyendo" />
                </div>
                <div className="card-texto" data-aos="fade-right" data-aos-delay="400">
                    <h2>¿Por qué elegir el TECNM?</h2>
                    <p>
                        El Instituto Tecnológico de Cancún es una institución de excelencia con más de 36 años formando profesionales altamente capacitados. Contamos con planes de estudio actualizados, docentes expertos y una infraestructura moderna con laboratorios, biblioteca digital y espacios de innovación. Además, ofrecemos becas, intercambios internacionales y una fuerte vinculación con empresas para garantizar una alta empleabilidad.
                    </p>
                    <p>
                        Ser parte del TecNM Cancún te brinda la oportunidad de desarrollar tu talento en un entorno dinámico, con actividades culturales, deportivas y tecnológicas. Nuestro compromiso es impulsar tu crecimiento profesional con educación de calidad y conexión directa con el sector productivo. ¡Tu éxito comienza aquí! 🚀
                    </p>
                    <a href="#" className="boton-leer-mas">LEER MÁS</a>
                </div>
            </div>
        </div>
    )
}

export default Tecnm