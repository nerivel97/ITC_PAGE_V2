import express from 'express';
import { subjectsController } from '../../controllers/oferta-educativa';

export const subjectsRouter = express.Router();

subjectsRouter
  .route('/')
  .post(subjectsController.createNewSubject)
  .get(subjectsController.getAllSubjects);

subjectsRouter
  .route('/:subjectId')
  .get(subjectsController.getOneSubjectById)
  .patch(subjectsController.updateOneSubjectById)
  .delete(subjectsController.deleteOneSubjectById);
