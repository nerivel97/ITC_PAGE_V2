import { z } from 'zod';

export const createSubjectSchema = z.object({
  code: z
    .string()
    .min(1, { message: 'La clave es requerida' })
    .max(20, { message: 'La clave no puede exceder 20 caracteres' }),
  name: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  totalCredits: z
    .number()
    .min(0, { message: 'Los créditos totales deben ser mayor o igual a 0' }),
  credits: z
    .number()
    .min(0, { message: 'Los créditos deben ser mayor o igual a 0' }),
  syllabusUrl: z
    .string()
    .url({ message: 'La URL del temario debe ser una URL válida' })
    .nullable()
    .optional(),
  isSpecialty: z.boolean().default(false),
  specialtyName: z.string().nullable().optional(),
  isGenericStructure: z.boolean().default(false),
  isProfessionalResidency: z.boolean().default(false),
  isSocialService: z.boolean().default(false),
  isComplementaryActivities: z.boolean().default(false),
  reticleId: z.number(),
});

export type CreateSubjectDto = z.infer<typeof createSubjectSchema>;
