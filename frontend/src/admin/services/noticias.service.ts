// src/admin/services/Noticias.service.ts
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../interfaces/api.interface';
import { INoticia, INoticiaCreate, INoticiaUpdate } from '../interfaces/noticia.interface';

const API_URL = 'http://itc11.itcun.info/api/noticias';

interface ServerError {
  message?: string;
  code?: string;
  status?: number;
  data?: unknown;
}

interface NetworkError {
  message: string;
  code: 'NETWORK_ERROR';
  status: 0;
}

interface RequestError {
  message: string;
  code: 'REQUEST_ERROR';
  status: -1;
}

type ApiError = ServerError | NetworkError | RequestError;

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
    return Promise.reject({
      message: error.message || 'Error en la configuración de la solicitud',
      code: 'REQUEST_ERROR',
      status: -1
    } as RequestError);
  }
);

// Interceptor de respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    const errorDetails = {
      message: error.message,
      config: error.config,
      response: error.response?.data,
      status: error.response?.status
    };
    
    console.error('[Response Error]', errorDetails);
    
    if (error.response) {
      // Error con respuesta del servidor
      const serverError: ServerError = {
        message: (error.response.data as { message?: string })?.message || 'Error del servidor',
        status: error.response.status,
        data: error.response.data,
        code: (error.response.data as { code?: string })?.code || 'SERVER_ERROR'
      };
      return Promise.reject(serverError);
    } else if (error.request) {
      // Error sin respuesta del servidor
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        code: 'NETWORK_ERROR',
        status: 0
      } as NetworkError);
    } else {
      // Error en la configuración de la solicitud
      return Promise.reject({
        message: error.message || 'Error en la configuración de la solicitud',
        code: 'REQUEST_ERROR',
        status: -1
      } as RequestError);
    }
  }
);

export const fetchNoticias = async (): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>('/');
    
    if (!data.data) {
      throw new Error('La respuesta no contiene datos');
    }
    
    return data.data.map(noticia => ({
      ...noticia,
      fecha_publicacion: new Date(noticia.fecha_publicacion).toISOString(),
    }));
  } catch (error) {
    const err = error as ApiError;
    console.error('[fetchNoticias Error]', {
      message: err.message,
      code: err.code,
      status: err.status
    });
    throw new Error(err.message || 'Error al obtener Noticias');
  }
};

export const getNoticiaById = async (id: number): Promise<INoticia> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia>>(`/${id}`);
    
    if (!data.data) {
      throw new Error('Noticia no encontrada');
    }
    
    return {
      ...data.data,
      fecha_publicacion: new Date(data.data.fecha_publicacion).toISOString(),
    };
  } catch (error) {
    const err = error as ApiError;
    console.error(`[getNoticiaById Error] ID: ${id}`, {
      message: err.message,
      code: err.code,
      status: err.status
    });
    throw new Error(err.message || `Error al obtener Noticia ${id}`);
  }
};

export const createNoticia = async (noticiaData: INoticiaCreate): Promise<INoticia> => {
  try {
    const response = await apiClient.post<ApiResponse<INoticia>>('/', noticiaData, {
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data) => JSON.stringify(data)]
    });
    
    if (!response.data?.data) {
      throw new Error('Respuesta inválida del servidor');
    }

    return response.data.data;
  } catch (error) {
    const err = error as ApiError;
    const errorMessage = 'message' in err ? err.message : 
                        'Error al crear noticia';
    throw new Error(errorMessage);
  }
};

export const updateNoticia = async (id: number, noticiaData: INoticiaUpdate): Promise<INoticia> => {
  try {
    const response = await apiClient.put<ApiResponse<INoticia>>(`/${id}`, noticiaData, {
      headers: {
        'Content-Type': 'application/json'
      },
      transformRequest: [(data) => JSON.stringify(data)]
    });
    
    if (!response.data?.data) {
      throw new Error('No se recibieron datos de la noticia actualizada');
    }
    
    return response.data.data;
  } catch (error) {
    const err = error as ApiError;
    const errorMessage = 'message' in err ? err.message : 
                        `Error al actualizar noticia ${id}`;
    throw new Error(errorMessage);
  }
};

export const deleteNoticia = async (id: number): Promise<void> => {
  try {
    console.log(`[DELETE] Enviando solicitud para eliminar Noticia ID: ${id}`);
    const response = await apiClient.delete(`/${id}`);
    
    if (response.status >= 200 && response.status < 300) {
      console.log(`[DELETE] Noticia ${id} eliminada exitosamente`);
      return;
    }
    
    throw new Error(
      (response.data as { message?: string })?.message || 
      `Error ${response.status}: ${response.statusText}`
    );
  } catch (error) {
    const err = error as ApiError;
    console.error(`[DELETE] Error al eliminar Noticia ${id}:`, {
      error: 'data' in err ? err.data : err.message,
      status: 'status' in err ? err.status : undefined
    });
    
    const errorMessage = 'message' in err ? err.message : 
                        'Error desconocido al eliminar la Noticia';
    
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
  } catch (error) {
    const err = error as ApiError;
    console.error('[uploadNoticiaImage Error]', {
      message: err.message,
      code: err.code,
      status: err.status
    });
    throw new Error(err.message || 'Error al subir imagen');
  }
};

export const searchNoticias = async (query: string): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>(`/search?q=${encodeURIComponent(query)}`);
    return data.data || [];
  } catch (error) {
    const err = error as ApiError;
    console.error('[searchNoticias Error]', {
      message: err.message,
      query,
      code: err.code
    });
    throw new Error(err.message || 'Error al buscar Noticias');
  }
};

export const getNoticiasByStatus = async (status: string): Promise<INoticia[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<INoticia[]>>(`/status/${encodeURIComponent(status)}`);
    return data.data || [];
  } catch (error) {
    const err = error as ApiError;
    console.error('[getNoticiasByStatus Error]', {
      message: err.message,
      status,
      code: err.code
    });
    throw new Error(err.message || 'Error al obtener Noticias por estado');
  }
};