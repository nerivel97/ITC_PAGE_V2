import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './AdminLayout.module.css';

// Íconos (puedes usar cualquier librería de íconos o SVG)
const SchoolIcon = () => <span>🏛️</span>;
const MenuBookIcon = () => <span>📚</span>;
const PeopleIcon = () => <span>👥</span>;
const ComputerIcon = () => <span>💻</span>;
const EventIcon = () => <span>📅</span>;
const ArticleIcon = () => <span>📰</span>;
const ContactMailIcon = () => <span>✉️</span>;

const menuItems = [
  {
    name: "Instituto ITC",
    path: "/admin/instituto-itc",
    icon: <SchoolIcon />,
  },
  {
    name: "Oferta Educativa",
    path: "/admin/oferta_educativa",
    icon: <MenuBookIcon />,
  },
  {
    name: "Admisiones",
    path: "/admin/admisiones",
    icon: <PeopleIcon />,
  },
  {
    name: "Plataformas",
    path: "/admin/plataformas",
    icon: <ComputerIcon />,
  },
  {
    name: "Eventos",
    path: "/admin/eventos",
    icon: <EventIcon />,
  },
  {
    name: "Noticias",
    path: "/admin/noticias",
    icon: <ArticleIcon />,
  },
  {
    name: "Contacto",
    path: "/admin/contacto",
    icon: <ContactMailIcon />,
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.toggleButton}
      >
        {isExpanded ? '◄' : '►'}
      </button>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) => 
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {isExpanded && <span className={styles.label}>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;