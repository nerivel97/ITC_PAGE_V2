import { useNavigate } from 'react-router-dom';
import Card from '../components/Shared/Card/Card';
import SummaryCard from '../components/Shared/SummaryCard/SummaryCard';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Datos de ejemplo
  const stats = {
    totalVisitors: 1245,
    activeUsers: 89,
    newRegistrations: 23,
    pendingTasks: 5
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Bienvenido al Panel de Control</h1>
        <p>Modo público - Sin autenticación</p>
      </header>

      <section className={styles.statsSection}>
        <h2>Resumen General</h2>
        <div className={styles.statsGrid}>
          <SummaryCard 
            title="Visitantes" 
            value={stats.totalVisitors} 
            icon="👥"
            onClick={() => navigate('/admin/instituto-itc')}
          />
          <SummaryCard title="Usuarios activos" value={stats.activeUsers} icon="👤"/>
          <SummaryCard title="Nuevos registros" value={stats.newRegistrations} icon="📝"/>
          <SummaryCard title="Tareas pendientes" value={stats.pendingTasks} icon="✅"/>
        </div>
      </section>

      <section className={styles.quickActions}>
        <h2>Accesos Rápidos</h2>
        <div className={styles.actionsGrid}>
          <Card 
            title="Instituto ITC"
            description="Administrar información institucional"
            icon="🏛️"
            onClick={() => navigate('/admin/instituto-itc')}
          />
          <Card 
            title="Oferta Educativa"
            description="Gestionar carreras y programas"
            icon="📚"
            onClick={() => navigate('/admin/oferta-educativa')}
          />
          {/* Agrega más cards según necesites */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;