import { Routes, Route } from 'react-router-dom';
import Banner from '../components/OfertasComponents/Banner/Banner';
import Breadcrumbs from '../components/OfertasComponents/Breadcrumbs/Breadcrumbs';
import DegreesSection from '../components/OfertasComponents/SeccionProgramas/DegreesSection';
import FAQ from '../components/OfertasComponents/FAQ/FAQ';
import FinalSection from '../components/OfertasComponents/FinalSection/FinalSection';
import LearningExperience from '../components/OfertasComponents/SeccionExperiencias/LearningExperience';
import styles from '../components/OfertasComponents/Ofertas.module.css';

const Ofertas = () => {
  return (
    <div className={styles.ofertasContainer}>
      <Breadcrumbs currentPage="Oferta Educativa" />
      <Banner />
      
      <Routes>
        <Route index element={
          <>
            <DegreesSection />
            <LearningExperience />
            <FAQ />
            <FinalSection />
          </>
        } />
        
      </Routes>
    </div>
  );
};

export default Ofertas;