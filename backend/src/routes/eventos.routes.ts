import { Router } from 'express';
import { IEventoController } from '../interfaces/controller.interface';
import { INoticiaController } from '../interfaces/controller.interface';


export function createEventosRouter(controller: IEventoController) {
  const router = Router();

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}

export function createNoticiasRouter(controller: INoticiaController) {
  const router = Router();

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.post('/', controller.create.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}