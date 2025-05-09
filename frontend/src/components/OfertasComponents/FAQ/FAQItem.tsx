import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItemProps {
  question: string;
  answer: string; // HTML como string para dangerouslySetInnerHTML
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.faqItem}>
      <button 
        className={`${styles.faqQuestion} ${isActive ? styles.active : ''}`}
        onClick={() => setIsActive(!isActive)}
        aria-expanded={isActive}
      >
        {question}
      </button>
      <div 
        className={`${styles.faqAnswer} ${isActive ? styles.show : ''}`}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  );
};

export default FAQItem;