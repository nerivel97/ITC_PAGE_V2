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
      question: "¿Cuál es el horario de clases?",
      answer: "El horario puede ser matutino o vespertino, dependiendo de la carrera y semestre."
    },

    {
      id: 2,
      question: "¿El instituto ofrece actividades extracurriculares?",
      answer: "Sí, hay talleres de música, danza, deportes, clubes estudiantiles, concursos y más."
    },

    {
      id: 3,
      question: "¿Cómo funciona el servicio social?",
      answer: "Se realiza después de cubrir el 70% de créditos y tiene una duración de 480 horas en instituciones públicas o sociales."
    },

    {
      id: 4,
      question: "¿Qué necesito para titularme?",
      answer: "Haber aprobado todas las materias, realizar servicio social, residencia profesional, ingles y cumplir con algún proceso de titulación como tesis, informe técnico o promedio general."
    },
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