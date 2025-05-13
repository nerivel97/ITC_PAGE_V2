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

import { connectToDatabase } from './config/database';
import { isDevelopment } from './utils/env';

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
  
    return app;
  }