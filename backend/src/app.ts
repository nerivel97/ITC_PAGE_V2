import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

// Configuración base
import { connectToDatabase } from './config/database';
import { env } from './lib/env';
import { errorHandler } from './middlewares/error-handler';
import { isDevelopment, isProduction } from './utils/env';

// Controladores
import { EventosController } from './controllers/eventos.controller';
import { NoticiasController } from './controllers/noticias.controller';
import { CarreraController } from './controllers/Carrera.controller';

// Servicios
import { EventosService } from './services/eventos.service';
import { NoticiasService } from './services/eventos.service'; // Corregido
import { CarreraService } from './services/Carrera.service';

// Rutas
import { createEventosRouter } from './routes/eventos.routes';
import { createNoticiasRouter } from './routes/eventos.routes'; // Ruta corregida
import carreraRoutes from './routes/carrera.routes';

export default async function initializeApp() {
  // 1. Conexión a la base de datos primero
  await connectToDatabase();

  const app = express();

  // Middlewares
  app.use(morgan(isProduction() ? 'combined' : 'dev'));
  app.use(cors({
    origin: isDevelopment() ? '*' : env.APP_ORIGIN,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 2. Inicialización de servicios (después de conectar a BD)
  const eventosService = new EventosService();
  const noticiasService = new NoticiasService();
  const carreraService = new CarreraService();

  // 3. Configuración de controladores
  app.use('/api/eventos', createEventosRouter(new EventosController(eventosService)));
  app.use('/api/noticias', createNoticiasRouter(new NoticiasController(noticiasService)));
  app.use('/api/carreras', carreraRoutes(new CarreraController(carreraService)));

  // 4. Manejo de errores
  app.use(errorHandler);

  return app;
}