// src/routes/carrera.routes.ts
import { Router } from 'express';
import { ICarreraController } from '../interfaces/controller.interface';

export default function carreraRoutes(controller: ICarreraController) {
  const router = Router();

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}