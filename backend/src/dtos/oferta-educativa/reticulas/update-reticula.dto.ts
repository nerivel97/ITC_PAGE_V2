import { z } from 'zod';
import { createReticleSchema } from './create-reticula.dto';

export const updateReticleSchema = createReticleSchema.partial();

export type UpdateReticleDto = z.infer<typeof updateReticleSchema>;
