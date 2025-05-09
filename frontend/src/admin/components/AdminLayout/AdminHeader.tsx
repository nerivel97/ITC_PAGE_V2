import styles from './AdminLayout.module.css';

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>Panel de Administración</h1>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.userName}>Modo Público</span>
      </div>
    </header>
  );
};

export default AdminHeader;