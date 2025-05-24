import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '../interfaces/api.interface';
import { IEvento, IEventoCreate, IEventoUpdate } from '../interfaces/evento.interface';

const API_URL = 'http://localhost:8000/api/eventos/';

interface ServerError {
  message?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

interface ValidationError {
  field: string;
  message: string;
}

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

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

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ServerError>) => {
    if (error.response?.data?.errors) {
      const validationErrors = Object.entries(error.response.data.errors)
        .map(([field, messages]) => ({
          field,
          message: messages.join(', ')
        }));
      error.message = validationErrors.map(e => `${e.field}: ${e.message}`).join('\n');
    }
    return Promise.reject(error);
  }
);

const validateEventoData = (data: IEventoCreate): ValidationError[] => {
  const errors: ValidationError[] = [];
  const requiredFields: (keyof IEventoCreate)[] = [
    'nombre_evento', 'categoria', 'descripcion', 
    'fecha_inicio', 'fecha_final', 'estado'
  ];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push({
        field,
        message: 'Este campo es requerido'
      });
    }
  });

  if (data.fecha_final && data.fecha_inicio && 
      new Date(data.fecha_final) < new Date(data.fecha_inicio)) {
    errors.push({
      field: 'fecha_final',
      message: 'La fecha final no puede ser anterior a la fecha de inicio'
    });
  }

  if (data.nombre_evento && data.nombre_evento.length > 100) {
    errors.push({
      field: 'nombre_evento',
      message: 'No puede exceder los 100 caracteres'
    });
  }

  if (data.categoria && data.categoria.length > 50) {
    errors.push({
      field: 'categoria',
      message: 'No puede exceder los 50 caracteres'
    });
  }

  return errors;
};

const normalizeEventoData = (data: IEventoCreate): IEventoCreate => {
  return {
    ...data,
    nombre_evento: data.nombre_evento.trim(),
    categoria: data.categoria.trim(),
    descripcion: data.descripcion.trim(),
    estado: data.estado.trim(),
    imagen: data.imagen?.trim()
  };
};

export const fetchEventos = async (): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>('/');
    if (!data.data) throw new Error('La respuesta no contiene datos');
    
    return data.data.map(evento => ({
      ...evento,
      fecha_inicio: evento.fecha_inicio,
      fecha_final: evento.fecha_final
    }));
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[fetchEventos Error]', err.message);
    throw new Error(err.message || 'Error al obtener eventos');
  }
};

export const getEventoById = async (id: number): Promise<IEvento> => {
  try {
    const response = await apiClient.get<ApiResponse<IEvento>>(`/${id}`);

    if (!response.data.data) {
      throw new Error('Evento no encontrado');
    }

    return {
      ...response.data.data,
      fecha_inicio: new Date(response.data.data.fecha_inicio).toISOString(),
      fecha_final: new Date(response.data.data.fecha_final).toISOString()
    };
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error(`[getEventoById Error] ID: ${id}`, {
      message: err.message,
      response: err.response
    });

    throw new Error(err.response?.data?.message || err.message || `Error al obtener evento ${id}`);
  }
};


export const createEvento = async (eventoData: IEventoCreate): Promise<IEvento> => {
  const validationErrors = validateEventoData(eventoData);
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.map(e => `${e.field}: ${e.message}`).join('\n'));
  }

  const normalizedData = normalizeEventoData(eventoData);
  
  try {
    const response = await apiClient.post<ApiResponse<IEvento>>('/', normalizedData);
    if (!response.data?.data) throw new Error('Respuesta inválida del servidor');
    
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[createEvento Error]', err.message);
    throw new Error(err.message || 'Error al crear evento');
  }
};

export const updateEvento = async (id: number, eventoData: IEventoUpdate): Promise<IEvento> => {
  try {
    if (!eventoData.nombre_evento && !eventoData.categoria) {
      throw new Error('Se requiere al menos un campo para actualizar');
    }

    const response = await apiClient.put<ApiResponse<IEvento>>(`/${id}`, eventoData);

    if (!response.data?.data) throw new Error('Respuesta inválida del servidor');

    return {
      ...response.data.data,
      fecha_inicio: new Date(response.data.data.fecha_inicio).toISOString(),
      fecha_final: new Date(response.data.data.fecha_final).toISOString()
    };
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[updateEvento Error]', err.message, {
      response: err.response,
      inputData: eventoData
    });

    throw new Error(err.response?.data?.message || err.message || 'Error al actualizar evento');
  }
};


export const deleteEvento = async (id: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/${id}`);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || `Error ${response.status}: ${response.statusText}`);
    }

    console.log(`[DELETE] Evento ${id} eliminado exitosamente`);
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[deleteEvento Error]', {
      response: err.response,
      message: err.message
    });

    throw new Error(err.response?.data?.message || err.message || 'Error al eliminar evento');
  }
};


export const uploadEventImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await apiClient.post<ApiResponse<{ url: string }>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (!data.data?.url) throw new Error('No se recibió URL de la imagen');

    return data.data.url;
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[uploadEventImage Error]', err.message);

    throw new Error(err.response?.data?.message || err.message || 'Error al subir imagen');
  }
};


// Funciones adicionales
export const searchEventos = async (query: string): Promise<IEvento[]> => {
  try {
    const response = await apiClient.get<ApiResponse<IEvento[]>>(`/search?q=${encodeURIComponent(query)}`);
    return response.data.data || [];
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[searchEventos Error]', {
      message: err.message,
      query,
      response: err.response
    });

    throw new Error(err.response?.data?.message || err.message || 'Error al buscar eventos');
  }
};


export const getEventosByStatus = async (status: string): Promise<IEvento[]> => {
  try {
    const response = await apiClient.get<ApiResponse<IEvento[]>>(`/status/${encodeURIComponent(status)}`);
    return response.data.data || [];
  } catch (error) {
    const err = error as AxiosError<ServerError>;
    console.error('[getEventosByStatus Error]', {
      message: err.message,
      status,
      response: err.response
    });

    throw new Error(err.response?.data?.message || err.message || 'Error al obtener eventos por estado');
  }
};
