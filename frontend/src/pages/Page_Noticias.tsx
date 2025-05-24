import styles from '../components/HomeComponents/Home.module.css';
import Page_Noticias_c from '../components/HomeComponents/ComponentNoticias/Page_Noticias_c';

const Page_Noticias = () => {
  return (
    <div className={styles.homeContainer}>
      <Page_Noticias_c />
    </div>
  );
};

export default Page_Noticias;