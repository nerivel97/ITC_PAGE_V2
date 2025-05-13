import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createCareerSchema,
  updateCareerSchema,
} from '../../dtos/oferta-educativa';
import { ApiResponse } from '../../interfaces/api.interface';
import { Career } from '../../models/oferta-educativa';
import { careersService } from '../../services/oferta-educativa';

const createNewCareer = async (req: Request, res: Response) => {
  const createCareerDto = createCareerSchema.parse(req.body);
  const createdCareer = await careersService.createNewCareer(createCareerDto);

  const response: ApiResponse<Career> = {
    success: true,
    message: 'Carrera creada correctamente',
    data: createdCareer,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.CREATED).json(response);
};

const getAllCareers = async (_req: Request, res: Response) => {
  const careers = await careersService.getAllCareers();

  const response: ApiResponse<Career[]> = {
    success: true,
    message: 'Carreras obtenidas correctamente',
    data: careers,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const getOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);
  const career = await careersService.getOneCareerById(careerId);

  const response: ApiResponse<Career> = {
    success: true,
    message: 'Carrera obtenida correctamente',
    data: career,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const updateOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);

  const updateCareerDto = updateCareerSchema.parse(req.body);
  const updatedCareer = await careersService.updateOneCareerById(
    careerId,
    updateCareerDto,
  );

  const response: ApiResponse<Career> = {
    success: true,
    message: 'Carrera actualizada correctamente',
    data: updatedCareer,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const deleteOneCareerById = async (req: Request, res: Response) => {
  const careerId = Number(req.params.careerId);
  await careersService.deleteOneCareerById(careerId);

  const response: ApiResponse<void> = {
    success: true,
    message: 'Carrera eliminada correctamente',
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

export const careersController = {
  createNewCareer,
  getAllCareers,
  getOneCareerById,
  updateOneCareerById,
  deleteOneCareerById,
};
