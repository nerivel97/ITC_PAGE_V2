import FAQItem from './FAQItem';
import styles from './FAQ.module.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Proceso de admisión 2024",
      answer: `<ul>
        <li><strong>Registro en línea:</strong> Del 5 al 30 de mayo en <a href="/admisiones" target="_blank">portal oficial</a></li>
        <li><strong>Examen de admisión:</strong> 15 junio (90% peso) + promedio bachillerato (10%)</li>
        <li><strong>Resultados:</strong> 5 julio vía SMS y portal</li>
        <li><strong>Inscripción:</strong> 22-26 julio (documentación digital)</li>
      </ul>`
    },
    {
      id: 2,
      question: "Becas disponibles",
      answer: `<ul>
        <li><strong>Pronabes:</strong> Hasta 100% de colegiatura</li>
        <li><strong>Transporte:</strong> $1,200 mensuales para residentes en >30km</li>
        <li><strong>Excelencia académica:</strong> 50% descuento con promedio ≥9.0</li>
      </ul>`
    },
    {
      id: 3,
      question: "Calendario académico 2024",
      answer: `<ul>
        <li><strong>Inicio de clases:</strong> 5 de agosto</li>
        <li><strong>Primer parcial:</strong> 16-20 septiembre</li>
        <li><strong>Segundo parcial:</strong> 4-8 noviembre</li>
        <li><strong>Exámenes finales:</strong> 9-13 diciembre</li>
      </ul>`
    },
    {
      id: 4,
      question: "Instalaciones y servicios",
      answer: `<ul>
        <li><strong>Horario:</strong> 7:00 a 21:00 hrs de lunes a viernes</li>
        <li><strong>Biblioteca:</strong> Abierta hasta las 20:00 hrs</li>
        <li><strong>Laboratorios:</strong> Acceso con credencial estudiantil</li>
        <li><strong>Deportes:</strong> Talleres extracurriculares disponibles</li>
      </ul>`
    }
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>Preguntas Frecuentes sobre el Instituto Tecnológico de Cancún</h2>
        
        {faqItems.map(item => (
          <FAQItem 
            key={item.id}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;