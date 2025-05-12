import { IEvento, IEventoCreate, IEventoUpdate } from './event.interface';

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