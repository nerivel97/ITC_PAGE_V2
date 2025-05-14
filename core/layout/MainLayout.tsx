
import { Outlet } from 'react-router-dom';
import HeaderBanners from '../bannercomponent/HeaderBanner';
import Footer from '../FooterComponent/Footer';
import styles from './layout.module.css';
import MenuPrincipal from '../MenuPrincipal/MenuPrincipal';


const MainLayout = () => {
  return (
    <div className={styles.page}>
      <HeaderBanners />
      <MenuPrincipal/>
     
      <main className={styles.mainContent}>
        <Outlet /> {/* Aquí se renderizarán Home, Carrera o Instituto */}
      
      </main>
      <Footer/> 
    </div>
    
  );
};

export default MainLayout;
