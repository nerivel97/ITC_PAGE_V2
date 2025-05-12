import { z } from 'zod';

export const createCareerSchema = z.object({
  code: z
    .string()
    .min(1, { message: 'La clave es requerida' })
    .max(20, { message: 'La clave no puede exceder 20 caracteres' }),
  name: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  introduction: z.string().nullable().optional(),
  mision: z.string().nullable().optional(),
  vision: z.string().nullable().optional(),
  objectives: z.string().nullable().optional(),
  certificate: z.string().nullable().optional(),
  entryProfile: z.string().nullable().optional(),
  graduateProfile: z.string().nullable().optional(),
  imageUrl: z
    .string()
    .url({ message: 'La URL de la imagen debe ser una URL válida' })
    .nullable()
    .optional(),
});

export type CreateCareerDto = z.infer<typeof createCareerSchema>;
