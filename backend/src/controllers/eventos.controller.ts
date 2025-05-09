import { Request, Response } from 'express';
import { IEventoController } from '../interfaces/controller.interface';
import { IEventoService } from '../interfaces/service.interface';
import { ApiResponse } from '../interfaces/api.interface';
import { ApiError } from '../utils/apiError';
import { IEvento, IEventoCreate, IEventoUpdate } from '../interfaces/event.interface';

export class EventosController implements IEventoController {
  constructor(private eventosService: IEventoService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const eventos = await this.eventosService.getAllEventos();
      
      const response: ApiResponse<IEvento[]> = {
        success: true,
        message: 'Eventos obtenidos correctamente',
        data: eventos,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener eventos');
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const evento = await this.eventosService.getEventoById(id);
      
      if (!evento) {
        throw new ApiError(404, 'Evento no encontrado');
      }

      const response: ApiResponse<IEvento> = {
        success: true,
        message: 'Evento obtenido correctamente',
        data: evento,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener evento');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const eventoData = this.validateEventoCreate(req.body);
      const nuevoEvento = await this.eventosService.createEvento(eventoData);
      
      const response: ApiResponse<IEvento> = {
        success: true,
        message: 'Evento creado correctamente',
        data: nuevoEvento,
        timestamp: new Date()
      };
      
      res.status(201).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al crear evento');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const eventoData = this.validateEventoUpdate(req.body);
      const eventoActualizado = await this.eventosService.updateEvento(id, eventoData);
      
      if (!eventoActualizado) {
        throw new ApiError(404, 'Evento no encontrado');
      }

      const response: ApiResponse<IEvento> = {
        success: true,
        message: 'Evento actualizado correctamente',
        data: eventoActualizado,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al actualizar evento');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      await this.eventosService.deleteEvento(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Evento eliminado correctamente',
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al eliminar evento');
    }
  }

  // Métodos auxiliares privados
  private parseId(id: string): number {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new ApiError(400, 'ID debe ser un número válido');
    }
    return parsedId;
  }

  private validateEventoCreate(data: unknown): IEventoCreate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos del evento inválidos');
    }

    const requiredFields: Array<keyof IEventoCreate> = [
      'nombre_evento',
      'categoria', 
      'descripcion', 
      'fecha_inicio', 
      'fecha_final', 
      'estado'
    ];

    // Verificar campos requeridos
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new ApiError(400, `El campo ${field} es requerido`);
      }
    }

    const eventoData = data as Record<string, any>;

    // Validar formato de fechas
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(eventoData.fecha_inicio) || !dateRegex.test(eventoData.fecha_final)) {
      throw new ApiError(400, 'Las fechas deben estar en formato YYYY-MM-DD');
    }

    // Validar que fecha final no sea anterior a fecha inicio
    if (new Date(eventoData.fecha_final) < new Date(eventoData.fecha_inicio)) {
      throw new ApiError(400, 'La fecha final no puede ser anterior a la fecha de inicio');
    }

    // Validar longitud de campos
    if (eventoData.nombre_evento.length > 100) {
      throw new ApiError(400, 'El nombre del evento no puede exceder 100 caracteres');
    }

    if (eventoData.categoria.length > 50) {
      throw new ApiError(400, 'La categoría no puede exceder 50 caracteres');
    }

    if (eventoData.estado.length > 20) {
      throw new ApiError(400, 'El estado no puede exceder 20 caracteres');
    }

    return data as IEventoCreate;
  }

  private validateEventoUpdate(data: unknown): IEventoUpdate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos de actualización inválidos');
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, 'Se requieren datos para actualizar');
    }

    const eventoData = data as Record<string, any>;

    // Validaciones opcionales para campos actualizados
    if ('fecha_inicio' in eventoData || 'fecha_final' in eventoData) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      
      if ('fecha_inicio' in eventoData && !dateRegex.test(eventoData.fecha_inicio)) {
        throw new ApiError(400, 'Formato de fecha inicio inválido (YYYY-MM-DD)');
      }

      if ('fecha_final' in eventoData && !dateRegex.test(eventoData.fecha_final)) {
        throw new ApiError(400, 'Formato de fecha final inválido (YYYY-MM-DD)');
      }

      // Comparar fechas si ambas están presentes
      if ('fecha_inicio' in eventoData && 'fecha_final' in eventoData) {
        if (new Date(eventoData.fecha_final) < new Date(eventoData.fecha_inicio)) {
          throw new ApiError(400, 'La fecha final no puede ser anterior a la fecha de inicio');
        }
      }
    }

    if ('nombre_evento' in eventoData && eventoData.nombre_evento.length > 100) {
      throw new ApiError(400, 'El nombre del evento no puede exceder 100 caracteres');
    }

    if ('categoria' in eventoData && eventoData.categoria.length > 50) {
      throw new ApiError(400, 'La categoría no puede exceder 50 caracteres');
    }

    if ('estado' in eventoData && eventoData.estado.length > 20) {
      throw new ApiError(400, 'El estado no puede exceder 20 caracteres');
    }

    return data as IEventoUpdate;
  }

  private handleError(res: Response, error: unknown, contextMessage: string): void {
    console.error(`${contextMessage}:`, error);

    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errorType: 'API_ERROR',
        timestamp: new Date()
      });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
        errorType: 'STANDARD_ERROR',
        timestamp: new Date()
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      errorType: 'UNKNOWN_ERROR',
      timestamp: new Date()
    });
  }
}