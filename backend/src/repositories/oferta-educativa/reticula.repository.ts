import AppDataSource from '../../config/database';
import { Reticle } from '../../models/oferta-educativa/Reticula';

export const ReticleRepository = AppDataSource.getRepository(Reticle);
