import styles from './Button.module.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ label, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
}