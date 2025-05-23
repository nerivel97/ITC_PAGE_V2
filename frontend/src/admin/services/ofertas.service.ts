import axios from 'axios';
import {
  ICarrera,
  ICarreraResponse,
  ICarrerasPaginatedResponse,
  ICarreraFormData
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

export const fetchCarreras = async (): Promise<ICarrera[]> => {
  try {
    const { data } = await api.get<ICarrerasPaginatedResponse>('/');
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al cargar carreras');
  }
};

export const fetchCarreraById = async (id: number): Promise<ICarrera> => {
  try {
    const { data } = await api.get<ICarreraResponse>(`/${id}`);
    if (!data.success || !data.data) throw new Error(data.message || 'Carrera no encontrada');
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al cargar carrera');
  }
};


export const createCarrera = async (carreraData: ICarreraFormData): Promise<ICarrera> => {
  try {
    const { data } = await api.post<ICarreraResponse>('/', carreraData);
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al crear carrera');
  }
};

export const updateCarrera = async (id: number, carreraData: ICarreraFormData): Promise<ICarrera> => {
  try {
    const { data } = await api.put<ICarreraResponse>(`/${id}`, carreraData);
    if (!data.success) throw new Error(data.message);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al actualizar carrera');
  }
};

export const deleteCarrera = async (id: number): Promise<void> => {
  try {
    const { data } = await api.delete<{ success: boolean; message?: string }>(`/${id}`);
    if (!data.success) throw new Error(data.message);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al eliminar carrera');
  }
};