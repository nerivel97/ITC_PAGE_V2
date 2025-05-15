import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  currentPage: string;
}

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
    <nav className={styles.breadcrumbs} aria-label="Migas de pan">
      <ul>
        <li>
          <Link to="/" aria-label="Inicio">
            <FaHome />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedName = formatRouteName(name);
          
          return (
            <React.Fragment key={name}>
              <li aria-hidden="true">
                <FaChevronRight />
              </li>
              <li>
                {isLast ? (
                  <span aria-current="page">{currentPage}</span>
                ) : (
                  <Link to={routeTo} title={`Ir a ${formattedName}`}>
                    {formattedName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;