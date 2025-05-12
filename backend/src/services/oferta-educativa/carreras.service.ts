import type {
  CreateCareerDto,
  UpdateCareerDto,
} from '../../dtos/oferta-educativa';
import { Career } from '../../models/oferta-educativa';
import { CareerRepository } from '../../repositories/oferta-educativa';
import { BadRequestError, NotFoundError } from '../../utils/http-errors';

const createNewCareer = async (
  createCareerDto: CreateCareerDto,
): Promise<Career> => {
  const careerExists = await CareerRepository.findOneBy({
    code: createCareerDto.code,
  });
  if (careerExists !== null) throw new BadRequestError('La carrera ya existe');

  const createdCareer = await CareerRepository.save(createCareerDto);
  return createdCareer;
};

const getAllCareers = async (): Promise<Career[]> => {
  const careers = await CareerRepository.find();
  return careers;
};

const getOneCareerById = async (careerId: number): Promise<Career> => {
  const career = await CareerRepository.findOneBy({ id: careerId });
  if (career === null) throw new NotFoundError('Carrera no encontrada');

  return career;
};

const updateOneCareerById = async (
  careerId: number,
  updateCareerDto: UpdateCareerDto,
): Promise<Career> => {
  const career = await getOneCareerById(careerId);

  const updatedCareer = await CareerRepository.save({
    ...career,
    ...updateCareerDto,
  });
  return updatedCareer;
};

const deleteOneCareerById = async (careerId: number): Promise<boolean> => {
  const career = await getOneCareerById(careerId);

  const deletedCareer = await CareerRepository.remove(career);
  if (deletedCareer) return true;

  return false;
};

export const careersService = {
  createNewCareer,
  getAllCareers,
  getOneCareerById,
  updateOneCareerById,
  deleteOneCareerById,
};
