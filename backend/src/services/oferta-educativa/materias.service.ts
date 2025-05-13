import type {
  CreateSubjectDto,
  UpdateSubjectDto,
} from '../../dtos/oferta-educativa';
import { Subject } from '../../models/oferta-educativa';
import { SubjectRepository } from '../../repositories/oferta-educativa';
import { BadRequestError, NotFoundError } from '../../utils/http-errors';
import { reticlesService } from './reticulas.service';

const createNewSubject = async (
  createSubjectDto: CreateSubjectDto,
): Promise<Subject> => {
  const subjectExists = await SubjectRepository.findOneBy({
    code: createSubjectDto.code,
  });
  if (subjectExists !== null) throw new BadRequestError('La materia ya existe');

  const reticle = await reticlesService.getOneReticleById(
    createSubjectDto.reticleId,
  );

  const createdSubject = await SubjectRepository.save({
    ...createSubjectDto,
    reticle,
  });
  return createdSubject;
};

const getAllSubjects = async (): Promise<Subject[]> => {
  const subjects = await SubjectRepository.find();
  return subjects;
};

const getOneSubjectById = async (subjectId: number): Promise<Subject> => {
  const subject = await SubjectRepository.findOneBy({ id: subjectId });
  if (subject === null) throw new NotFoundError('Materia no encontrada');

  return subject;
};

const updateOneSubjectById = async (
  subjectId: number,
  updateSubjectDto: UpdateSubjectDto,
): Promise<Subject> => {
  const subject = await getOneSubjectById(subjectId);

  const subjectToUpdate = {
    ...subject,
    ...updateSubjectDto,
  };

  if (updateSubjectDto.reticleId) {
    const reticle = await reticlesService.getOneReticleById(
      updateSubjectDto.reticleId,
    );
    subjectToUpdate.reticle = reticle;
  }

  const updatedSubject = await SubjectRepository.save(subjectToUpdate);
  return updatedSubject;
};

const deleteOneSubjectById = async (subjectId: number): Promise<boolean> => {
  const subject = await getOneSubjectById(subjectId);

  const deletedSubject = await SubjectRepository.remove(subject);
  if (deletedSubject) return true;

  return false;
};

export const subjectsService = {
  createNewSubject,
  getAllSubjects,
  getOneSubjectById,
  updateOneSubjectById,
  deleteOneSubjectById,
};
