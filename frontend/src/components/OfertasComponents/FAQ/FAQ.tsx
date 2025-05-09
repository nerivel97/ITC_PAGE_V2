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
      question: "¿Cómo es el proceso de admisión?",
      answer: `<p>Para ingresar al IT Cancún, sigue estos pasos:</p>
        <ul>
          <li><strong>Registro:</strong> Ingresa a nuestro sitio web oficial y completa la solicitud en línea.</li>
          <li><strong>Examen de admisión:</strong> Presenta el examen de ingreso en la fecha programada.</li>
          <li><strong>Publicación de resultados:</strong> Consulta los resultados en nuestro sitio web.</li>
          <li><strong>Entrega de documentos:</strong> Si eres aceptado, entrega la documentación necesaria para completar tu inscripción.</li>
        </ul>`
    },
    // Agrega más FAQs aquí...
  ];

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h1 className={styles.faqTitle}>Preguntas Frecuentes sobre el Instituto Tecnológico de Cancún</h1>
        
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