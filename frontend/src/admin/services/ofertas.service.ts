import axios from 'axios';
import {
  ICarrera,
  ICarreraResponse,
  ICarrerasPaginatedResponse,
} from '../interfaces/oferta.interface';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api/carreras';

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
    const { data } = await api.get<ICarrerasPaginatedResponse>('/', options);
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchCarreraById = async (id: number, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const { data } = await api.get<ICarreraResponse>(`/${id}`, options);
    if (!data.success || !data.data) throw new Error(data.message || 'Carrera no encontrada');
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const createCarrera = async (carreraData: Partial<ICarrera>, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const { data } = await api.post<ICarreraResponse>('/', carreraData, options);
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateCarrera = async (id: number, carreraData: Partial<ICarrera>, options?: ApiOptions): Promise<ICarrera> => {
  try {
    const { data } = await api.put<ICarreraResponse>(`/${id}`, carreraData, options);
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteCarrera = async (id: number, options?: ApiOptions): Promise<void> => {
  try {
    const { data } = await api.delete<{ success: boolean; message?: string }>(`/${id}`, options);
    if (!data.success) throw new Error(data.message);
  } catch (error) {
    handleApiError(error);
  }
};