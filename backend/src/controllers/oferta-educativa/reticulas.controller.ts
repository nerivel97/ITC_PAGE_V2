import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createReticleSchema,
  updateReticleSchema,
} from '../../dtos/oferta-educativa';
import { ApiResponse } from '../../interfaces/api.interface';
import { Reticle } from '../../models/oferta-educativa';
import { reticlesService } from '../../services/oferta-educativa';

const createNewReticle = async (req: Request, res: Response) => {
  const createReticleDto = createReticleSchema.parse(req.body);
  const createdReticle = await reticlesService.createNewReticle(
    createReticleDto,
  );

  const response: ApiResponse<Reticle> = {
    success: true,
    message: 'Retícula creada correctamente',
    data: createdReticle,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.CREATED).json(response);
};

const getAllReticles = async (_req: Request, res: Response) => {
  const reticles = await reticlesService.getAllReticles();

  const response: ApiResponse<Reticle[]> = {
    success: true,
    message: 'Retículas obtenidas correctamente',
    data: reticles,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const getOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);
  const reticle = await reticlesService.getOneReticleById(reticleId);

  const response: ApiResponse<Reticle> = {
    success: true,
    message: 'Retícula obtenida correctamente',
    data: reticle,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const updateOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);

  const updateReticleDto = updateReticleSchema.parse(req.body);
  const updatedReticle = await reticlesService.updateOneReticleById(
    reticleId,
    updateReticleDto,
  );

  const response: ApiResponse<Reticle> = {
    success: true,
    message: 'Retícula actualizada correctamente',
    data: updatedReticle,
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

const deleteOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);
  await reticlesService.deleteOneReticleById(reticleId);

  const response: ApiResponse<void> = {
    success: true,
    message: 'Retícula eliminada correctamente',
    timestamp: new Date(),
  };

  res.status(HttpStatusCode.OK).json(response);
};

export const reticlesController = {
  createNewReticle,
  getAllReticles,
  getOneReticleById,
  updateOneReticleById,
  deleteOneReticleById,
};
