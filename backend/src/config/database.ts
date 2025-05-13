import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../lib/env';
import { isDevelopment } from '../utils/env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: isDevelopment(), // Cuidado: solo en desarrollo
  logging: env.DB_LOGGING, // Habilita logging para debug
  entities: ['../models/**/*.ts'],
  migrations: [],
  subscribers: [],
});
