import styles from "./EngineeringText.module.css";

interface EngineeringTextProps {
  title: string;
}

const EngineeringText = ({ title }: EngineeringTextProps) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
    </div>
  );
};

export default EngineeringText;
