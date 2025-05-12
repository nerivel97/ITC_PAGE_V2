import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  currentPage: string;
}

// Función para formatear nombres de rutas
const formatRouteName = (name: string) => {
  const routeNames: Record<string, string> = {
    'oferta-educativa': 'Oferta Educativa',
    // Agrega más mapeos según sea necesario
  };
  
  return routeNames[name] || name.replace(/-/g, ' ');
};

const Breadcrumbs = ({ currentPage }: BreadcrumbsProps) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to="/"><FaHome /></Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <React.Fragment key={name}>
              <li><FaChevronRight /></li>
              <li>
                {isLast ? (
                  <span>{currentPage}</span>
                ) : (
                  <Link to={routeTo}>
                    {formatRouteName(name)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;