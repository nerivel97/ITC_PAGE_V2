// app.ts
import express from 'express';
import cors from 'cors';
import { createEventosRouter } from './routes/eventos.routes';
import { EventosController } from './controllers/eventos.controller';
import { EventosService } from './services/eventos.service';
import { AppDataSource } from './config/database';

export default async function initializeApp() {
    await AppDataSource.initialize();

    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173', // Reemplaza con tu URL de frontend
        credentials: true
    }));
    const eventosService = new EventosService();
    const eventosController = new EventosController(eventosService);

    app.use('/api/eventos', createEventosRouter(eventosController));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    return app;
}