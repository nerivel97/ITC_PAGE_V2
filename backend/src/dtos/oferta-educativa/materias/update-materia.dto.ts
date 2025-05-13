import { z } from 'zod';
import { createSubjectSchema } from './create-materia.dto';

export const updateSubjectSchema = createSubjectSchema.partial();

export type UpdateSubjectDto = z.infer<typeof updateSubjectSchema>;
