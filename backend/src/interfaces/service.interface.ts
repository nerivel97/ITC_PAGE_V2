import { IEvento, IEventoCreate, IEventoUpdate } from './event.interface';
import { ICarrera, ICarreraCreate, ICarreraUpdate } from './carrera.interface';

export interface IEventoService {
  getAllEventos(): Promise<IEvento[]>;
  getEventoById(id: number): Promise<IEvento | null>;
  createEvento(eventoData: IEventoCreate): Promise<IEvento>;
  updateEvento(id: number, eventoData: IEventoUpdate): Promise<IEvento | null>;
  deleteEvento(id: number): Promise<void>;
}

import { INoticia, INoticiaCreate, INoticiaUpdate } from './noticia.interface';

export interface INoticiaService {
  getAllNoticias(): Promise<INoticia[]>;
  getNoticiaById(id: number): Promise<INoticia | null>;
  createNoticia(eventoData: INoticiaCreate): Promise<INoticia>;
  updateNoticia(id: number, eventoData: INoticiaUpdate): Promise<INoticia | null>;
  deleteNoticia(id: number): Promise<void>;
}

export interface ICarreraService {
  getAllCarreras(): Promise<ICarrera[]>;
  getCarreraById(id: number): Promise<ICarrera | null>;
  createCarrera(carreraData: ICarreraCreate): Promise<ICarrera>;
  updateCarrera(id: number, carreraData: ICarreraUpdate): Promise<ICarrera | null>;
  deleteCarrera(id: number): Promise<void>;
}