// src/admin/services/Noticias.service.ts
import axios from 'axios';
import { ApiResponse } from '../interfaces/api.interface';
import { INoticia, INoticiaCreate, INoticiaUpdate } from '../interfaces/noticia.interface';

const API_URL = 'http://localhost:8000/api/noticias';

// Configuración global de axios con interceptores
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor de solicitudes
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, {
      data: config.data,
      params: config.params
    });
    return config;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    const errorDetails = {
      message: error.message,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status
    };
    
    console.error('[Response Error]', errorDetails);
    
    if (error.response) {
      // Error con respuesta del servidor
      const serverError = {
        message: error.response.data?.message || 'Error del servidor',
        status: error.response.status,
        data: error.response.data,
        code: error.response.data?.code || 'SERVER_ERROR'
      };
      return Promise.reject(serverError);
    } else if (error.request) {
      // Error sin respuesta del servidor
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        code: 'NETWORK_ERROR',
        status: 0
      });
    } else {
      // Error en la configuración de la solicitud
      return Promise.reject({
        message: error.message || 'Error en la configuración de la solicitud',
        code: 'REQUEST_ERROR',
        status: -1
      });
    }
  }
);

/**
 * Valida los datos del Noticia antes de enviarlos al servidor
 */
const validateNoticiaData = (data: INoticiaCreate): void => {
  const requiredFields: (keyof INoticiaCreate)[] = [
    'nombre_noticia',
    'descripcion',
    'fecha_publicacion',
    'autor'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }

  // Validación de longitud de campos
  if (data.nombre_noticia.length > 100) {
    throw new Error('El nombre del Noticia no puede exceder los 100 caracteres');
  }

  if (data.autor.length > 100) {
    throw new Error('El nombre del autor no puede exceder los 100 caracteres');
  }
};

/**
 * Normaliza los datos del Noticia para el envío al servidor
 */
const normalizeNoticiaData = (data: INoticiaCreate): INoticiaCreate => {
  return {
    ...data,
    nombre_noticia: data.nombre_noticia.trim(),
    descripcion: data.descripcion.trim(),
    autor: data.autor.trim(),
    imagen: data.imagen?.trim()
  };
};

export const fetchNoticias = async (): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>('/');
    
    if (!data.data) {
      throw new Error('La respuesta no contiene datos');
    }
    
    return data.data.map(Noticia => ({
      ...Noticia,
      fecha_publicacion: new Date(Noticia.fecha_publicacion).toISOString(),
    }));
  } catch (error: any) {
    console.error('[fetchNoticias Error]', {
      message: error.message,
      code: error.code,
      status: error.status
    });
    throw new Error(error.message || 'Error al obtener Noticias');
  }
};

export const getNoticiaById = async (id: number): Promise<INoticia> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia>>(`/${id}`);
    
    if (!data.data) {
      throw new Error('Noticia no encontrado');
    }
    
    return {
      ...data.data,
      fecha_publicacion: new Date(data.data.fecha_publicacion).toISOString(),
    };
  } catch (error: any) {
    console.error(`[getNoticiaById Error] ID: ${id}`, {
      message: error.message,
      code: error.code,
      status: error.status
    });
    throw new Error(error.message || `Error al obtener Noticia ${id}`);
  }
};

export const createNoticia = async (NoticiaData: INoticiaCreate): Promise<INoticia> => {
  try {
    const response = await apiClient.post<ApiResponse<INoticia>>('/', NoticiaData, {
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data) => JSON.stringify(data)] // Asegurar serialización correcta
    });
    
    if (!response.data?.data) {
      throw new Error('Respuesta inválida del servidor');
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error al crear noticia';
    throw new Error(errorMessage);
  }
};

export const updateNoticia = async (id: number, NoticiaData: INoticiaUpdate): Promise<INoticia> => {
  try {
    const response = await apiClient.put<ApiResponse<INoticia>>(`/${id}`, NoticiaData, {
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data) => JSON.stringify(data)]
    });
    
    if (!response.data?.data) {
      throw new Error('No se recibieron datos de la noticia actualizada');
    }
    
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        `Error al actualizar noticia ${id}`;
    throw new Error(errorMessage);
  }
};

export const deleteNoticia = async (id: number): Promise<void> => {
  try {
    console.log(`[DELETE] Enviando solicitud para eliminar Noticia ID: ${id}`);
    const response = await apiClient.delete(`/${id}`);
    
    // Verificar tanto 200 (OK) como 204 (No Content) como respuestas exitosas
    if (response.status >= 200 && response.status < 300) {
      console.log(`[DELETE] Noticia ${id} eliminado exitosamente`);
      return;
    }
    
    // Si la respuesta no es exitosa
    throw new Error(
      response.data?.message || 
      `Error ${response.status}: ${response.statusText}`
    );
  } catch (error: any) {
    console.error(`[DELETE] Error al eliminar Noticia ${id}:`, {
      error: error.response?.data || error.message,
      status: error.response?.status
    });
    
    // Mejorar el mensaje de error para el usuario
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error desconocido al eliminar el Noticia';
    
    throw new Error(errorMessage);
  }
};

export const uploadNoticiaImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const { data } = await apiClient.post<ApiResponse<{ url: string }>>(
      '/upload', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    if (!data.data?.url) {
      throw new Error('No se recibió URL de la imagen');
    }
    
    return data.data.url;
  } catch (error: any) {
    console.error('[uploadEventImage Error]', {
      message: error.message,
      code: error.code,
      status: error.status
    });
    throw new Error(error.message || 'Error al subir imagen');
  }
};

// Funciones adicionales
export const searchNoticias = async (query: string): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>(`/search?q=${encodeURIComponent(query)}`);
    return data.data || [];
  } catch (error: any) {
    console.error('[searchNoticias Error]', {
      message: error.message,
      query,
      code: error.code
    });
    throw new Error(error.message || 'Error al buscar Noticias');
  }
};

export const getNoticiasByStatus = async (status: string): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>(`/status/${encodeURIComponent(status)}`);
    return data.data || [];
  } catch (error: any) {
    console.error('[getNoticiasByStatus Error]', {
      message: error.message,
      status,
      code: error.code
    });
    throw new Error(error.message || 'Error al obtener Noticias por estado');
  }
};