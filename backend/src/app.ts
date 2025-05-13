// app.ts
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

//EVENTOS
import { EventosController } from './controllers/eventos.controller';
import { createEventosRouter } from './routes/eventos.routes';
import { EventosService } from './services/eventos.service';

//NOTICIAS
import { NoticiasController } from './controllers/noticias.controller';
import { createNoticiasRouter } from './routes/eventos.routes';
import { NoticiasService } from './services/eventos.service';

// OFERTA EDUCATIVA
import {
  careersRouter,
  reticlesRouter,
  subjectsRouter,
} from './routes/oferta-educativa';

import { connectToDatabase } from './config/database';
import { env } from './lib/env';
import { errorHandler } from './middlewares/error-handler';
import { isDevelopment, isProduction } from './utils/env';

export default async function initializeApp() {
  await connectToDatabase();

  const app = express();

  // Middlewares deben ir antes de las rutas
  app.use(morgan(isProduction() ? 'combined' : 'dev'));
  app.use(
    cors({
      origin: isDevelopment() ? '*' : env.APP_ORIGIN, // Cambiar esto por el dominio de producción
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Luego las rutas
  const eventosService = new EventosService();
  const eventosController = new EventosController(eventosService);
  const noticiasService = new NoticiasService();
  const noticiasController = new NoticiasController(noticiasService);
  app.use('/api/eventos', createEventosRouter(eventosController));
  app.use('/api/noticias', createNoticiasRouter(noticiasController));

  // Oferta Educativa
  app.use('/api/carreras', careersRouter);
  app.use('/api/reticulas', reticlesRouter);
  app.use('/api/materias', subjectsRouter);

  app.use(errorHandler); // Manejo de errores personalizado

  return app;
}
