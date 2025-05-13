import express from 'express';
import { careersController } from '../../controllers/oferta-educativa';

export const careersRouter = express.Router();

careersRouter
  .route('/')
  .post(careersController.createNewCareer)
  .get(careersController.getAllCareers);

careersRouter
  .route('/:careerId')
  .get(careersController.getOneCareerById)
  .patch(careersController.updateOneCareerById)
  .delete(careersController.deleteOneCareerById);
