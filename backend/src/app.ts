// app.ts
import express from 'express';
import cors from 'cors';

//EVENTOS
import { createEventosRouter } from './routes/eventos.routes';
import { EventosController } from './controllers/eventos.controller';
import { EventosService } from './services/eventos.service';

//NOTICIAS
import { createNoticiasRouter } from './routes/eventos.routes';
import { NoticiasController } from './controllers/noticias.controller';
import { NoticiasService } from './services/eventos.service';

// OFERTA EDUCATIVA
import { careersRouter } from './routes/oferta-educativa';
import { reticlesRouter } from './routes/oferta-educativa';
import { subjectsRouter } from './routes/oferta-educativa';

import { connectToDatabase } from './config/database';
import { isDevelopment } from './utils/env';
import { errorHandler } from './middlewares/error-handler';

export default async function initializeApp() {
    await connectToDatabase();
  
    const app = express();
    
    // Middlewares deben ir antes de las rutas
    app.use(cors({
      origin: () => {
        if (isDevelopment()) {
          return '*';
        }

        return 'http://localhost:5173';
      },
      credentials: true
    }));
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