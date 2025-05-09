import "reflect-metadata";
import { DataSource } from "typeorm";
import { Evento } from "../models/Evento"; // Asegúrate de que la ruta sea correcta

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // Cuidado: solo en desarrollo
  logging: true, // Habilita logging para debug
  entities: [Evento],
  migrations: [],
  subscribers: [],
});