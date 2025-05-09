import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;