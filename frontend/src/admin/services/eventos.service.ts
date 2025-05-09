// src/admin/services/eventos.service.ts
import axios from 'axios';
import { ApiResponse } from '../interfaces/api.interface';
import { IEvento, IEventoCreate, IEventoUpdate } from '../interfaces/evento.interface';

const API_URL = 'http://localhost:4000/api/eventos';

// Configuración global de axios
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejo centralizado de errores
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && !response.data.success) {
      return Promise.reject({
        message: response.data.message || 'Error en la solicitud',
        status: response.status,
        data: response.data
      });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      const errorData = {
        message: error.response.data?.message || 'Error del servidor',
        status: error.response.status,
        data: error.response.data
      };
      return Promise.reject(errorData);
    } else if (error.request) {
      // Error sin respuesta del servidor
      return Promise.reject({
        message: 'No se recibió respuesta del servidor',
        status: 0
      });
    } else {
      // Error en la configuración de la solicitud
      return Promise.reject({
        message: error.message || 'Error en la configuración de la solicitud',
        status: -1
      });
    }
  }
);

// Función para validar campos requeridos
const validateEventoData = (eventoData: IEventoCreate): void => {
  const requiredFields: (keyof IEventoCreate)[] = [
    'nombre_evento',
    'categoria',
    'descripcion',
    'fecha_inicio',
    'fecha_final'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = eventoData[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
  }

  // Validación adicional para fechas
  if (new Date(eventoData.fecha_final) < new Date(eventoData.fecha_inicio)) {
    throw new Error('La fecha final no puede ser anterior a la fecha de inicio');
  }
};

export const fetchEventos = async (): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>('/');
    console.log('Respuesta completa:', data); // Para depuración
    
    if (!data.data) {
      throw new Error('La respuesta no contiene datos');
    }
    
    // Transforma las fechas si es necesario
    return data.data.map(evento => ({
      ...evento,
      fecha_inicio: new Date(evento.fecha_inicio).toISOString(),
      fecha_final: new Date(evento.fecha_final).toISOString()
    }));
  } catch (error: any) {
    console.error('Error en fetchEventos:', {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

export const getEventoById = async (id: number): Promise<IEvento> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento>>(`/${id}`);
    if (!data.data) throw new Error('Evento no encontrado');
    return data.data;
  } catch (error: any) {
    console.error(`Error fetching evento ${id}:`, error);
    throw new Error(error.message || `Error al obtener evento ${id}`);
  }
};

export const createEvento = async (eventoData: IEventoCreate): Promise<IEvento> => {
  try {
    // 1. Validación frontend
    const requiredFields: (keyof IEventoCreate)[] = [
      'nombre_evento', 'categoria', 'descripcion', 
      'fecha_inicio', 'fecha_final', 'estado'
    ];
    
    const missingFields = requiredFields.filter(f => !eventoData[f]);
    if (missingFields.length > 0) {
      throw new Error(`Faltan campos: ${missingFields.join(', ')}`);
    }

    // 2. Normalización de datos
    const payload = {
      ...eventoData,
      estado: eventoData.estado.toLowerCase(),
      categoria: eventoData.categoria.toLowerCase()
    };

    console.log('Enviando al backend:', payload);

    // 3. Envío con headers explícitos
    const response = await apiClient.post<ApiResponse<IEvento>>('/', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data?.data) {
      throw new Error('Respuesta inválida del servidor');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Error en createEvento:', {
      request: error.config?.data,
      response: error.response?.data
    });
    throw new Error(error.response?.data?.message || 'Error al crear evento');
  }
};

export const updateEvento = async (id: number, eventoData: IEventoUpdate): Promise<IEvento> => {
  try {
    console.log(`Actualizando evento ${id} con datos:`, JSON.stringify(eventoData, null, 2));
    
    // Validación básica para actualización
    if (!eventoData.nombre_evento && !eventoData.categoria) {
      throw new Error('Se requiere al menos un campo para actualizar');
    }

    const { data } = await apiClient.put<ApiResponse<IEvento>>(`/${id}`, eventoData);
    
    if (!data.data) {
      throw new Error('No se recibieron datos del evento actualizado');
    }
    
    return data.data;
  } catch (error: any) {
    console.error(`Error updating evento ${id}:`, {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.message || `Error al actualizar evento ${id}`);
  }
};

export const deleteEvento = async (id: number): Promise<void> => {
  try {
    await apiClient.delete<ApiResponse<void>>(`/${id}`);
    console.log(`Evento ${id} eliminado exitosamente`);
  } catch (error: any) {
    console.error(`Error deleting evento ${id}:`, {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.message || `Error al eliminar evento ${id}`);
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
    
    if (!data.data?.url) throw new Error('No se recibió URL de la imagen');
    return data.data.url;
  } catch (error: any) {
    console.error('Error uploading image:', {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status
    });
    throw new Error(error.message || 'Error al subir imagen');
  }
};

// Funciones adicionales
export const searchEventos = async (query: string): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>(`/search?q=${query}`);
    return data.data || [];
  } catch (error: any) {
    console.error('Error searching eventos:', error);
    throw new Error(error.message || 'Error al buscar eventos');
  }
};

export const getEventosByStatus = async (status: string): Promise<IEvento[]> => {
  try {
    const { data } = await apiClient.get<ApiResponse<IEvento[]>>(`/status/${status}`);
    return data.data || [];
  } catch (error: any) {
    console.error('Error fetching eventos by status:', error);
    throw new Error(error.message || 'Error al obtener eventos por estado');
  }
};