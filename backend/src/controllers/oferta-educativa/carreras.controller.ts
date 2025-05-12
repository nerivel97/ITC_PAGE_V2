import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createCareerSchema,
  updateCareerSchema,
} from '../../dtos/oferta-educativa';
import { careersService } from '../../services/oferta-educativa';

const createNewCareer = async (req: Request, res: Response) => {
  const createCareerDto = createCareerSchema.parse(req.body);
  const createdCareer = await careersService.createNewCareer(createCareerDto);

  res.status(HttpStatusCode.CREATED).json({
    status: 'success',
    data: createdCareer,
  });
};

const getAllCareers = async (_req: Request, res: Response) => {
  const careers = await careersService.getAllCareers();

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: careers,
  });
};

const getOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);
  const career = await careersService.getOneCareerById(careerId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: career,
  });
};

const updateOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);

  const updateCareerDto = updateCareerSchema.parse(req.body);
  const updatedCareer = await careersService.updateOneCareerById(
    careerId,
    updateCareerDto,
  );

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: updatedCareer,
  });
};

const deleteOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);
  await careersService.deleteOneCareerById(careerId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
  });
};

export const careersController = {
  createNewCareer,
  getAllCareers,
  getOneCareerById,
  updateOneCareerById,
  deleteOneCareerById,
};
