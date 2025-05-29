import dotenv from 'dotenv';
dotenv.config();

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  APP_ORIGIN: z.string().url(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_DATABASE: z.string(),
  DB_LOGGING: z
    .union([z.literal('true'), z.literal('false')])
    .transform((val) => val === 'true')
    .default('true'),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
