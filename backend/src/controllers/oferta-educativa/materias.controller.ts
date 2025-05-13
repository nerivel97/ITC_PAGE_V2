import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createSubjectSchema,
  updateSubjectSchema,
} from '../../dtos/oferta-educativa';
import { ApiResponse } from '../../interfaces/api.interface';
import { Subject } from '../../models/oferta-educativa';
import { subjectsService } from '../../services/oferta-educativa';

const createNewSubject = async (req: Request, res: Response) => {
  const createSubjectDto = createSubjectSchema.parse(req.body);
  const createdSubject = await subjectsService.createNewSubject(
    createSubjectDto,
  );

  const response: ApiResponse<Subject> = {
    success: true,
    message: 'Materia creada correctamente',
    data: createdSubject,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.CREATED).json(response);
};

const getAllSubjects = async (_req: Request, res: Response) => {
  const subjects = await subjectsService.getAllSubjects();

  const response: ApiResponse<Subject[]> = {
    success: true,
    message: 'Materias obtenidas correctamente',
    data: subjects,
    timestamp: new Date(),
  };
};

const getOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);
  const subject = await subjectsService.getOneSubjectById(subjectId);

  const response: ApiResponse<Subject> = {
    success: true,
    message: 'Materia obtenida correctamente',
    data: subject,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const updateOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);

  const updateSubjectDto = updateSubjectSchema.parse(req.body);
  const updatedSubject = await subjectsService.updateOneSubjectById(
    subjectId,
    updateSubjectDto,
  );

  const response: ApiResponse<Subject> = {
    success: true,
    message: 'Materia actualizada correctamente',
    data: updatedSubject,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const deleteOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);
  await subjectsService.deleteOneSubjectById(subjectId);

  const response: ApiResponse<void> = {
    success: true,
    message: 'Materia eliminada correctamente',
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

export const subjectsController = {
  createNewSubject,
  getAllSubjects,
  getOneSubjectById,
  updateOneSubjectById,
  deleteOneSubjectById,
};
