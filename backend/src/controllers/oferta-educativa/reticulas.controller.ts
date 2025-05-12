import type { Request, Response } from 'express';
import { HttpStatusCode } from '../../constants/http-status-codes';
import {
  createReticleSchema,
  updateReticleSchema,
} from '../../dtos/oferta-educativa';
import { reticlesService } from '../../services/oferta-educativa';

const createNewReticle = async (req: Request, res: Response) => {
  const createReticleDto = createReticleSchema.parse(req.body);
  const createdReticle = await reticlesService.createNewReticle(
    createReticleDto,
  );

  res.status(HttpStatusCode.CREATED).json({
    status: 'success',
    data: createdReticle,
  });
};

const getAllReticles = async (_req: Request, res: Response) => {
  const reticles = await reticlesService.getAllReticles();

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: reticles,
  });
};

const getOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);
  const reticle = await reticlesService.getOneReticleById(reticleId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: reticle,
  });
};

const updateOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);

  const updateReticleDto = updateReticleSchema.parse(req.body);
  const updatedReticle = await reticlesService.updateOneReticleById(
    reticleId,
    updateReticleDto,
  );

  res.status(HttpStatusCode.OK).json({
    status: 'success',
    data: updatedReticle,
  });
};

const deleteOneReticleById = async (req: Request, res: Response) => {
  const reticleId = Number(req.params.reticleId);
  await reticlesService.deleteOneReticleById(reticleId);

  res.status(HttpStatusCode.OK).json({
    status: 'success',
  });
};

export const reticlesController = {
  createNewReticle,
  getAllReticles,
  getOneReticleById,
  updateOneReticleById,
  deleteOneReticleById,
};
