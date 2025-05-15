import styles from '../components/HomeComponents/Home.module.css';
import Page_Eventos_c from '../components/HomeComponents/ComponentEvento/Page_Eventos_c';

const Page_Eventos = () => {



  return (
    <div className={styles.homeContainer}>
      <Page_Eventos_c />
    </div>


  );

};

export default Page_Eventos;