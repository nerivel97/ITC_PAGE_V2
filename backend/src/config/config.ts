import dotenv from 'dotenv';

dotenv.config();

export const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  PORT,
  JWT_SECRET
} = process.env as {
  [key: string]: string;
};