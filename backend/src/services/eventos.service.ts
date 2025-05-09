import { AppDataSource } from "../config/database";
import { Evento } from "../models/Evento";
import { IEventoService } from "../interfaces/service.interface";
import { IEvento, IEventoCreate, IEventoUpdate } from "../interfaces/event.interface";
import { ApiError } from "../utils/apiError";

export class EventosService implements IEventoService {
  private eventoRepository = AppDataSource.getRepository(Evento);

  async getAllEventos(): Promise<IEvento[]> {
    try {
      return await this.eventoRepository.find({ order: { fecha_inicio: "ASC" } });
    } catch (error) {
      throw new ApiError(500, "Error al obtener los eventos");
    }
  }

  async getEventoById(id: number): Promise<IEvento | null> {
    try {
      return await this.eventoRepository.findOneBy({ id_evento: id });
    } catch (error) {
      throw new ApiError(500, "Error al obtener el evento");
    }
  }

  async createEvento(eventoData: IEventoCreate): Promise<IEvento> {
    try {
      const evento = this.eventoRepository.create(eventoData);
      return await this.eventoRepository.save(evento);
    } catch (error) {
      throw new ApiError(400, "Error al crear el evento");
    }
  }

  async updateEvento(id: number, eventoData: IEventoUpdate): Promise<IEvento | null> {
    try {
      await this.eventoRepository.update(id, eventoData);
      return await this.getEventoById(id);
    } catch (error) {
      throw new ApiError(400, "Error al actualizar el evento");
    }
  }

  async deleteEvento(id: number): Promise<void> {
    try {
      const result = await this.eventoRepository.delete(id);
      if (result.affected === 0) {
        throw new ApiError(404, "Evento no encontrado");
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, "Error al eliminar el evento");
    }
  }
}