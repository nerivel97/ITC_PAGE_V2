import type {
  CreateReticleDto,
  UpdateReticleDto,
} from '../../dtos/oferta-educativa';
import { Reticle } from '../../models/oferta-educativa';
import { ReticleRepository } from '../../repositories/oferta-educativa';
import { NotFoundError } from '../../utils/http-errors';
import { careersService } from './carreras.service';

const createNewReticle = async (
  createReticleDto: CreateReticleDto,
): Promise<Reticle> => {
  const career = await careersService.getOneCareerById(
    createReticleDto.careerId,
  );

  const createdReticle = await ReticleRepository.save({
    ...createReticleDto,
    career,
  });
  return createdReticle;
};

const getAllReticles = async (): Promise<Reticle[]> => {
  const reticles = await ReticleRepository.find();
  return reticles;
};

const getOneReticleById = async (reticleId: number): Promise<Reticle> => {
  const reticle = await ReticleRepository.findOneBy({ id: reticleId });
  if (reticle === null) throw new NotFoundError('Retícula no encontrada');

  return reticle;
};

const updateOneReticleById = async (
  reticleId: number,
  updateReticleDto: UpdateReticleDto,
): Promise<Reticle> => {
  const reticle = await getOneReticleById(reticleId);

  const reticleToUpdate = {
    ...reticle,
    ...updateReticleDto,
  };

  if (updateReticleDto.careerId) {
    const career = await careersService.getOneCareerById(
      updateReticleDto.careerId,
    );
    reticleToUpdate.career = career;
  }

  const updatedReticle = await ReticleRepository.save(reticleToUpdate);
  return updatedReticle;
};

const deleteOneReticleById = async (reticleId: number): Promise<boolean> => {
  const reticle = await getOneReticleById(reticleId);

  const deletedReticle = await ReticleRepository.remove(reticle);
  if (deletedReticle) return true;

  return false;
};

export const reticlesService = {
  createNewReticle,
  getAllReticles,
  getOneReticleById,
  updateOneReticleById,
  deleteOneReticleById,
};
