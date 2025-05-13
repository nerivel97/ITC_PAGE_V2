import express from 'express';
import { reticlesController } from '../../controllers/oferta-educativa';

export const reticlesRouter = express.Router();

reticlesRouter
  .route('/')
  .post(reticlesController.createNewReticle)
  .get(reticlesController.getAllReticles);

reticlesRouter
  .route('/:reticleId')
  .get(reticlesController.getOneReticleById)
  .patch(reticlesController.updateOneReticleById)
  .delete(reticlesController.deleteOneReticleById);
