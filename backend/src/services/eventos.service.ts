import { AppDataSource } from "../config/database";

import { Evento } from "../models/Evento";
import { IEventoService } from "../interfaces/service.interface";
import { IEvento, IEventoCreate, IEventoUpdate } from "../interfaces/event.interface";

import { Noticia } from "../models/Noticia";
import { INoticiaService } from "../interfaces/service.interface";
import { INoticia, INoticiaCreate, INoticiaUpdate } from "../interfaces/noticia.interface";

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
      // Convertir fechas a formato de base de datos si es necesario
      const eventoToCreate = {
        ...eventoData,
        fecha_inicio: eventoData.fecha_inicio, // Ya debería estar en formato YYYY-MM-DD
        fecha_final: eventoData.fecha_final    // Ya debería estar en formato YYYY-MM-DD
      };
  
      const evento = this.eventoRepository.create(eventoToCreate);
      const savedEvento = await this.eventoRepository.save(evento);
      
      return savedEvento;
    } catch (error) {
      console.error('Error al crear evento:', error);
      if (error instanceof Error && error.message.includes('violates not-null constraint')) {
        throw new ApiError(400, 'Faltan campos requeridos');
      }
      throw new ApiError(400, 'Error al crear el evento: ' + (error instanceof Error ? error.message : 'Error desconocido'));
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
      console.log(`Intentando eliminar evento con ID: ${id}`);
      
      const result = await this.eventoRepository.delete(id);
      
      console.log(`Resultado de eliminación:`, result);
      
      if (result.affected === 0) {
        throw new ApiError(404, "Evento no encontrado");
      }
    } catch (error: unknown) {
      console.error('Error en deleteEvento:', error);
      
      // Solución: Verificar el tipo de error antes de acceder a sus propiedades
      if (error instanceof Error) {
        // Para errores de PostgreSQL
        if ('code' in error && error.code === '23503') {
          throw new ApiError(400, "No se puede eliminar el evento porque tiene registros relacionados");
        }
        
        // Para otros errores de tipo Error
        throw new ApiError(500, `Error al eliminar el evento: ${error.message}`);
      }
      
      // Si no es un Error estándar
      throw new ApiError(500, "Error desconocido al eliminar el evento");
    }
  }
}

//GET POST PUT DELETE DE

export class NoticiasService implements INoticiaService {
  private eventoRepository = AppDataSource.getRepository(Noticia);

  async getAllNoticias(): Promise<INoticia[]> {
    try {
      return await this.eventoRepository.find({ order: { fecha_publicacion: "ASC" } });
    } catch (error) {
      throw new ApiError(500, "Error al obtener las noticias");
    }
  }

  async getNoticiaById(id: number): Promise<INoticia | null> {
    try {
      return await this.eventoRepository.findOneBy({ id_noticia: id });
    } catch (error) {
      throw new ApiError(500, "Error al obtener la noticia");
    }
  }

  async createNoticia(noticiaData: INoticiaCreate): Promise<INoticia> {
    try {
      // Convertir fechas a formato de base de datos si es necesario
      const noticiaToCreate = {
        ...noticiaData,
        fecha_inicio: noticiaData.fecha_publicacion, // Ya debería estar en formato YYYY-MM-DD
      };
  
      const noticia = this.eventoRepository.create(noticiaToCreate);
      const savedNoticia = await this.eventoRepository.save(noticia);
      
      return savedNoticia;
    } catch (error) {
      console.error('Error al crear noticia:', error);
      if (error instanceof Error && error.message.includes('violates not-null constraint')) {
        throw new ApiError(400, 'Faltan campos requeridos');
      }
      throw new ApiError(400, 'Error al crear la noticia: ' + (error instanceof Error ? error.message : 'Error desconocido'));
    }
  }

  async updateNoticia(id: number, noticiaData: INoticiaUpdate): Promise<INoticia | null> {
    try {
      await this.eventoRepository.update(id, noticiaData);
      return await this.getNoticiaById(id);
    } catch (error) {
      throw new ApiError(400, "Error al actualizar la noticia");
    }
  }

  async deleteNoticia(id: number): Promise<void> {
    try {
      console.log(`Intentando eliminar noticia con ID: ${id}`);
      
      const result = await this.eventoRepository.delete(id);
      
      console.log(`Resultado de eliminación:`, result);
      
      if (result.affected === 0) {
        throw new ApiError(404, "Noticia no encontrada");
      }
    } catch (error: unknown) {
      console.error('Error en deleteNoticia:', error);
      
      // Solución: Verificar el tipo de error antes de acceder a sus propiedades
      if (error instanceof Error) {
        // Para errores de PostgreSQL
        if ('code' in error && error.code === '23503') {
          throw new ApiError(400, "No se puede eliminar la noticia porque tiene registros relacionados");
        }
        
        // Para otros errores de tipo Error
        throw new ApiError(500, `Error al eliminar la noticia: ${error.message}`);
      }
      
      // Si no es un Error estándar
      throw new ApiError(500, "Error desconocido al eliminar la noticia");
    }
  }
}