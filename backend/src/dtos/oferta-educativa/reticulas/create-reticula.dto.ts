import { z } from 'zod';

export const createReticleSchema = z.object({
  description: z.string().nullable().optional(),
  imageUrl: z
    .string()
    .url({ message: 'La URL de la imagen debe ser una URL válida' })
    .nullable()
    .optional(),
  careerId: z.number(),
});

export type CreateReticleDto = z.infer<typeof createReticleSchema>;
