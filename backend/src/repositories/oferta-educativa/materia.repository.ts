import AppDataSource from '../../config/database';
import { Subject } from '../../models/oferta-educativa/Materia';

export const SubjectRepository = AppDataSource.getRepository(Subject);
