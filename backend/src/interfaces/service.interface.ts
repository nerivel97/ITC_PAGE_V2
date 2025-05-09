import { IEvento, IEventoCreate, IEventoUpdate } from './event.interface';

export interface IEventoService {
  getAllEventos(): Promise<IEvento[]>;
  getEventoById(id: number): Promise<IEvento | null>;
  createEvento(eventoData: IEventoCreate): Promise<IEvento>;
  updateEvento(id: number, eventoData: IEventoUpdate): Promise<IEvento | null>;
  deleteEvento(id: number): Promise<void>;
}