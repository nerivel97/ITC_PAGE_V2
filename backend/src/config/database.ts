import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../lib/env';
import { Evento, Noticia, Carrera, CampoLaboral, FuncionProfesional, MisionVisionObjetivo, PerfilAlumno} from '../models';
import { isDevelopment } from '../utils/env';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  timezone: 'Z',
  synchronize: isDevelopment(), // Cuidado: solo en desarrollo
  logging: env.DB_LOGGING, // Habilita logging para debug
  entities: [Evento, Noticia, Carrera, CampoLaboral, FuncionProfesional, MisionVisionObjetivo, PerfilAlumno],
  migrations: ['../migrations/**/*.ts'],
  subscribers: [],
});

export default AppDataSource;

/**
 * Conecta a la base de datos utilizando TypeORM.
 * @returns {Promise<void>} Promesa que se resuelve cuando la conexión se establece.
 * @throws {Error} Si ocurre un error al conectar a la base de datos.
 */
export const connectToDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:');
    throw error;
  }
};
