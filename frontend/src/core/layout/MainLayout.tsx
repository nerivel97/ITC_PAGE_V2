import { Outlet } from "react-router-dom";
import HeaderBanners from "../bannercomponent/HeaderBanner";
import Footer from "../FooterComponent/Footer";
import styles from "./layout.module.css";

const MainLayout = () => {
  return (
    <div className={styles.page}>
      <HeaderBanners />

      <nav className={styles.menu}>
        <div className={styles.menuContainer}>
          <a href="/" className={styles.menuItem}>
            Inicio
          </a>
          <a href="/instituto" className={styles.menuItem}>
            Instituto
          </a>
          <a href="/oferta-educativa" className={styles.menuItem}>
            Oferta Educativa
          </a>
          <a href="/admisiones" className={styles.menuItem}>
            Admisiones
          </a>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <Outlet /> {/* Aquí se renderizarán Home, Carrera o Instituto */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
