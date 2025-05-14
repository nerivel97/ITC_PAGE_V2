import AppDataSource from '../../config/database';
import { Career } from '../../models/oferta-educativa/Carrera';

export const CareerRepository = AppDataSource.getRepository(Career);
