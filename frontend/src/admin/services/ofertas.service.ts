import axios from 'axios';
import { ICarrera } from '../interfaces/oferta.interface';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://itc11.itcun.info/api/carreras';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

interface ApiOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

const handleApiError = (error: any): never => {
  const message = error.response?.data?.message || 
                 error.message || 
                 'Error en la comunicación con el servidor';
  throw new Error(message);
};

export const fetchCarreras = async (options?: ApiOptions): Promise<ICarrera[]> => {
  try {
    const response = await api.get('', options);
    if (!response.data.success) {
      throw new Error('Error al cargar carreras');
    }
    return response.data.data; // <-- Aquí extraemos el array correcto
  } catch (error) {
    return handleApiError(error);
  }
};


export const fetchCarreraById = async (id: number, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const response = await api.get('', {
      ...options,
      params: { ...options?.params, id }
    });
    if (!response.data.success) {
      throw new Error('Carrera no encontrada');
    }
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const fetchCarreraBySlug = async (slug: string, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const { data } = await api.get<ICarrera>('', {
      ...options,
      params: { ...options?.params, slug }
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};


export const createCarrera = async (carreraData: Partial<ICarrera>, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const response = await api.post('', carreraData, options);
    if (!response.data.success) {
      throw new Error('Error al crear carrera');
    }
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCarrera = async (id: number, carreraData: Partial<ICarrera>, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const { data } = await api.put<ICarrera>('', carreraData, {
      ...options,
      params: { ...options?.params, id }
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteCarrera = async (id: number, options?: ApiOptions): Promise<void> => {
  try {
    await api.delete('', {
      ...options,
      params: { ...options?.params, id }
    });
  } catch (error) {
    handleApiError(error);
  }
};
