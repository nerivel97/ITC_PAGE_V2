import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./core/layout/MainLayout";
import Instituto from "./pages/Instituto";
import InstitutoDirectorio from "./pages/InstitutoDirectorio";
import Ofertas from './pages/Oferta';
import Carreras from './pages/Carreras';
import Infra from "./pages/Infra";
import Admisiones from "./pages/Admisiones";
import AdminLayout from "./admin/components/AdminLayout/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import QuienesSomosAdmin from "./admin/pages/QuienesSomos/QuienesSomos";
import Titulacion from "./pages/Titulaciones";

import EventosTable from "./admin/pages/Eventos/EventosTable";
import NoticiasTable from "./admin/pages/Noticias/NoticiasTable";
import Page_Eventos from "./pages/Page_Eventos";
import Page_Eventos_c from "./components/HomeComponents/ComponentEvento/Page_Eventos_c";
import Page_Noticias from "./pages/Page_Noticias";
import Page_Noticias_c from "./components/HomeComponents/ComponentNoticias/Page_Noticias_c";

import OfertTable from './admin/pages/OfertaEducativa/CarreraTable';
import AdminHomeGallery from "./admin/pages/InstitutoITC/AdminHomeGallery";
import AdmisionesTable from "./admin/pages/Admisiones/AdmisionesTable";
import Resultados from "./pages/Resultados";
import Preguntas_frecuentes from "./pages/Preguntas_frecuentes";

import Residencia from "./pages/Residencia";
import ActExtra from "./pages/ActividadesExtra";

import Innovatec from './pages/innovatec';
import Concursorobotica from './pages/Concursorobotica';
import Concursos from './pages/Concursos';
import Calendario from "./pages/Calendario";
import ServicioSocial from './pages/ServicioSocial';

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas principales */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/Instituto' element={<Instituto />} />
          <Route path="/Instituto-directorio" element={<InstitutoDirectorio />} />
          <Route path='/oferta-educativa' element={<Ofertas />} />
          <Route path="/oferta-educativa/:carreraSlug" element={<Carreras />} />
          <Route path='/Infraestructura' element={<Infra />} />
          <Route path='/extraescolares' element={<ActExtra />} />
          <Route path='/Admisiones' element={<Admisiones />} />
          <Route
            path="/Preguntas_frecuentes"
            element={<Preguntas_frecuentes />}
          />
          <Route path='/Concursos' element={<Concursos />} />
          <Route path='/innovatec' element={<Innovatec/>} />
          <Route path='/concursorobotica' element={<Concursorobotica/>} />
          
          <Route path="/residencia-profesional" element={<Residencia />} />

          <Route path="/titulacion" element={<Titulacion />} />
          <Route path="/servicio-social" element={<ServicioSocial />} />

          {/* Rutas de carreras */}

          {/*Ruta para el calendario*/}
          <Route path="/calendario" element={<Calendario />}/>

          {/* Rutas de eventos */}
          <Route path='/eventos' element={<Page_Eventos />} />
          <Route path='/eventos/:id' element={<Page_Eventos_c />} />

          {/* Rutas de Noticias */}
          <Route path='/noticias' element={<Page_Noticias />} />
          <Route path='/noticias/:id' element={<Page_Noticias_c />} />
	  <Route path='/resultados' element={<Resultados />} />
        </Route>

        {/* Rutas del panel de administración (sin protección) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/eventos" element={<EventosTable />} />
          <Route path="/admin/noticias" element={<NoticiasTable />} />
          <Route path="/admin/oferta_educativa" element={<OfertTable />} />
          <Route path="/admin/admisiones" element={<AdmisionesTable />} />
          <Route path="/admin/Home_Page" element={<AdminHomeGallery />} />
          <Route path="/admin/QuienesSomos" element={<QuienesSomosAdmin />} />

          {/* <Route path="oferta-educativa" element={<OfertaEducativaAdmin />} />s  */}
          {/* Agrega más rutas del admin aquí */}
        </Route>

        {/* Ruta para 404 */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
};

export default App;
