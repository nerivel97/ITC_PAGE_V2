import { Request, Response } from 'express';
import { ICarreraController } from '../interfaces/controller.interface';
import { ICarreraService } from '../interfaces/service.interface';
import { ApiResponse } from '../interfaces/api.interface';
import { ApiError } from '../utils/apiError';
import { 
  ICarrera, 
  ICarreraCreate, 
  ICarreraUpdate 
} from '../interfaces/carrera.interface';

export class CarreraController implements ICarreraController {
  constructor(private carreraService: ICarreraService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const carreras = await this.carreraService.getAllCarreras();

      // Mapear solo los campos que quieres exponer
      const carrerasFiltradas = carreras.map(c => ({
        id: c.id,
        titulo: c.titulo,
        tipo: c.tipo,
        bgColor: c.bgColor,
        descripcion: c.descripcion
      }));

      const response: ApiResponse<typeof carrerasFiltradas> = {
        success: true,
        message: 'Carreras obtenidas correctamente',
        data: carrerasFiltradas,
        timestamp: new Date()
      };

      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener carreras');
    }
  }


  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const carrera = await this.carreraService.getCarreraById(id);
      
      if (!carrera) {
        throw new ApiError(404, 'Carrera no encontrada');
      }

      const response: ApiResponse<ICarrera> = {
        success: true,
        message: 'Carrera obtenida correctamente',
        data: carrera,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener carrera');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const carreraData = this.validateCarreraCreate(req.body);
      const nuevaCarrera = await this.carreraService.createCarrera(carreraData);
      
      const response: ApiResponse<ICarrera> = {
        success: true,
        message: 'Carrera creada correctamente',
        data: nuevaCarrera,
        timestamp: new Date()
      };
      
      res.status(201).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al crear carrera');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const carreraData = this.validateCarreraUpdate(req.body);
      const carreraActualizada = await this.carreraService.updateCarrera(id, carreraData);
      
      if (!carreraActualizada) {
        throw new ApiError(404, 'Carrera no encontrada');
      }

      const response: ApiResponse<ICarrera> = {
        success: true,
        message: 'Carrera actualizada correctamente',
        data: carreraActualizada,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al actualizar carrera');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      
      await this.carreraService.deleteCarrera(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'Carrera eliminada correctamente',
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al eliminar carrera');
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

  private validateCarreraCreate(data: unknown): ICarreraCreate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos de carrera inválidos');
    }

    const requiredFields: Array<keyof ICarreraCreate> = [
      'urlSlug',
      'titulo', 
      'tipo'
    ];

    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new ApiError(400, `El campo ${field} es requerido`);
      }
    }

    const carreraData = data as Record<string, any>;

    // Validar enum de tipo
    const tiposValidos = ['licenciatura', 'maestria', 'doctorado'];
    if (!tiposValidos.includes(carreraData.tipo)) {
      throw new ApiError(400, 'Tipo de carrera inválido');
    }

    // Validar longitud de campos
    if (carreraData.urlSlug.length > 100) {
      throw new ApiError(400, 'El urlSlug no puede exceder 100 caracteres');
    }

    if (carreraData.titulo.length > 100) {
      throw new ApiError(400, 'El título no puede exceder 100 caracteres');
    }

    return data as ICarreraCreate;
  }

  private validateCarreraUpdate(data: unknown): ICarreraUpdate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos de actualización inválidos');
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, 'Se requieren datos para actualizar');
    }

    const carreraData = data as Record<string, any>;

    if ('tipo' in carreraData) {
      const tiposValidos = ['licenciatura', 'maestria', 'doctorado'];
      if (!tiposValidos.includes(carreraData.tipo)) {
        throw new ApiError(400, 'Tipo de carrera inválido');
      }
    }

    if ('urlSlug' in carreraData && carreraData.urlSlug.length > 100) {
      throw new ApiError(400, 'El urlSlug no puede exceder 100 caracteres');
    }

    if ('titulo' in carreraData && carreraData.titulo.length > 100) {
      throw new ApiError(400, 'El título no puede exceder 100 caracteres');
    }

    return data as ICarreraUpdate;
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