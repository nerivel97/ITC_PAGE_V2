import { z } from 'zod';
import { createCareerSchema } from './create-carrera.dto';

export const updateCareerSchema = createCareerSchema.partial();

export type UpdateCareerDto = z.infer<typeof updateCareerSchema>;
