import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createSubjectSchema,
  updateSubjectSchema,
} from '../../dtos/oferta-educativa';
import { subjectsService } from '../../services/oferta-educativa';

const createNewSubject = async (req: Request, res: Response) => {
  const createSubjectDto = createSubjectSchema.parse(req.body);
  const createdSubject = await subjectsService.createNewSubject(
    createSubjectDto,
  );

  res.status(HttpStatusCode.CREATED).json({
    status: 'success',
    data: createdSubject,
  });
};

const getAllSubjects = async (_req: Request, res: Response) => {
  const subjects = await subjectsService.getAllSubjects();

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: subjects,
  });
};

const getOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);
  const subject = await subjectsService.getOneSubjectById(subjectId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: subject,
  });
};

const updateOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);

  const updateSubjectDto = updateSubjectSchema.parse(req.body);
  const updatedSubject = await subjectsService.updateOneSubjectById(
    subjectId,
    updateSubjectDto,
  );

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: updatedSubject,
  });
};

const deleteOneSubjectById = async (req: Request, res: Response) => {
  const subjectId = Number(req.params.subjectId);
  await subjectsService.deleteOneSubjectById(subjectId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
  });
};

export const subjectsController = {
  createNewSubject,
  getAllSubjects,
  getOneSubjectById,
  updateOneSubjectById,
  deleteOneSubjectById,
};
