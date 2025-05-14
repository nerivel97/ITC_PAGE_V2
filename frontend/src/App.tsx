import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './core/layout/MainLayout';
import Instituto from './pages/Instituto';
import Oferta from './pages/Oferta';
import CarreraDetalle from './pages/Carreras';
import Infra from './pages/Infra';
import AdminLayout from './admin/components/AdminLayout/AdminLayout';
import AdminDashboard from './admin/pages/Dashboard';
import EventosTable from './admin/pages/Eventos/EventosTable';
import NoticiasTable from './admin/pages/Noticias/NoticiasTable';
import OfertTable from './admin/pages/OfertaEducativa/OfertTable';
import AdminHomeGallery from './admin/pages/InstitutoITC/AdminHomeGallery';
import Page_Eventos from './pages/Page_Eventos';
import Page_Eventos_c from './components/HomeComponents/ComponentEvento/Page_Eventos_c';


import "./App.css"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas principales */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/Instituto' element={<Instituto />} />
          <Route path='/oferta-educativa' element={<Oferta />} />
          <Route path="/oferta-educativa/:carreraNombre" element={<CarreraDetalle />} />
          <Route path='/Infraestructura' element={<Infra />} />

          {/* Rutas de eventos */}
          <Route path='/eventos' element={<Page_Eventos />} />
          <Route path='/eventos/:id' element={<Page_Eventos_c />} />
        </Route>

        {/* Rutas del panel de administración (sin protección) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/eventos" element={<EventosTable />} />
          <Route path="/admin/noticias" element={<NoticiasTable />} />
          <Route path="/admin/oferta_Educativa" element={<OfertTable />} />
          <Route path="/admin/home_Gallery" element={<AdminHomeGallery />} />
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
