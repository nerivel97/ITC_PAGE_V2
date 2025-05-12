import { Request, Response } from 'express';
import { INoticiaController } from '../interfaces/controller.interface';
import { INoticiaService } from '../interfaces/service.interface';
import { ApiResponse } from '../interfaces/api.interface';
import { ApiError } from '../utils/apiError';
import { INoticia, INoticiaCreate, INoticiaUpdate } from '../interfaces/noticia.interface';

export class NoticiasController implements INoticiaController {
  constructor(private noticiasService: INoticiaService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const noticias = await this.noticiasService.getAllNoticias();
      
      const response: ApiResponse<INoticia[]> = {
        success: true,
        message: 'Noticias obtenidas correctamente',
        data: noticias,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener noticias');
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const noticia = await this.noticiasService.getNoticiaById(id);
      
      if (!noticia) {
        throw new ApiError(404, 'Noticia no encontrada');
      }

      const response: ApiResponse<INoticia> = {
        success: true,
        message: 'noticia obtenida correctamente',
        data: noticia,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al obtener noticia');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const noticiaData = this.validatenoticiaCreate(req.body);
      const nuevonoticia = await this.noticiasService.createNoticia(noticiaData);
      
      const response: ApiResponse<INoticia> = {
        success: true,
        message: 'noticia creada correctamente',
        data: nuevonoticia,
        timestamp: new Date()
      };
      
      res.status(201).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al crear noticia');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      const noticiaData = this.validatenoticiaUpdate(req.body);
      const noticiaActualizado = await this.noticiasService.updateNoticia(id, noticiaData);
      
      if (!noticiaActualizado) {
        throw new ApiError(404, 'noticia no encontrado');
      }

      const response: ApiResponse<INoticia> = {
        success: true,
        message: 'noticia actualizado correctamente',
        data: noticiaActualizado,
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      this.handleError(res, error, 'Error al actualizar noticia');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = this.parseId(req.params.id);
      console.log(`Solicitud para eliminar noticia ID: ${id}`); // Log de depuración
      
      await this.noticiasService.deleteNoticia(id);
      
      const response: ApiResponse<null> = {
        success: true,
        message: 'noticia eliminado correctamente',
        timestamp: new Date()
      };
      
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error('Error en DELETE /noticias/:id', { 
        params: req.params,
        error 
      }); // Log detallado
      
      this.handleError(res, error, 'Error al eliminar noticia');
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

  private validatenoticiaCreate(data: unknown): INoticiaCreate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos de la noticia inválidos');
    }

    const requiredFields: Array<keyof INoticiaCreate> = [
      'nombre_noticia', 
      'descripcion', 
      'fecha_publicacion', 
      'autor'
    ];

    // Verificar campos requeridos
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new ApiError(400, `El campo ${field} es requerido`);
      }
    }

    const noticiaData = data as Record<string, any>;

    // Validar formato de fechas
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(noticiaData.fecha_publicacion)) {
      throw new ApiError(400, 'La fecha debe estar en formato YYYY-MM-DD');
    }

    // Validar longitud de campos
    if (noticiaData.nombre_noticia.length > 100) {
      throw new ApiError(400, 'El nombre de la noticia no puede exceder 100 caracteres');
    }

    if (noticiaData.autor.length > 20) {
      throw new ApiError(400, 'El nombre de autor no puede exceder 100 caracteres');
    }

    return data as INoticiaCreate;
  }

  private validatenoticiaUpdate(data: unknown): INoticiaUpdate {
    if (!data || typeof data !== 'object') {
      throw new ApiError(400, 'Datos de actualización inválidos');
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, 'Se requieren datos para actualizar');
    }

    const noticiaData = data as Record<string, any>;

    // Validaciones opcionales para campos actualizados
    if ('fecha_publicacion' in noticiaData) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      
      if ('fecha_publicacion' in noticiaData && !dateRegex.test(noticiaData.fecha_publicacion)) {
        throw new ApiError(400, 'Formato de fecha de publicacion inválido (YYYY-MM-DD)');
      }
    }

    if ('nombre_noticia' in noticiaData && noticiaData.nombre_noticia.length > 100) {
      throw new ApiError(400, 'El nombre del noticia no puede exceder 100 caracteres');
    }

    if ('autor' in noticiaData && noticiaData.estado.length > 100) {
      throw new ApiError(400, 'El nombre del autor no puede exceder 100 caracteres');
    }

    return data as INoticiaUpdate;
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