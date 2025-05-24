// src/admin/services/eventos.service.ts
import axios from 'axios';
import { ApiResponse } from '../interfaces/api.interface';
import { IEvento, IEventoCreate, IEventoUpdate } from '../interfaces/evento.interface';

const API_URL = 'http://localhost:8000/api/eventos/';

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
  (response) => response,
  (error) => {
    const errorData = error.response?.data || {};
    const errorMessage = errorData.message || error.message;
    
    if (errorData.errors) {
      // Manejo de errores de validación del backend
      const validationErrors = Object.values(errorData.errors).flat();
      error.message = validationErrors.join('\n');
    }
    
    return Promise.reject(error);
  }
);

/**
 * Valida los datos del evento antes de enviarlos al servidor
 */
const validateEventoData = (data: IEventoCreate): void => {
  const requiredFields: (keyof IEventoCreate)[] = [
    'nombre_evento',
    'categoria',
    'descripcion',
    'fecha_inicio',
    'fecha_final',
    'estado'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }

  // Validación de fechas
  if (new Date(data.fecha_final) < new Date(data.fecha_inicio)) {
    throw new Error('La fecha final no puede ser anterior a la fecha de inicio');
  }

  // Validación de longitud de campos
  if (data.nombre_evento.length > 100) {
    throw new Error('El nombre del evento no puede exceder los 100 caracteres');
  }

  if (data.categoria.length > 50) {
    throw new Error('La categoría no puede exceder los 50 caracteres');
  }
};

/**
 * Normaliza los datos del evento para el envío al servidor
 */
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
    
    if (!data.data) {
      throw new Error('La respuesta no contiene datos');
    }
    
    return data.data.map(evento => ({
      ...evento,
      fecha_inicio: new Date(evento.fecha_inicio).toISOString(),
      fecha_final: new Date(evento.fecha_final).toISOString()
    }));
  } catch (error: any) {
    console.error('[fetchEventos Error]', {
      message: error.message,
      code: error.code,
      status: error.status
    });
    throw new Error(error.message || 'Error al obtener eventos');
  }
};

export const getEventoById = async (id: number): Promise<IEvento> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento>>(`/${id}`);
    
    if (!data.data) {
      throw new Error('Evento no encontrado');
    }
    
    return {
      ...data.data,
      fecha_inicio: new Date(data.data.fecha_inicio).toISOString(),
      fecha_final: new Date(data.data.fecha_final).toISOString()
    };
  } catch (error: any) {
    console.error(`[getEventoById Error] ID: ${id}`, {
      message: error.message,
      code: error.code,
      status: error.status
    });
    throw new Error(error.message || `Error al obtener evento ${id}`);
  }
};

export const createEvento = async (eventoData: IEventoCreate): Promise<IEvento> => {
  try {
    // 1. Validación
    validateEventoData(eventoData);
    
    // 2. Normalización
    const normalizedData = normalizeEventoData(eventoData);
    
    console.log('[createEvento] Datos normalizados:', normalizedData);

    // 3. Envío al servidor
    const response = await apiClient.post<ApiResponse<IEvento>>('/', normalizedData);
    
    if (!response.data?.data) {
      throw new Error('Respuesta inválida del servidor');
    }

    return {
      ...response.data.data,
      fecha_inicio: new Date(response.data.data.fecha_inicio).toISOString(),
      fecha_final: new Date(response.data.data.fecha_final).toISOString()
    };
  } catch (error: any) {
    console.error('[createEvento Error]', {
      message: error.message,
      code: error.code,
      status: error.status,
      inputData: eventoData,
      stack: error.stack
    });
    
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Error al crear evento'
    );
  }
};

export const updateEvento = async (id: number, eventoData: IEventoUpdate): Promise<IEvento> => {
  try {
    console.log(`[updateEvento] Actualizando evento ${id}`, eventoData);
    
    // Validación mínima para actualización
    if (!eventoData.nombre_evento && !eventoData.categoria) {
      throw new Error('Se requiere al menos un campo para actualizar');
    }

    const { data } = await apiClient.put<ApiResponse<IEvento>>(`/${id}`, eventoData);
    
    if (!data.data) {
      throw new Error('No se recibieron datos del evento actualizado');
    }
    
    return {
      ...data.data,
      fecha_inicio: new Date(data.data.fecha_inicio).toISOString(),
      fecha_final: new Date(data.data.fecha_final).toISOString()
    };
  } catch (error: any) {
    console.error(`[updateEvento Error] ID: ${id}`, {
      message: error.message,
      code: error.code,
      status: error.status,
      inputData: eventoData
    });
    throw new Error(error.message || `Error al actualizar evento ${id}`);
  }
};

export const deleteEvento = async (id: number): Promise<void> => {
  try {
    console.log(`[DELETE] Enviando solicitud para eliminar evento ID: ${id}`);
    const response = await apiClient.delete(`/${id}`);
    
    // Verificar tanto 200 (OK) como 204 (No Content) como respuestas exitosas
    if (response.status >= 200 && response.status < 300) {
      console.log(`[DELETE] Evento ${id} eliminado exitosamente`);
      return;
    }
    
    // Si la respuesta no es exitosa
    throw new Error(
      response.data?.message || 
      `Error ${response.status}: ${response.statusText}`
    );
  } catch (error: any) {
    console.error(`[DELETE] Error al eliminar evento ${id}:`, {
      error: error.response?.data || error.message,
      status: error.response?.status
    });
    
    // Mejorar el mensaje de error para el usuario
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Error desconocido al eliminar el evento';
    
    throw new Error(errorMessage);
  }
};

export const uploadEventImage = async (file: File): Promise<string> => {
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
export const searchEventos = async (query: string): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>(`/search?q=${encodeURIComponent(query)}`);
    return data.data || [];
  } catch (error: any) {
    console.error('[searchEventos Error]', {
      message: error.message,
      query,
      code: error.code
    });
    throw new Error(error.message || 'Error al buscar eventos');
  }
};

export const getEventosByStatus = async (status: string): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>(`/status/${encodeURIComponent(status)}`);
    return data.data || [];
  } catch (error: any) {
    console.error('[getEventosByStatus Error]', {
      message: error.message,
      status,
      code: error.code
    });
    throw new Error(error.message || 'Error al obtener eventos por estado');
  }
};